import pug from "pug";
import path from "path";
import url from "url";
import uuid from "uuid";
import moment from "moment";
import config from "config";
import _ from "lodash";
import Promise from "bluebird";
import { sendConfirmationEmail } from "../util/emailer.js";
import { lenderMatchRegistration, lenderMatchSoapResponse } from "../models/lender-match-registration.js";
import EmailConfirmation from "../models/email-confirmation.js";
import * as htmlToText from "html-to-text";
import { fetchPendingOrFailedMessagesFromDb } from "../models/dao/linc-service.js";
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

function updateLenderMatchSoapResponse(lenderMatchRegistrationId) {
  const now = moment();
  return lenderMatchSoapResponse.update(
    {
      processed: now.unix()
    },
    {
      where: {
        lenderMatchRegistrationId: lenderMatchRegistrationId
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function deleteLenderMatchRegistration(lenderMatchRegistrationId) {
  return lenderMatchRegistration.destroy(
    {
      where: {
        lenderMatchRegistrationId: lenderMatchRegistrationId
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function handleSoapResponse(soapResponse) {
  let retVal;
  if (soapResponse.responseCode === "P" || soapResponse.responseCode === "F") {
    retVal = createLenderMatchSoapResponseData(soapResponse);
  } else if (soapResponse.responseCode === "S") {
    //update the database to processed or delete lenderMatchRegistration when deletion is implemented
    const notDeletingYet = true;
    retVal = notDeletingYet ? updateLenderMatchSoapResponse(soapResponse.lenderMatchRegistrationId) : deleteLenderMatchRegistration(soapResponse.lenderMatchRegistrationId);
  } else { //eslint-disable-line no-else-return
    throw new Error("Unknown Response Code receieved from OCA.");
  }
  return retVal;
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
  return fetchPendingOrFailedMessagesFromDb();
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
      return handleSoapResponse(response);
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
                  sendDataToOca(lenderMatchRegistrationData);
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


export { handleSoapResponse, updateLenderMatchSoapResponse, createLenderMatchRegistration, sendDataToOcaJob, findFailedOrPendingMessages, sendMessagesToOca, confirmEmail, followupEmailJob, resendConfirmationEmail, createLenderMatchRegistrationData, createLenderMatchSoapResponseData };
