let sinon = require('sinon');
import fs from "fs";
import path from "path";
import chai from "chai";
import { sendPasswordUpdateRequest, generatePassword } from "../../../../src/service/oca-service.js";

import { getEndPointUrl, sendLincSoapRequest, createSoapEnvelopeForPasswordUpdate, parsePasswordUpdateResponse } from "../../../../src/service/oca-soap-client.js";

import lincPasswordUpdate from "../../../../src/models/linc-password-update.js";

describe('LINC Soap Password updater', function() {

  describe('response handling tests', function() {
    let findOneSuccessfulStub,
      getEndPointUrlStub,
      sendLincSoapRequestStub,
      lincPasswordUpdateStub;

    it('should result in error if no lincPasswordUpdate record in DB', function() {
      let fakePasswordUpdateData = {
        id: 'ddcd46a1-908e-4c7b-a6b9-1992f889c30b',
        username: 'lincUser',
        password: 'my2Pen4$',
        expiry: 1499286597,
        schedule: 43200
      };

      let fakeSoapResponse = {
        passwordUpdateRequired: "No",
        errorMessageEnglish: "",
        comment: "Password changed.",
        errorMessageTechnical: "",
        responseCode: "0"
      };

      let myObj = {};

      myObj.getEndPointUrl = getEndPointUrl;
      myObj.sendLincSoapRequest = sendLincSoapRequest;


      findOneSuccessfulStub = sinon.stub(lincPasswordUpdate, 'findOne').returns(Promise.resolve(fakePasswordUpdateData));
      getEndPointUrlStub = sinon.stub(myObj, 'getEndPointUrl').returns(Promise.resolve("https://catweb2.sba.gov/linc/ws/linc.cfc"));
      sendLincSoapRequestStub = sinon.stub(myObj, 'sendLincSoapRequest').returns(Promise.resolve(fakeSoapResponse));
      lincPasswordUpdateStub = sinon.stub(lincPasswordUpdate, 'update').returns(Promise.resolve(1));
      sendPasswordUpdateRequest();
      sinon.assert.called(findOneSuccessfulStub);
      findOneSuccessfulStub.restore();
      getEndPointUrlStub.restore();
      sendLincSoapRequestStub.restore();
      lincPasswordUpdateStub.restore();
    });

  });

  it('should parse the success response properly ', function(done) {
    let expectedResult = {
      errorMessageTechnical: "",
      responseCode: "0",
      passwordUpdateRequired: "No",
      errorMessageEnglish: "",
      comment: "Password changed."
    };
    let successXmlResponse = fs.readFileSync(path.join(__dirname, "./data/oca/oca-password-update-success-response.xml"), "utf-8").trim();
    parsePasswordUpdateResponse(successXmlResponse).then((result) => {
      result.should.not.be.null;
      result.should.eql(expectedResult);
    })
      .then(_ => done())
      .catch(done);
  });

  it('should parse the success response properly (new version 2017-08-30)', function(done) {
    let expectedResult = {
      errorMessageTechnical: "",
      responseCode: "0",
      passwordUpdateRequired: "No",
      errorMessageEnglish: "",
      comment: "Password changed."
    };
    let successXmlResponse = fs.readFileSync(path.join(__dirname, "./data/oca/oca-password-update-success-response-new-20170830.xml"), "utf-8").trim();
    parsePasswordUpdateResponse(successXmlResponse).then((result) => {
      result.should.not.be.null;
      result.should.eql(expectedResult);
    })
      .then(_ => done())
      .catch(done);
  });

  it('should parse the error response properly ', function(done) {
    let expectedResult = {
      passwordUpdateRequired: "Unknown",
      errorMessageEnglish: "The attempt to update password failed. (-15)",
      comment: "Password not changed.",
      errorMessageTechnical: "The stored procedure to update the password did not return the expected response. Your account has been locked. Please call CLS at 571.419.6359 to unlock your account.",
      responseCode: "-15"
    };
    let failedXmlResponse = fs.readFileSync(path.join(__dirname, "./data/oca/oca-password-update-failure-response.xml"), "utf-8").trim();
    parsePasswordUpdateResponse(failedXmlResponse).then(result => {
      result.should.not.be.null;
      result.should.eql(expectedResult);
    }).then(_ => done()).catch(done);
  });


  it('should parse the error response properly  (new version 2017-08-30)', function(done) {
    let expectedResult = {
      passwordUpdateRequired: "Unknown",
      errorMessageEnglish: "The attempt to update password failed. (-15)",
      comment: "Password not changed.",
      errorMessageTechnical: "The stored procedure to update the password did not return the expected response. Your account has been locked. Please call CLS at 571.419.6359 to unlock your account.",
      responseCode: "-15"
    };
    let failedXmlResponse = fs.readFileSync(path.join(__dirname, "./data/oca/oca-password-update-failure-response-new-20170830.xml"), "utf-8").trim();
    parsePasswordUpdateResponse(failedXmlResponse).then(result => {
      result.should.not.be.null;
      result.should.eql(expectedResult);
    }).then(_ => done()).catch(done);
  });

  describe('create soap envelope for password update test', function() {
    it('should wrap the given data in the proper soap envelope', function() {
      let result = createSoapEnvelopeForPasswordUpdate("Username_1", "Password_1", "NewPassword_1");
      result.should.not.be.null;
      let expected = fs.readFileSync(path.join(__dirname, "./data/oca/expected-password-update-soap-envelope.xml"), "utf-8").trim();
      result.should.equal(expected);
    })
  });
});
