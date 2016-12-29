import { sendConfirmationEmail } from "../util/emailer.js";
import pug from "pug";
import _ from "lodash";
import path from "path";
import uuid from "uuid";
import moment from "moment";
import config from "config";
import * as emailConfirmationDao from "../models/dao/email-confirmation.js";
import * as lenderMatchRecordDao from "../models/dao/lender-match-record.js";
import LincSoapRequest from "./linc-soap-request.js";
import HttpStatus from "http-status-codes";
const numberOfHoursForWhichEmailIsValid = 48;
var htmlToText = require("html-to-text");

// TODO: get server Endpoint from wsdl file instead of hard coding
const ocaSoapWsdl = "https://catweb2.sba.gov/linc/ws/linc.wsdl";
// TODO: put wsdl, username and password in configuration file.
const username = "OCPL_LincUser";
const password = "zQUcm4Yu";

function createConfirmation(req, res) {
  lenderMatchRecordDao.create(req.body) // TODO: trim this to certain properties that are needed
    .then(function(result) {
      var firstName = _.first(_.words(req.body.contactInfoData.contactFullName));
      var emailAddress = req.body.contactInfoData.contactEmailAddress;
      const newToken = uuid.v4();
      const link = config.get("linc.confirmationEmailBase") + "/linc/confirmEmail?token=" + newToken;

      const htmlContents = pug.renderFile(path.join(__dirname, "../views/confirmation-email.pug"), {
        confirmationLink: link,
        firstName: firstName
      });
      const textContents = htmlToText.fromString(htmlContents);

      var mailOptions = {
        to: emailAddress,
        subject: "Almost done! Confirm your email to find lenders",
        text: textContents,
        html: htmlContents
      };
      return sendConfirmationEmail(mailOptions)
        .then(function() {
          const expiration = moment().add(numberOfHoursForWhichEmailIsValid, "hours").unix();
          return {
            sent: moment().unix(),
            expiration: expiration,
            token: newToken,
            lenderMatchRecordId: result._id
          };
        })
        .then(emailConfirmationDao.create)
        .then(function() {
          res.status(HttpStatus.OK).send();
        });
    });
}

function handleLenderMatchSubmission(req, res) {
  if ( ("contactSecondaryEmailAddress" in req.body.contactInfoData) ) {
    console.log("honeypot form element was filled.  This was probably submitted by a bot.");
  }
  const errors = [];
  const requiredProperties = [{
    propertyName: "contactInfoData.contactFullName",
    message: "Contact Full Name is required."
  }, {
    propertyName: "contactInfoData.contactPhoneNumber",
    message: "Contact Phone Number is required."
  }, {
    propertyName: "contactInfoData.contactEmailAddress",
    message: "Contact Email Address is required."
  }, {
    propertyName: "businessInfoData.businessInfoName",
    message: "Business Name is required."
  }, {
    propertyName: "businessInfoData.businessInfoZipcode",
    message: "Business Zip Code is required."
  }, {
    propertyName: "industryInfoData.industryType",
    message: "Industry Type is required."
  }, {
    propertyName: "industryInfoData.industryExperience",
    message: "Industry Experience is required."
  }, {
    propertyName: "loanData.loanAmount",
    message: "Loan Amount  is required."
  }, {
    propertyName: "loanData.loanDescription",
    message: "Loan Description is required."
  }];
  _.each(requiredProperties, function(requiredProperty) {
    if (!_.has(req.body, requiredProperty.propertyName)) {
      errors.push("Error: " + requiredProperty.message);
    }
  });
  if (_.isEmpty(errors)) {
    createConfirmation(req, res);
  } else {
    console.log(errors);
    res.status(HttpStatus.BAD_REQUEST).send("Error during validation: " + errors.join(","));
  }
}

function handleEmailConfirmation(req, res) {
  if (!("token" in req.query)) {
    res.redirect("/linc/emailinvalid");
  } else {
    emailConfirmationDao.retrieve(req.query.token).then(function(emailConfirmationRecord) {
      if (emailConfirmationRecord && moment(emailConfirmationRecord.expiration).isBefore()) {
        const now = moment().unix();
        const confirmedRecord = _.merge({}, emailConfirmationRecord, {
          confirmed: now
        });
        emailConfirmationDao.update(confirmedRecord).then(function(result) {
          // AYO submit OCA request
          lenderMatchRecordDao.retrieve(result.value.lenderMatchRecordId).then(function(lenderMatchRecord) {
            const soapRequest = new LincSoapRequest();
            soapRequest.sendLincSoapRequest(ocaSoapWsdl, lenderMatchRecord, username, password).then(function() {
              // TODO: check the response from OCA
              //do nothing if it is "S"
              //save to database if it is "P"
              // TODO: handle checking of the database for pending items and resending them.
              //throw error if it is "F
              //need to figure out with Jon what to page to reroute the user to in case of error.
              //email might be confirmed but OCA soap might still have returned an error!
            }).catch(function(error) {
              res.send(error.message);
            });
            res.redirect("/linc/emailconfirmed");
          });
        });
      } else {
        res.redirect("/linc/emailinvalid");
      }
    });
  }
}
export { handleLenderMatchSubmission, handleEmailConfirmation };
