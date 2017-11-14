import config from 'config'
import {
  getEndPointUrl,
  convertFormDataToXml,
  createSoapEnvelope,
  sendLincSoapRequest,
  createSoapEnvelopeForPasswordUpdate,
  parseResponseText
} from './oca-soap-client.js'
import lenderMatchRegistration from '../models/lender-match-registration.js'
import lenderMatchSoapResponse from '../models/lender-match-soap-response.js'
import emailConfirmation from '../models/email-confirmation.js'
import lincPasswordUpdate from '../models/linc-password-update.js'
import {
  generateOcaPassword,
  decryptPassword,
  encryptPassword
} from '../util/password-manager.js'

import moment from 'moment'
import _ from 'lodash'

function createLenderMatchSoapResponseData(data) {
  return lenderMatchSoapResponse.create(data)
}

function updateLenderMatchSoapResponse(lenderMatchRegistrationId) {
  return lenderMatchSoapResponse
    .update(
      {
        processed: moment().unix()
      },
      {
        where: {
          lenderMatchRegistrationId: lenderMatchRegistrationId
        }
      }
    )
    .catch(err => {
      console.log('EXCEPTION: Problem updating lenderMatchSoapResponse.')
      throw err
    })
}

function deleteLenderMatchRegistration(lenderMatchRegistrationId) {
  return emailConfirmation
    .destroy({
      where: {
        lenderMatchRegistrationId: lenderMatchRegistrationId
      }
    })
    .then(function() {
      return lenderMatchSoapResponse.destroy({
        where: {
          lenderMatchRegistrationId: lenderMatchRegistrationId
        }
      })
    })
    .then(function() {
      return lenderMatchRegistration.destroy({
        where: {
          id: lenderMatchRegistrationId
        }
      })
    })
    .catch(err => {
      console.log('EXCEPTION: Problem deleting lenderMatchRegistration.')
      throw err
    })
}

function updateLincPassword(record, newPassword) {
  const newExpiry = moment()
    // eslint-disable-next-line no-magic-numbers
    .add(record.schedule * 60, 'seconds')
    .unix()
  return lincPasswordUpdate
    .update(
      {
        expiry: newExpiry,
        password: newPassword,
        encrypted: true
      },
      {
        where: {
          id: record.id
        }
      }
    )
    .catch(err => {
      console.error('EXCEPTION: Problem updating lincPasswordUpdate table.')
      throw err
    })
}

function sendPasswordUpdateToOca(userName, password, newPassword) {
  const passwordUpdateSoapEnvelope = createSoapEnvelopeForPasswordUpdate(
    userName,
    password,
    newPassword
  )
  return getEndPointUrl(config.get('oca.soap.wsdlUrl')).then(function(
    endpoint
  ) {
    return sendLincSoapRequest(endpoint, passwordUpdateSoapEnvelope, false)
  })
}

function sendPasswordUpdateRequest() {
  return getCredentials()
    .then(credentials => {
      const newPlainTextPassword = generateOcaPassword()
      const newEncryptedPassword = encryptPassword(newPlainTextPassword)
      return sendPasswordUpdateToOca(
        credentials.username,
        credentials.password,
        newPlainTextPassword
      ).then(result => {
        console.log('Parsed response from OCA', result)
        if (result.responseCode === '0') {
          return updateLincPassword(credentials.record, newEncryptedPassword)
        } else {
          console.error(
            'Receieved a non-zero response code from OCA during Password reset'
          )
          throw new Error('Error updating password: ', JSON.stringify(result))
        }
      })
    })
    .catch(error => {
      console.error('Error updating password: ', error)
    })
}

function handleSoapResponse(soapResponse) {
  const finalResultCode = soapResponse.responseText.Enquiry.Result
  if (finalResultCode === 'P' || finalResultCode === 'F') {
    return createLenderMatchSoapResponseData(soapResponse)
  } else if (finalResultCode === 'S') {
    return deleteLenderMatchRegistration(soapResponse.lenderMatchRegistrationId)
  }
  throw new Error(
    'Unknown Response Code receieved from OCA: ' + finalResultCode
  )
}

function getCredentials() {
  return lincPasswordUpdate.findOne().then(record => {
    if (record && record.username && record.password) {
      const password = record.encrypted
        ? decryptPassword(record.password)
        : record.password
      return {
        username: record.username,
        password: password,
        record: record
      }
    } else {
      throw new Error(
        'Unknown error retrieving username and password from database.'
      )
    }
  })
}

function sendDataToOca(lenderMatchRegistrationData) {
  const sbagovUserId = 'Username'
  const dataAsXml = convertFormDataToXml(
    sbagovUserId,
    lenderMatchRegistrationData
  )
  console.log('OCA Service Data before SOAP', dataAsXml)
  const promise = getEndPointUrl(config.get('oca.soap.wsdlUrl')) // TODO execute endpoint retrieval and credentials retrieval in parallel
    .then(function(endpoint) {
      return getCredentials().then(credentials => {
        if (credentials && credentials.username && credentials.password) {
          const soapEnvelope = createSoapEnvelope(
            credentials.username,
            credentials.password,
            dataAsXml
          )
          return sendLincSoapRequest(endpoint, soapEnvelope, true)
        }
        throw new Error(
          'Unable to retrieve Username and Password from database.'
        )
      })
    })
    .then(function(response) {
      console.log('Parsed response from OCA', response)

      return parseResponseText(response.response).then(parsedReponseText => {
        return _.merge({}, response, {
          lenderMatchRegistrationId: lenderMatchRegistrationData.id,
          responseText: parsedReponseText
        })
      })
    })
    .catch(error => {
      console.log('Unable to send data to OCA.')
      throw error
    })
  return Promise.resolve(promise) // wrap in a bluebird promise
}

export {
  sendDataToOca,
  handleSoapResponse,
  sendPasswordUpdateRequest,
  getCredentials
}
