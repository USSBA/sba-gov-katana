import {sendConfirmationEmail} from '../util/emailer.js';
import uuid from 'uuid';
import moment from 'moment';
import config from 'config';
import * as emailConfirmationDao from '../models/dao/email-confirmation.js';
import * as lenderMatchRecordDao from '../models/dao/lender-match-record.js';

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
        lenderMatchRecordDao
        .create(req.body) // TODO: trim this to certain properties that are needed
        .then(function(result){
            return createConfirmationEmail(req.body.contactInfoData.contactEmailAddress)
                .then(function(newToken){
                    let newEmailConfirmationRecord ={
                      sent: moment().unix(),
                      expiration: moment().add(2, 'days').unix(),
                      token: newToken,
                      lenderMatchRecordId: result._id,
                    };
                    return emailConfirmationDao.create(newEmailConfirmationRecord)
                        .then(function() {
                            res.status(204).send();
                        });
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
        emailConfirmationDao.retrieve(req.query.token)
        .then(function(emailConfirmationRecord){
            if (emailConfirmationRecord && moment(emailConfirmationRecord.expiration).isBefore()) {
                emailConfirmationRecord.confirmed = moment().unix();
                emailConfirmationDao.update(emailConfirmationRecord)
                .then(function(){
                    // AYO submit OCA request here
                    res.render('email-confirmed');
                });
            }
            else {
                res.render('invalid-email-confirmation-token');
            }
        });
    }
};


function createConfirmationEmail(emailAddress) {
    let newToken = uuid.v4();
    let link = config.get("linc.confirmationEmailBase") + "/linc/confirmEmail?token="+newToken;
    return sendConfirmationEmail(emailAddress, link)
        .then(function(){
            return newToken;
        })
}


export {
    handleLenderMatchSubmission,
    handleEmailConfirmation
};
