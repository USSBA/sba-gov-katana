import pug from "pug";
import path from "path";
import url from "url";
import uuid from "uuid";
import moment from "moment";
import config from "config";
import _ from "lodash";
import Promise from "bluebird";

import { sendConfirmationEmail } from "../util/emailer.js";
import LenderMatchRegistration from "../models/lender-match-registration.js";
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
  return LenderMatchRegistration.create(data)
    .then(function(result) {
      return [data.name, data.emailAddress, result.id, null, false];
    })
    .spread(createConfirmationEmail)
    .tap(console.log)
    .then(function(toCreate) {
      return EmailConfirmation.create(toCreate);
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
    return LenderMatchRegistration.findById(emailConfirmation.lenderMatchRegistrationId)
      .then(function(lenderMatchRegistration) {
        const name = lenderMatchRegistration.name;
        const emailAddress = lenderMatchRegistration.emailAddress;
        return [name, emailAddress, lenderMatchRegistration.id, emailConfirmation.token, true];
      })
      .spread(createConfirmationEmail)
      .then(function(result) {
        return emailConfirmation.update({
          sentFollowup: result.sent
        });
      });
  });
}



function followupEmailJob() {
  return findUnconfirmedRegistrations().then(sendFollowupConfirmations);
}


function sendDataToOca(lenderMatchRegistration) {
  const soapRequestData = {
    userName: config.get("oca.soap.username"),
    password: config.get("oca.soap.password"),
    ocaSoapWsdl: config.get("oca.soap.wsdlUrl"),
    lenderMatchRegistration: lenderMatchRegistration
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
      // TODO: check the response from OCA
      //do nothing if it is "S"
      //save to database if it is "P"
      // TODO: handle checking of the database for pending items and resending them.
      //throw error if it is "F
      //need to figure out with Jon what to page to reroute the user to in case of error.
      //email might be confirmed but OCA soap might still have returned an error!
    })
    .catch(function(error) {
      console.log(error.message);
      throw error;
    });
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
              return LenderMatchRegistration.findById(emailConfirmation.lenderMatchRegistrationId)
                .then(function(lenderMatchRegistration) {
                  //   sendDataToOca(lenderMatchRegistration);
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
  return LenderMatchRegistration.findOne({
    where: {
      emailAddress: emailAddress
    },
    order: [
      ["createdAt", "DESC"]
    ],
    limit: 1
  })
    .then(function(lenderMatchRegistration) {
      return EmailConfirmation.findOne({
        where: {
          lenderMatchRegistrationId: lenderMatchRegistration.id
        }
      })
        .then((emailConfirmation) => {
          return [lenderMatchRegistration.name, lenderMatchRegistration.emailAddress, lenderMatchRegistration.id, emailConfirmation.token, false];
        });
    })
    .spread(createConfirmationEmail);
}


export { createLenderMatchRegistration, confirmEmail, followupEmailJob, resendConfirmationEmail };
