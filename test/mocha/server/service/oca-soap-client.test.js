import sinon from 'sinon';
import uuid from "uuid";
import _ from "lodash";
import fs from "fs";
import path from "path";

const DOMParser = require("xmldom").DOMParser;

import {
  getEndPointUrl,
  convertFormDataToXml,
  createSoapEnvelope,
  sendLincSoapRequest
} from "../../../../src/service/oca-soap-client.js";

import exampleLenderMatchRegistration from "./data/oca/example-lender-match-registration.js"


describe('OCA SOAP Client', function() {
  // describe('#getEndPointUrl', function() {
  //   it('should', function() {
  //       getEndPointUrl("")
  //   })
  // })
  describe('#convertFormDataToXml', function() {
    it('should convert a lender match registration to proper xml', function() {
      let result = convertFormDataToXml("newUser", exampleLenderMatchRegistration);
      result.should.not.be.null;
      let expected = fs.readFileSync(path.join(__dirname, "./data/oca/expected-lender-match-registration.xml"), "utf-8").trim();
      result.should.equal(expected);
    })
  })
  describe('#createSoapEnvelope', function() {
    it('should wrap the given data in the proper soap envelope', function() {
      let result = createSoapEnvelope("user1", "password1", "<SomeXml/>");
      result.should.not.be.null;
      let expected = fs.readFileSync(path.join(__dirname, "./data/oca/expected-soap-envelope.xml"), "utf-8").trim();
      result.should.equal(expected);
    })
  })
  // describe('#sendLincSoapRequest', function() {
  //   it('should', function() {
  //
  //   })
  // })
})
