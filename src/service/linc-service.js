import pug from "pug";
import path from "path";
import uuid from "uuid";
import moment from "moment";
import config from "config";
import _ from "lodash";
import Promise from "bluebird";

import { sendConfirmationEmail } from "../util/emailer.js";
import * as lenderMatchRegistrationDao from "../models/dao/lender-match-record.js";
import * as emailConfirmationDao from "../models/dao/email-confirmation.js";
import * as htmlToText from "html-to-text";

import LincSoapRequest from "./linc-soap-request.js";

function createConfirmationEmail(name, emailAddress, lenderMatchRecordId, tokenString) {
  let token = tokenString;
  if (!token) {
    token = uuid.v4();
  }
  const link = config.get("linc.confirmationEmailBase") + "/linc/confirmEmail?token=" + token;

  const htmlContents = pug.renderFile(path.join(__dirname, "../views/confirmation-email.pug"), {
    confirmationLink: link,
    firstName: _.first(_.words(name))
  });
  const textContents = htmlToText.fromString(htmlContents);

  const mailOptions = {
    to: emailAddress,
    subject: "Almost done! Confirm your email to find lenders",
    text: textContents,
    html: htmlContents
  };
  return sendConfirmationEmail(mailOptions)
    .then(function() {
      return {
        sent: moment().unix(),
        token: token,
        lenderMatchRegistrationId: lenderMatchRecordId
      };
    });
}

function createLenderMatchRegistration(data) {
  return lenderMatchRegistrationDao.create(data) // TODO: trim this to certain properties that are needed
    .then(function(result) {
      return [data.name, data.emailAddress, result._id];
    })
    .spread(createConfirmationEmail)
    .then(emailConfirmationDao.create);
}




function findUnconfirmedRegistrations() {
  const lastExecution = moment().subtract(config.get("linc.resendFrequency"), "seconds");
  return emailConfirmationDao.retrieve({
    sent: {
      $gte: lastExecution.unix()
    }
  });
}



function findLenderMatchRegistrationByConfirmation(emailConfirmationRecord) {
  return lenderMatchRegistrationDao.retrieve(emailConfirmationRecord.lenderMatchRegistrationId);
}

function sendFollowupConfirmations(emailConfirmationRecords) {
  console.log(emailConfirmationRecords);
  return Promise.map(emailConfirmationRecords, (emailConfirmationRecord) => {
    return findLenderMatchRegistrationByConfirmation(emailConfirmationRecord)
      .then(function(lenderMatchRegistration) {
        const name = lenderMatchRegistration.name;
        const emailAddress = lenderMatchRegistration.emailAddress;
        return [name, emailAddress, emailConfirmationRecord.token, lenderMatchRegistration._id];
      })
      .then(createConfirmationEmail)
      .then(function(result) {
        return _.merge({}, emailConfirmationRecord, {
          sentFollowup: result.sent
        });
      })
      .then(emailConfirmationDao.update);
  });
}



function resendEmailJob() {
  return findUnconfirmedRegistrations().then(sendFollowupConfirmations);
}


function sendDataToOca(lenderMatchRegistration) {
  const username = config.get("oca.soap.username");
  const password = config.get("oca.soap.password");
  const ocaSoapWsdl = config.get("oca.soap.wsdlUrl");
  const soapRequest = new LincSoapRequest();
  soapRequest.sendLincSoapRequest(ocaSoapWsdl, lenderMatchRegistration, username, password).then(function(response) {
    // TODO: check the response from OCA
    //do nothing if it is "S"
    //save to database if it is "P"
    // TODO: handle checking of the database for pending items and resending them.
    //throw error if it is "F
    //need to figure out with Jon what to page to reroute the user to in case of error.
    //email might be confirmed but OCA soap might still have returned an error!
  }).catch(function(error) {
    console.log(error.message);
  });
}

function confirmEmail(token) {
  emailConfirmationDao.retrieveOne({
    token: token
  })
    .then(function(emailConfirmationRecord) {
      if (emailConfirmationRecord) {
        const expiration = moment(emailConfirmationRecord.sent).add(config.get("linc.numberOfSecondsForWhichEmailIsValid"), "seconds");
        const now = moment().unix();
        if (expiration.isBefore(now)) {
          const confirmedRecord = _.merge({}, emailConfirmationRecord, {
            confirmed: now
          });
          return emailConfirmationDao.update(confirmedRecord).then(function(result) {
            // AYO submit OCA request
            return lenderMatchRegistrationDao.retrieve(result.value.lenderMatchRegistrationId)
              .then(function(lenderMatchRegistration) {
                sendDataToOca(lenderMatchRegistration);
                return "success";
              });
          });
        }
        return "expired";

      }
      return "not found";

    });
}

export { createLenderMatchRegistration, confirmEmail, resendEmailJob };
