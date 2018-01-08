import sinon from 'sinon'
import uuid from 'uuid'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import { pd } from 'pretty-data'

const DOMParser = require('xmldom').DOMParser

import {
  getEndPointUrl,
  convertFormDataToXml,
  createSoapEnvelope,
  sendLincSoapRequest
} from '../../../../src/service/oca-soap-client.js'

import axios from 'axios'

import exampleLenderMatchRegistration from './data/oca/example-lender-match-registration.js'

describe('OCA SOAP Client', function() {
  describe('#getEndPointUrl', function() {
    let wsdlStub
    let fakeWdslUrl = 'https://getmywsdl.com'
    let badWdslUrl = 'http://placehold.it/350x150'

    before(function() {
      let wsdl = fs.readFileSync(path.join(__dirname, './data/oca/linc.wsdl'), 'utf-8').trim()
      wsdlStub = sinon.stub(axios, 'get')
      wsdlStub.withArgs(fakeWdslUrl).returns(
        Promise.resolve({
          data: wsdl
        })
      )
      wsdlStub.withArgs(badWdslUrl).returns(Promise.resolve('<html><body>Hello World!</body><html>'))
      wsdlStub.rejects('TypeError')
    })

    after(function() {
      wsdlStub.restore()
    })

    it('should retrieve the wsdl and parse the proper soap endpoint', function(done) {
      let result = getEndPointUrl(fakeWdslUrl)
      // 1/8/18 this teset wasn't properly asserting. now that I've changed it the expected seems to have changed
      // the old expected url was 'https://catweb2.sba.gov/linc/ws/linc.cfc'
      const expected = 'https://catweb2.sba.gov/lendermatch/ws/linc.cfc'
      result.should.eventually.equal(expected).notify(done)
    })

    it('should fire an error if no wsdl endpoint is configured', function() {
      let result = getEndPointUrl()
      result.should.be.rejected
    })

    it('should fire an error if the wrong wsdl url is given', function() {
      let result = getEndPointUrl(badWdslUrl)
      result.should.be.rejected
    })
  })
  describe('#convertFormDataToXml', function() {
    it('should convert a lender match registration to proper xml', function() {
      let result = pd.xml(convertFormDataToXml('newUser', exampleLenderMatchRegistration))
      result.should.not.be.null
      let expected = pd
        .xml(
          fs.readFileSync(
            path.join(__dirname, './data/oca/expected-lender-match-registration.xml'),
            'utf-8'
          )
        )
        .trim()
      result.should.equal(expected)
    })
  })
  describe('#createSoapEnvelope', function() {
    it('should wrap the given data in the proper soap envelope', function() {
      let result = createSoapEnvelope('user1', 'password1', '<SomeXml/>')
      result.should.not.be.null
      let expected = fs
        .readFileSync(path.join(__dirname, './data/oca/expected-soap-envelope.xml'), 'utf-8')
        .trim()
      result.should.equal(expected)
    })
  })
})
