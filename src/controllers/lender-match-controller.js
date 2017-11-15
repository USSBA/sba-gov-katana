import _ from 'lodash'

import HttpStatus from 'http-status-codes'
import {
  createLenderMatchRegistration,
  confirmEmail,
  resendConfirmationEmail,
  resetLincPassword
} from '../service/linc-service.js'

// eslint-disable-next-line complexity
function handleLenderMatchSubmission(req, res) {
  if ('contactSecondaryEmailAddress' in req.body.contactInfoData) {
    console.log(
      'honeypot form element was filled.  This was probably submitted by a bot.'
    )
  }
  const errors = []
  const requiredProperties = [
    {
      propertyName: 'contactInfoData.contactFullName',
      message: 'Contact Full Name is required.'
    },
    {
      propertyName: 'contactInfoData.contactPhoneNumber',
      message: 'Contact Phone Number is required.'
    },
    {
      propertyName: 'contactInfoData.contactEmailAddress',
      message: 'Contact Email Address is required.'
    },
    {
      propertyName: 'businessInfoData.businessInfoName',
      message: 'Business Name is required.'
    },
    {
      propertyName: 'businessInfoData.businessInfoZipcode',
      message: 'Business Zip Code is required.'
    },
    {
      propertyName: 'industryInfoData.industryType',
      message: 'Industry Type is required.'
    },
    {
      propertyName: 'industryInfoData.industryExperience',
      message: 'Industry Experience is required.'
    },
    {
      propertyName: 'loanData.loanAmount',
      message: 'Loan Amount  is required.'
    },
    {
      propertyName: 'loanData.loanDescription',
      message: 'Loan Description is required.'
    }
  ]
  _.each(requiredProperties, function(requiredProperty) {
    if (!_.has(req.body, requiredProperty.propertyName)) {
      errors.push('Error: ' + requiredProperty.message)
    }
  })
  if (_.isEmpty(errors)) {
    createLenderMatchRegistration({
      name: req.body.contactInfoData.contactFullName,
      phone: req.body.contactInfoData.contactPhoneNumber,
      emailAddress: req.body.contactInfoData.contactEmailAddress,
      businessName: req.body.businessInfoData.businessInfoName,
      businessZip: req.body.businessInfoData.businessInfoZipcode,
      industry: req.body.industryInfoData.industryType,
      industryExperience: req.body.industryInfoData.industryExperience,
      loanAmount: req.body.loanData.loanAmount,
      loanDescription: req.body.loanData.loanDescription,
      loanUsage:
        req.body.hasOwnProperty('loanData') &&
        req.body.loanData.hasOwnProperty('loanUsage')
          ? req.body.loanData.loanUsage
          : '',
      businessWebsite:
        req.body.hasOwnProperty('businessInfoData') &&
        req.body.businessInfoData.hasOwnProperty('businessInfoWebsite')
          ? req.body.businessInfoData.businessInfoWebsite
          : '',
      businessDescription:
        req.body.hasOwnProperty('businessInfoData') &&
        req.body.businessInfoData.hasOwnProperty('businessInfoDescription')
          ? req.body.businessInfoData.businessInfoDescription
          : '',
      hasWrittenPlan:
        req.body.hasOwnProperty('additionalInfoData') &&
        req.body.additionalInfoData.hasOwnProperty('hasWrittenPlan')
          ? req.body.additionalInfoData.hasWrittenPlan
          : false,
      hasFinancialProjections:
        req.body.hasOwnProperty('additionalInfoData') &&
        req.body.additionalInfoData.hasOwnProperty('hasFinancialProjections')
          ? req.body.additionalInfoData.hasFinancialProjections
          : false,
      isGeneratingRevenue:
        req.body.hasOwnProperty('additionalInfoData') &&
        req.body.additionalInfoData.hasOwnProperty('isGeneratingRevenue')
          ? req.body.additionalInfoData.isGeneratingRevenue
          : false,
      isVeteran:
        req.body.hasOwnProperty('additionalInfoData') &&
        req.body.additionalInfoData.hasOwnProperty('isVeteran')
          ? req.body.additionalInfoData.isVeteran
          : false
    }).then(function() {
      res.status(HttpStatus.OK).send()
    })
  } else {
    console.log(errors)
    res
      .status(HttpStatus.BAD_REQUEST)
      .send('Error during validation: ' + errors.join(','))
  }
}

function handleEmailConfirmation(req, res) {
  if (!('token' in req.query)) {
    res.redirect('/lendermatch/emailinvalid')
  } else {
    confirmEmail(req.query.token).then(function(result) {
      if (result === 'success') {
        res.redirect('/lendermatch/emailconfirmed')
      } else if (result === 'expired') {
        res.redirect('/lendermatch/emailinvalid')
      } else {
        res.redirect('/lendermatch/emailinvalid')
      }
    })
  }
}

function handleResendEmailConfirmation(req, res) {
  if (req.body && req.body.emailAddress) {
    resendConfirmationEmail(req.body.emailAddress)
      .then(result => {
        res.status(HttpStatus.NO_CONTENT).send()
      })
      .catch(error => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(
            'The server encountered an error.  Please try again later or contact the helpdesk.'
          )
      })
  } else {
    res.status(
      HttpStatus.BAD_REQUEST,
      'Email Address is required to resend confirmation email'
    )
  }
}

function resetPassword(req, res) {
  if (req && req.sessionInfo) {
    resetLincPassword(req.sessionInfo)
      .then(function(results) {
        res.status(HttpStatus.OK).send(results)
      })
      .catch(error => {
        if (error.message === 'FORBIDDEN') {
          res
            .status(HttpStatus.FORBIDDEN)
            .send('Please log in as an Administrator')
        } else {
          console.error(error)
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send('Error executing action')
        }
      })
  } else {
    res.status(HttpStatus.FORBIDDEN).send('Please log in as an Administrator')
  }
}

export {
  handleLenderMatchSubmission,
  handleEmailConfirmation,
  handleResendEmailConfirmation,
  resetPassword
}
