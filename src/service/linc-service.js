import pug from 'pug'
import path from 'path'
import url from 'url'
import uuid from 'uuid'
import moment from 'moment'
import config from 'config'
import _ from 'lodash'
import Promise from 'bluebird'
import { sendConfirmationEmail } from '../util/emailer.js'
import lenderMatchRegistration from '../models/lender-match-registration.js'
import lenderMatchSoapResponse from '../models/lender-match-soap-response.js'
import EmailConfirmation from '../models/email-confirmation.js'
import * as htmlToText from 'html-to-text'
import {
  sendDataToOca,
  handleSoapResponse,
  sendPasswordUpdateRequest,
  handlePasswordUpdateResponse
} from './oca-service.js'
import { isAdministrator } from './user-service.js'

function createConfirmationEmail(
  name,
  emailAddress,
  lenderMatchRegistrationId,
  tokenString,
  followup
) {
  let token = tokenString
  if (!token) {
    token = uuid.v4()
  }
  const link = url.resolve(
    config.get('linc.confirmationEmailBase'),
    '/actions/lendermatch/confirmEmail?token=' + token
  )

  const pugTemplate = followup
    ? '../views/followup-email.pug'
    : '../views/confirmation-email.pug'
  const subject = followup
    ? 'Reminder: Confirm your email to find lenders'
    : 'Almost done! Confirm your email to find lenders'
  const htmlContents = pug.renderFile(path.join(__dirname, pugTemplate), {
    confirmationLink: link,
    firstName: _.first(_.words(name))
  })
  const textContents = htmlToText.fromString(htmlContents)

  const mailOptions = {
    to: emailAddress,
    subject: subject,
    text: textContents,
    html: htmlContents
  }
  return sendConfirmationEmail(mailOptions).then(function() {
    return {
      sent: moment().unix(),
      sentFollowup: null,
      token: token,
      lenderMatchRegistrationId: lenderMatchRegistrationId
    }
  })
}

function createLenderMatchRegistration(data) {
  return lenderMatchRegistration
    .create(data)
    .then(function(result) {
      return [data.name, data.emailAddress, result.id, null, false]
    })
    .spread(createConfirmationEmail)
    .tap(console.log)
    .then(function(toCreate) {
      return EmailConfirmation.create(toCreate)
    })
}

function createLenderMatchRegistrationData(data) {
  return lenderMatchRegistration.create(data).then(function(result) {
    return result
  })
}

function findUnconfirmedRegistrations() {
  const soonest = moment().subtract(config.get('linc.lookback'), 'seconds')
  const earliest = moment().subtract(
    config.get('linc.numberOfSecondsForWhichEmailIsValid'),
    'seconds'
  )
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
  })
}

function sendFollowupConfirmations(emailConfirmations) {
  return Promise.map(emailConfirmations, emailConfirmation => {
    return lenderMatchRegistration
      .findById(emailConfirmation.lenderMatchRegistrationId)
      .then(function(lenderMatchRegistrationData) {
        const name = lenderMatchRegistrationData.name
        const emailAddress = lenderMatchRegistrationData.emailAddress
        return [
          name,
          emailAddress,
          lenderMatchRegistrationData.id,
          emailConfirmation.token,
          true
        ]
      })
      .spread(createConfirmationEmail)
      .then(function(result) {
        return emailConfirmation.update({
          sentFollowup: result.sent
        })
      })
  })
}

function findConfirmedEmails() {
  return EmailConfirmation.findAll({
    where: {
      confirmed: {
        $not: null
      }
    }
  })
}

function findLenderMatchRegistrations(emailConfirmation) {
  return lenderMatchSoapResponse
    .findAll({
      where: {
        lenderMatchRegistrationId: emailConfirmation.lenderMatchRegistrationId
      },
      order: [['createdAt', 'DESC']]
    })
    .then(function(lenderMatchSoapResponses) {
      const maxRetries = 5
      if (!_.isEmpty(lenderMatchSoapResponses)) {
        //filter out the processed responses
        const unprocessedResponses = _.filter(
          lenderMatchSoapResponses,
          lenderMatchResponse => {
            return !lenderMatchResponse.processed
          }
        )
        if (!_.isEmpty(unprocessedResponses)) {
          if (_.size(unprocessedResponses) < maxRetries) {
            const firstResponse = _.head(unprocessedResponses)
            return lenderMatchRegistration
              .findById(firstResponse.lenderMatchRegistrationId)
              .then(function(lenderMatchRegistrationItem) {
                return lenderMatchRegistrationItem
              })
          }
          return Promise.resolve('Not Found')
        }
        return Promise.resolve('Not Found')
      }
      return lenderMatchRegistration
        .findById(emailConfirmation.lenderMatchRegistrationId)
        .then(function(lenderMatchRegistrationItem) {
          return lenderMatchRegistrationItem
        })
    })
    .catch(function(err) {
      console.log(err)
    })
}

function findFailedOrPendingMessages(result) {
  const accumulator = []
  return result
    .reduce(function(lenderMatchRegistrations, emailConfirmation) {
      return lenderMatchRegistrations
        .then(function() {
          return findLenderMatchRegistrations(emailConfirmation)
        })
        .then(function(lenderMatchReg) {
          if (lenderMatchReg !== 'Not Found') {
            accumulator.push(lenderMatchReg)
          }
        })
    }, Promise.resolve())
    .then(function() {
      return accumulator
    })
    .catch(function(err) {
      console.log(err)
    })
}

function followupEmailJob() {
  return findUnconfirmedRegistrations().then(sendFollowupConfirmations)
}

function sendMessagesToOca(results) {
  return Promise.map(results, result => {
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
      hasFinancialProjections: result.hasFinancialProjections,
      isGeneratingRevenue: result.isGeneratingRevenue,
      isVeteran: result.isVeteran
    }
    return sendDataToOca(lenderMatchRegistrationData).then(handleSoapResponse)
  })
}

function sendDataToOcaJob() {
  return findConfirmedEmails()
    .then(findFailedOrPendingMessages)
    .then(sendMessagesToOca)
}

function findEmailConfirmationByToken(token) {
  return EmailConfirmation.findOne({
    where: {
      token: token
    }
  })
}

function confirmEmail(token) {
  return findEmailConfirmationByToken(token).then(function(emailConfirmation) {
    if (emailConfirmation) {
      const expiration = moment
        .unix(emailConfirmation.sent)
        .add(config.get('linc.numberOfSecondsForWhichEmailIsValid'), 'seconds')
      const now = moment()
      console.log(expiration)
      console.log(now)
      if (expiration.isAfter(now)) {
        emailConfirmation.set('confirmed', now.unix())
        return emailConfirmation.save().then(function(result) {
          return lenderMatchRegistration
            .findById(emailConfirmation.lenderMatchRegistrationId)
            .then(function(lenderMatchRegistrationData) {
              return 'success'
            })
        })
      }
      return 'expired'
    }
    return 'not found'
  })
}

function resendConfirmationEmail(emailAddress) {
  return lenderMatchRegistration
    .findOne({
      where: {
        emailAddress: emailAddress
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    })
    .then(function(lenderMatchRegistrationData) {
      return EmailConfirmation.findOne({
        where: {
          lenderMatchRegistrationId: lenderMatchRegistrationData.id
        }
      }).then(emailConfirmation => {
        return [
          lenderMatchRegistrationData.name,
          lenderMatchRegistrationData.emailAddress,
          lenderMatchRegistrationData.id,
          emailConfirmation.token,
          false
        ]
      })
    })
    .spread(createConfirmationEmail)
}

function resetLincPassword(sessionId) {
  // the user authorization is here for now; move it to the global ACL when one is implemented
  return isAdministrator(sessionId).then(isAdmin => {
    if (isAdmin) {
      return sendPasswordUpdateRequest()
    }
    throw new Error('FORBIDDEN')
  })
}

export {
  findConfirmedEmails,
  createLenderMatchRegistration,
  sendDataToOcaJob,
  findFailedOrPendingMessages,
  sendMessagesToOca,
  confirmEmail,
  followupEmailJob,
  resendConfirmationEmail,
  createLenderMatchRegistrationData,
  resetLincPassword
}
