let sinon = require('sinon');
import {
  handleSoapResponse
} from "../../../../src/service/linc-service.js";
import {
  lenderMatchSoapResponse,
  lenderMatchRegistration
} from "../../../../src/models/lender-match-registration.js";


describe('linc soap request test', function() {

  describe('response handling tests', function() {
    let lenderMatchSoapResponseCreateStub, lenderMatchSoapResponseUpdateStub, lenderMatchRegistrationDeleteStub, fakeSoapResponse;

    beforeEach(function() {
      lenderMatchSoapResponseCreateStub = sinon.stub(lenderMatchSoapResponse, 'create').returns(Promise.resolve(1));
      lenderMatchSoapResponseUpdateStub = sinon.stub(lenderMatchSoapResponse, 'update').returns(Promise.resolve(1));
      lenderMatchRegistrationDeleteStub = sinon.stub(lenderMatchRegistration, 'destroy').returns(Promise.resolve(1));

    });

    afterEach(function() {
      lenderMatchSoapResponseCreateStub.restore();
      lenderMatchSoapResponseUpdateStub.restore();
      lenderMatchRegistrationDeleteStub.restore();
    });
    it('Failure as soap response test', function() {
      fakeSoapResponse = {
        responseCode: "F",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }

      handleSoapResponse(fakeSoapResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseCreateStub, fakeSoapResponse);
    });

    it('Pending as soap response test', function() {
      fakeSoapResponse = {
        responseCode: "P",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }
      handleSoapResponse(fakeSoapResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseCreateStub, fakeSoapResponse);
    });

    it('Success Update as soap response test', function() {
      fakeSoapResponse = {
        responseCode: "S",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }
      handleSoapResponse(fakeSoapResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseUpdateStub, fakeSoapResponse.lenderMatchRegistrationId);
    });
  });

});
