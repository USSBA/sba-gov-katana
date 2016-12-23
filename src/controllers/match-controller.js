import {
    sendConfirmationEmail
}
from "../util/emailer.js";
import pug from "pug";
import _ from "lodash";
import path from "path";
import uuid from "uuid";
import moment from "moment";
import config from "config";
import * as emailConfirmationDao from "../models/dao/email-confirmation.js";
import * as lenderMatchRecordDao from "../models/dao/lender-match-record.js";
import HttpStatus from "http-status-codes";
const numberOfHoursForWhichEmailIsValid = 48;

function createConfirmation(req, res) {
    lenderMatchRecordDao.create(req.body) // TODO: trim this to certain properties that are needed
        .then(function(result) {
            var firstName = _.head(req.body.contactInfoData.contactFullName.split(" "));
            var emailAddress = req.body.contactInfoData.contactEmailAddress;
            const newToken = uuid.v4();
            const link = config.get("linc.confirmationEmailBase") + "/linc/confirmEmail?token=" + newToken;
            const firstSentence = "Welcome to Lender Match, " + firstName + "!";
            const secondSentence = "Before we match you with lenders, please confirm your email address. " + link + ".";
            const thirdSentence = "Or, paste this link into your browser: <Confirmation Link>";
            var mailOptions = {
                to: emailAddress,
                subject: "Almost done! Confirm your email to find lenders",
                text: firstSentence + secondSentence + thirdSentence,
                html: pug.renderFile(path.join(__dirname, "../views/confirmation-email.pug"), {
                    confirmationLink: link,
                    firstName: firstName
                })
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
                    res.status(HttpStatus.NO_CONTENT).send();
                });
        });
}

function handleLenderMatchSubmission(req, res) {
    if (("contactSecondaryEmailAddress" in req.body.contactInfoData)) {
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
        res.status(HttpStatus.BAD_REQUEST).send("Error during validation: " + errors.join(","));
    }
}

function handleEmailConfirmation(req, res) {
    if (!("token" in req.query)) {
        res.redirect("/emailinvalid");
    } else {
        emailConfirmationDao.retrieve(req.query.token).then(function(emailConfirmationRecord) {
            if (emailConfirmationRecord && moment(emailConfirmationRecord.expiration).isBefore()) {
                const now = moment().unix();
                const confirmedRecord = _.merge({}, emailConfirmationRecord, {
                    confirmed: now
                });
                emailConfirmationDao.update(confirmedRecord).then(function() {
                    // AYO submit OCA request here
                    res.redirect("/emailconfirmed");
                });
            } else {
                res.redirect("/emailinvalid");
            }
        });
    }
}
export {
    handleLenderMatchSubmission,
    handleEmailConfirmation
};
