import emailer from '../util/emailer.js';
import uuid from 'uuid';
import moment from 'moment';
import config from 'config';
import * as emailConfirmationDao from '../models/dao/email-confirmation.js';

function handleLenderMatchSubmission(req, res, next) {
    if (("contactSecondaryEmailAddress" in req.body.contactInfoData)) {
        console.log('honeypot form element was filled.  This was probably submitted by a bot.');
    }
    let errors = [];
    if (!("contactFullName" in req.body.contactInfoData)) {
        errors.push("Contact Full Name is required.");
    }
    if (!("contactPhoneNumber" in req.body.contactInfoData)) {
        errors.push("Contact Phone Number is required.");
    }
    if (!("contactEmailAddress" in req.body.contactInfoData)) {
        errors.push("Error: Contact Email Address is required.");
    }
    if (!("businessInfoName" in req.body.businessInfoData)) {
        errors.push("Error: Business Name is required.");
    }
    if (!("businessInfoZipcode" in req.body.businessInfoData)) {
        errors.push("Error: Business Zip Code is required.");
    }
    if (!("industryType" in req.body.industryInfoData)) {
        errors.push("Error: Industry Type is required.");
    }
    if (!("industryExperience" in req.body.industryInfoData)) {
        errors.push("Error: Industry Experience is required.");
    }
    if (!("loanAmount" in req.body.loanData)) {
        errors.push("Error: Loan Amount is required.");
    }
    if (!("loanDescription" in req.body.loanData)) {
        errors.push("Error: Loan Description is required.");
    }
    if (errors.length === 0) {
        saveFormSubmission(req.body)
        .then(function(){
            sendConfirmationEmail(req.body.contactEmailAddress).then(function() {
                res.status(204).send();
            });
        });
    }
    else {
        res.status(406).send("Error during validation: " + errors.join(","));
    }
}

function handleEmailConfirmation(req, res, next) {
    if (!("token" in req.query)) {
        res.render('invalid-email-confirmation-token');
    }
    else {
        let emailConfirmationRecord = emailConfirmationDao.retrieve(req.query.token);
        if (emailConfirmationRecord && moment(emailConfirmationRecord.expiration).isBeforeNow()) {
            emailConfirmationRecord.confirmed = moment().unix();
            emailConfirmationDao.update(emailConfirmationRecord);
            // AYO submit OCA request here
            res.status(204).send();
        }
        else {
            res.render('invalid-email-confirmation-token');
        }
    }
};
export {
    handleLenderMatchSubmission,
    handleEmailConfirmation
};

function sendConfirmationEmail(emailAddress) {
    let newToken = uuid.v4();
    let link = config.get("linc.confirmationBase") + "/linc/confirmEmail?token="+newToken;
    let newEmailConfirmationRecord ={
      sent: moment().unix(),
      token: newToken,
      email: emailAddress
    };
    // save token and data to database to database
    return emailer.sendConfirmationEmail(emailAddress, link)
        .then()
}

