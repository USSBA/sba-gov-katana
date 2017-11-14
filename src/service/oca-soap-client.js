/* eslint-disable */
import Promise from 'bluebird'
import axios from 'axios'
import { formatMessage } from '../service/linc-message-formatter.js'
const request = require('request')
const xml2js = Promise.promisifyAll(require('xml2js'))
const DOMParser = require('xmldom').DOMParser // eslint-disable-line id-match
const XmlSerializer = require('xmldom').XMLSerializer // eslint-disable-line id-match
import config from 'config'
import _ from 'lodash'

function getEndPointFromXml(response) {
  const responseData = response.data
  const parser = new DOMParser()
  const xmlRespDoc = parser.parseFromString(responseData)
  const targetNode = xmlRespDoc.getElementsByTagName('wsdlsoap:address')[0]
  const location = targetNode.getAttribute('location')
  return location
}

function getEndPointUrl(wsdlUrl) {
  return axios
    .get(wsdlUrl)
    .then(getEndPointFromXml)
    .catch(function(error) {
      console.error('EXCEPTION: Unable to get Endpoint from WSDL file!')
      throw error
    })
}

function convertFormDataToXml(userInfo, lenderMatchRegistration) {
  const objFormData = {
    LINC_APP: {
      SBA_LINC_ENQ: formatMessage(userInfo, lenderMatchRegistration),
      $: {
        version: config.get('linc.ocaVersion')
      }
    }
  }

  const builder = new xml2js.Builder({
    headless: true
  })

  return builder.buildObject(objFormData).replace(/\r?\n/g, '')
}

function createSoapEnvelope(userName, password, bodyData) {
  const text =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.linc" xmlns:x-="http://xml.apache.org/xml-soap"></soapenv:Envelope>'
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(text, 'text/xml')
  const envelope = xmlDoc.documentElement
  const header = xmlDoc.createElement('soapenv:Header')
  const body = xmlDoc.createElement('soapenv:Body')
  envelope.appendChild(header)
  envelope.appendChild(body)
  const firstSbaLinc = xmlDoc.createElement('ws:SBA_LINC')
  body.appendChild(firstSbaLinc)
  const innerSbaLinc = xmlDoc.createElement('ws:SBA_LINC')
  firstSbaLinc.appendChild(innerSbaLinc)
  const firstItem = xmlDoc.createElement('x-:item')
  const secondItem = xmlDoc.createElement('x-:item')
  const thirdItem = xmlDoc.createElement('x-:item')
  innerSbaLinc.appendChild(firstItem)
  innerSbaLinc.appendChild(secondItem)
  innerSbaLinc.appendChild(thirdItem)
  const firstItemKey = xmlDoc.createElement('x-:key')
  const firstItemValue = xmlDoc.createElement('x-:value')
  firstItem.appendChild(firstItemKey)
  firstItem.appendChild(firstItemValue)
  const keyUsername = xmlDoc.createTextNode('username')
  firstItemKey.appendChild(keyUsername)
  const valueUsername = xmlDoc.createTextNode(userName)
  firstItemValue.appendChild(valueUsername)
  const secondItemKey = xmlDoc.createElement('x-:key')
  const secondItemValue = xmlDoc.createElement('x-:value')
  secondItem.appendChild(secondItemKey)
  secondItem.appendChild(secondItemValue)
  const keyPassword = xmlDoc.createTextNode('password')
  secondItemKey.appendChild(keyPassword)
  const valuePassword = xmlDoc.createTextNode(password)
  secondItemValue.appendChild(valuePassword)
  const thirdItemKey = xmlDoc.createElement('x-:key')
  const thirdItemValue = xmlDoc.createElement('x-:value')
  thirdItem.appendChild(thirdItemKey)
  thirdItem.appendChild(thirdItemValue)
  const keySbaLinc = xmlDoc.createTextNode('SBA_LINC')
  thirdItemKey.appendChild(keySbaLinc)
  const wrappedSbaLinc = xmlDoc.createCDATASection(bodyData)
  thirdItemValue.appendChild(wrappedSbaLinc)
  const domSerializer = new XmlSerializer()
  return domSerializer.serializeToString(xmlDoc)
}

function createSoapEnvelopeForPasswordUpdate(userName, password, newPassword) {
  const text =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.linc" xmlns:x-="http://xml.apache.org/xml-soap"></soapenv:Envelope>'
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(text, 'text/xml')
  const envelope = xmlDoc.documentElement
  const header = xmlDoc.createElement('soapenv:Header')
  const body = xmlDoc.createElement('soapenv:Body')
  envelope.appendChild(header)
  envelope.appendChild(body)
  const passwordUpdate = xmlDoc.createElement('ws:PasswordUpdate')
  body.appendChild(passwordUpdate)
  const inputs = xmlDoc.createElement('ws:Inputs')
  passwordUpdate.appendChild(inputs)
  const firstItem = xmlDoc.createElement('x-:item')
  const secondItem = xmlDoc.createElement('x-:item')
  const thirdItem = xmlDoc.createElement('x-:item')
  inputs.appendChild(firstItem)
  inputs.appendChild(secondItem)
  inputs.appendChild(thirdItem)
  const firstItemKey = xmlDoc.createElement('x-:key')
  const firstItemValue = xmlDoc.createElement('x-:value')
  firstItem.appendChild(firstItemKey)
  firstItem.appendChild(firstItemValue)
  const keyUsername = xmlDoc.createTextNode('Username')
  firstItemKey.appendChild(keyUsername)
  const valueUsername = xmlDoc.createTextNode(userName)
  firstItemValue.appendChild(valueUsername)
  const secondItemKey = xmlDoc.createElement('x-:key')
  const secondItemValue = xmlDoc.createElement('x-:value')
  secondItem.appendChild(secondItemKey)
  secondItem.appendChild(secondItemValue)
  const keyPassword = xmlDoc.createTextNode('Password')
  secondItemKey.appendChild(keyPassword)
  const valuePassword = xmlDoc.createTextNode(password)
  secondItemValue.appendChild(valuePassword)
  const thirdItemKey = xmlDoc.createElement('x-:key')
  const thirdItemValue = xmlDoc.createElement('x-:value')
  thirdItem.appendChild(thirdItemKey)
  thirdItem.appendChild(thirdItemValue)
  const keyNewPassword = xmlDoc.createTextNode('NewPassword')
  thirdItemKey.appendChild(keyNewPassword)
  const valueNewPassword = xmlDoc.createTextNode(newPassword)
  thirdItemValue.appendChild(valueNewPassword)
  const domSerializer = new XmlSerializer()
  return domSerializer.serializeToString(xmlDoc)
}

function convertItemsToObject(itemList) {
  const mapped = _.map(itemList, function(item) {
    return {
      key: item.key[0],
      value: item.value[0]
    }
  })
  const keyed = _.keyBy(mapped, 'key')
  const remapped = _.mapValues(keyed, 'value')
  const mappedKeys = _.mapKeys(remapped, (value, key) => {
    let newBaseKey = key.replace('Result', 'Response')
    return _.camelCase(newBaseKey)
  })
  return mappedKeys
}

function parseOcaXmlResponseBody(
  xmlBody,
  firstBodyElementTag,
  secondBodyElementTag
) {
  return xml2js
    .parseStringAsync(xmlBody, {
      ignoreAttrs: true
    })
    .then(r => {
      const itemList =
        r['soapenv:Envelope']['soapenv:Body'][0][firstBodyElementTag][0][
          secondBodyElementTag
        ][0].item
      return convertItemsToObject(itemList)
    })
}

function parseResponse(xmlBody) {
  return parseOcaXmlResponseBody(xmlBody, 'SBA_LINCResponse', 'SBA_LINCReturn')
}

function parsePasswordUpdateResponse(xmlBody) {
  return parseOcaXmlResponseBody(
    xmlBody,
    'PasswordUpdateResponse',
    'PasswordUpdateReturn'
  )
}

function parseResponseText(responseText) {
  return xml2js
    .parseStringAsync(responseText, {
      ignoreAttrs: true,
      explicitArray: false
    })
    .then(r => {
      let data = r.SBALincResponse
      return data
    })
}

function sendLincSoapRequest(endpoint, bodyXml, lincRequest) {
  console.log('Sending Data to OCA', bodyXml)

  return new Promise((resolve, reject) => {
    const options = {
      uri: endpoint,
      method: 'POST',
      followAllRedirects: true,
      followOriginalHttpMethod: true,
      body: bodyXml,
      timeout: 5000,
      secureProtocol: 'TLSv1_2_method',
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8',
        SOAPAction: ''
      }
    }
    request(options, (error, response, body) => {
      if (error) {
        console.log('EXCEPTION: Request failure in sendLincSoapRequest! ')
        console.log(error)
        reject(error)
      } else {
        console.log('Full Response from OCA\n', body)
        let resp = ''
        try {
          resp = lincRequest
            ? parseResponse(body)
            : parsePasswordUpdateResponse(body)
          resolve(resp)
        } catch (error) {
          console.error('Error parsing response', error)
          resp = 'Failed to parse response'
          resolve({
            errorMessageTechnical: 'Failed to parse the XML response from OCA',
            responseCode: '-999',
            passwordUpdateRequired: 'Unknown',
            errorMessageEnglish: 'Failed to parse the XML response from OCA',
            comment: 'See logs for details'
          })
        }
      }
    })
  })
}

export {
  getEndPointUrl,
  convertFormDataToXml,
  createSoapEnvelope,
  sendLincSoapRequest,
  createSoapEnvelopeForPasswordUpdate,
  parsePasswordUpdateResponse,
  parseResponseText
}
