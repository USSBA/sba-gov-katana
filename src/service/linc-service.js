import pug from "pug";
import path from "path";
import url from "url";
import uuid from "uuid";
import moment from "moment";
import config from "config";
import _ from "lodash";
import Promise from "bluebird";
///import * as Sequelize from "sequelize";
import { drupal, nonDrupal } from "../models/db-connect.js";

import { sendConfirmationEmail } from "../util/emailer.js";
import { lenderMatchRegistration, lenderMatchSoapResponse } from "../models/lender-match-registration.js";
import EmailConfirmation from "../models/email-confirmation.js";
import * as htmlToText from "html-to-text";

import { getEndPointUrl, convertFormDataToXml, createLincSoapRequestEnvelopeXml, sendLincSoapRequest } from "./linc-soap-request.js";

function createConfirmationEmail(name, emailAddress, lenderMatchRegistrationId, tokenString, followup) {
  let token = tokenString;
  if (!token) {
    token = uuid.v4();
  }
  const link = url.resolve(config.get("linc.confirmationEmailBase"), "/actions/lendermatch/confirmEmail?token=" + token);


  const pugTemplate = followup ? "../views/followup-email.pug" : "../views/confirmation-email.pug";
  const subject = followup ? "Reminder: Confirm your email to find lenders" : "Almost done! Confirm your email to find lenders";
  const htmlContents = pug.renderFile(path.join(__dirname, pugTemplate), {
    confirmationLink: link,
    firstName: _.first(_.words(name))
  });
  const textContents = htmlToText.fromString(htmlContents);

  const mailOptions = {
    to: emailAddress,
    subject: subject,
    text: textContents,
    html: htmlContents
  };
  return sendConfirmationEmail(mailOptions)
    .then(function() {
      return {
        sent: moment().unix(),
        sentFollowup: null,
        token: token,
        lenderMatchRegistrationId: lenderMatchRegistrationId
      };
    });
}

function createLenderMatchRegistration(data) {
  return lenderMatchRegistration.create(data)
    .then(function(result) {
      return [data.name, data.emailAddress, result.id, null, false];
    })
    .spread(createConfirmationEmail)
    .tap(console.log)
    .then(function(toCreate) {
      return EmailConfirmation.create(toCreate);
    });
}

function createLenderMatchRegistrationData(data) {
  return lenderMatchRegistration.create(data)
    .then(function(result) {
      console.log(result);
      return result;
    });
}

function createLenderMatchSoapResponseData(data) {
  return lenderMatchSoapResponse.create(data)
    .then(function(result) {
      console.log(result);
      return result;
    });
}


function findUnconfirmedRegistrations() {
  const soonest = moment().subtract(config.get("linc.lookback"), "seconds");
  const earliest = moment().subtract(config.get("linc.numberOfSecondsForWhichEmailIsValid"), "seconds");
  return EmailConfirmation.findAll({
    where: {
      sent: {
        $gt: earliest.unix(),
        $lt: soonest.unix()
      },
      sentFollowup: {
        $eq: null
      },
      confirmed: {
        $eq: null
      }
    }
  });
}



function sendFollowupConfirmations(emailConfirmations) {
  return Promise.map(emailConfirmations, (emailConfirmation) => {
    return lenderMatchRegistration.findById(emailConfirmation.lenderMatchRegistrationId)
      .then(function(lenderMatchRegistrationData) {
        const name = lenderMatchRegistrationData.name;
        const emailAddress = lenderMatchRegistrationData.emailAddress;
        return [name, emailAddress, lenderMatchRegistrationData.id, emailConfirmation.token, true];
      })
      .spread(createConfirmationEmail)
      .then(function(result) {
        return emailConfirmation.update({
          sentFollowup: result.sent
        });
      });
  });
}

function findFailedOrPendingMessages() {
  const sqlQuery = "select reg.id, reg.name, reg.phone, reg.emailAddress, reg.businessName, reg.businessZip, reg.industry, reg.industryExperience, " +
    " reg.loanAmount, reg.loanDescription, reg.loanUsage, reg.businessWebsite, reg.businessDescription, reg.hasWrittenPlan, reg.hasFinancialProjections, " +
    "reg.isGeneratingRevenue, reg.isVeteran, res.id as responseId, count(*) as resCount from lenderMatchRegistration reg inner join lenderMatchSoapResponse res on reg.id = res.lenderMatchRegistrationId " +
    "inner join emailConfirmation eco on reg.id = eco.lenderMatchRegistrationId where eco.confirmed is not null and res.processed is null " +
    "and res.updatedAt = (select max(updatedAt) from lenderMatchSoapResponse where lenderMatchRegistrationId = reg.id) and (res.responseCode = 'P' or res.responseCode = 'F') group by responseId having resCount < 5";

  return nonDrupal.query(sqlQuery).spread(
    function(results, metadata) {
      return results;
    }
  );
}

function followupEmailJob() {
  return findUnconfirmedRegistrations().then(sendFollowupConfirmations);
}

function sendDataToOca(lenderMatchRegistrationData) {
  const soapRequestData = {
    userName: config.get("oca.soap.username"),
    password: config.get("oca.soap.password"),
    ocaSoapWsdl: config.get("oca.soap.wsdlUrl"),
    lenderMatchRegistration: lenderMatchRegistrationData
  };

  getEndPointUrl(soapRequestData).then(function(response) {
    return convertFormDataToXml(response);
  })
    .then(function(response) {
      return createLincSoapRequestEnvelopeXml(response);
    })
    .then(function(response) {
      return sendLincSoapRequest(response);
    })
    .then(function(response) {
      if (response.resultCode === "P" || response.resultCode === "F") {
        const lenderMatchSoapResponseData = {
          responseCode: response.resultCode,
          errorMessageEnglish: response.errorMessageEnglish,
          errorMessageTechnical: response.errorMessageTechnical,
          lenderMatchRegistrationId: response.lenderMatchRegistrationId
        };

        createLenderMatchSoapResponseData(lenderMatchSoapResponseData)
          .then(function(resp) {
            console.log(resp);
          })
          .catch(function(error) {
            console.log(error.message);
            throw error;
          });
      } else if (response.resultCode === "S") {
        //update the database to processed or delete lenderMatchRegistration when deletion is implemented
        const notDeletingYet = true;
        const now = moment();
        let sqlQuery;

        if (notDeletingYet) {
          sqlQuery = "update lenderMatchSoapResponse set  processed = " + now.unix() + " where lenderMatchRegistrationId = " + "'" + response.lenderMatchRegistrationId + "'"; //eslint-disable-line no-useless-concat
        } else {
          sqlQuery = "delete from lenderMatchRegistration where lenderMatchRegistrationId = " + "'" + response.lenderMatchRegistrationId + "'"; //eslint-disable-line no-useless-concat
        }
        nonDrupal.query(sqlQuery).spread(
          function(results, metadata) {
            console.log(results);
            console.log(metadata);
          }
        );
      } else {
        throw new Error("Unknown Response Code receieved from OCA.");
      }

    })
    .catch(function(error) {
      console.log(error.message);
      throw error;
    });
}

function sendMessagesToOca(results) {
  return Promise.map(results, (result) => {

    const lenderMatchRegistrationData = {
      id: result.id,
      name: result.name,
      phone: result.phone,
      emailAddress: result.emailAddress,
      businessName: result.businessName,
      businessZip: result.businessZip,
      industry: result.industry,
      industryExperience: result.industryExperience,
      loanAmount: result.loanAmount,
      loanDescription: result.loanDescription,
      loanUsage: result.loanUsage,
      businessWebsite: result.businessWebsite,
      businessDescription: result.businessDescription,
      hasWrittenPlan: result.hasWrittenPlan,
      hasFinancialProjects: result.hasFinancialProjections,
      isGeneratingRevenue: result.isGeneratingRevenue,
      isVeteran: result.isVeteran
    };
    sendDataToOca(lenderMatchRegistrationData);
  });
}

function sendDataToOcaJob() {
  return findFailedOrPendingMessages().then(sendMessagesToOca);
}

function confirmEmail(token) {
  return EmailConfirmation.findById(token)
    .then(function(emailConfirmation) {
      if (emailConfirmation) {
        const expiration = moment.unix(emailConfirmation.sent).add(config.get("linc.numberOfSecondsForWhichEmailIsValid"), "seconds");
        const now = moment();
        console.log(expiration);
        console.log(now);
        if (expiration.isAfter(now)) {
          emailConfirmation.set("confirmed", now.unix());
          return emailConfirmation.save()
            .then(function(result) {
              return lenderMatchRegistration.findById(emailConfirmation.lenderMatchRegistrationId)
                .then(function(lenderMatchRegistrationData) {
                  //   sendDataToOca(lenderMatchRegistrationData);
                  return "success";
                });
            });
        }
        return "expired";

      }
      return "not found";

    });
}

function resendConfirmationEmail(emailAddress) {
  return lenderMatchRegistration.findOne({
    where: {
      emailAddress: emailAddress
    },
    order: [
      ["createdAt", "DESC"]
    ],
    limit: 1
  })
    .then(function(lenderMatchRegistrationData) {
      return EmailConfirmation.findOne({
        where: {
          lenderMatchRegistrationId: lenderMatchRegistrationData.id
        }
      })
        .then((emailConfirmation) => {
          return [lenderMatchRegistrationData.name, lenderMatchRegistrationData.emailAddress, lenderMatchRegistrationData.id, emailConfirmation.token, false];
        });
    })
    .spread(createConfirmationEmail);
}


export { createLenderMatchRegistration, sendDataToOcaJob, findFailedOrPendingMessages, sendMessagesToOca, confirmEmail, followupEmailJob, resendConfirmationEmail, createLenderMatchRegistrationData, createLenderMatchSoapResponseData };
