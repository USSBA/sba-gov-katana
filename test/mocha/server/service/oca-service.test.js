let sinon = require('sinon');
import chai from "chai";
import {
  handleSoapResponse,
  sendPasswordUpdateRequest
} from "../../../../src/service/oca-service.js";
import lenderMatchRegistration from "../../../../src/models/lender-match-registration.js";
import lenderMatchSoapResponse from "../../../../src/models/lender-match-soap-response.js";
import emailConfirmation from "../../../../src/models/email-confirmation.js";
import lincPasswordUpdate from "../../../../src/models/linc-password-update.js";

describe('linc soap request test', function() {

  describe('response handling tests', function() {
    let lenderMatchSoapResponseCreateStub,
        lenderMatchSoapResponseUpdateStub,
        lenderMatchRegistrationDeleteStub,
        lenderMatchEmailConfirmationDeleteStub,
        lenderMatchSoapResponseDeleteStub,
        findOneSuccessfulStub;

    let fakePasswordUpdateDate = {
      id: 'ddcd46a1-908e-4c7b-a6b9-1992f889c30b',
      username: 'lincUser',
      password: 'my2Pen4$',
      expiry: 1499286597,
      schedule: 43200
    };

    beforeEach(function() {
      lenderMatchSoapResponseCreateStub = sinon.stub(lenderMatchSoapResponse, 'create').returns(Promise.resolve(1));
      lenderMatchSoapResponseUpdateStub = sinon.stub(lenderMatchSoapResponse, 'update').returns(Promise.resolve(1));
      lenderMatchRegistrationDeleteStub = sinon.stub(lenderMatchRegistration, 'destroy').returns(Promise.resolve(1));
      lenderMatchEmailConfirmationDeleteStub = sinon.stub(emailConfirmation, 'destroy').returns(Promise.resolve(1));
      lenderMatchSoapResponseDeleteStub = sinon.stub(lenderMatchSoapResponse, 'destroy').returns(Promise.resolve(1));
      findOneSuccessfulStub = sinon.stub(lincPasswordUpdate, 'findOne').returns(Promise.resolve(fakePasswordUpdateDate));
    });

    afterEach(function() {
      lenderMatchSoapResponseCreateStub.restore();
      lenderMatchSoapResponseUpdateStub.restore();
      lenderMatchRegistrationDeleteStub.restore();
      lenderMatchEmailConfirmationDeleteStub.restore();
      lenderMatchSoapResponseDeleteStub.restore();
      findOneSuccessfulStub.restore();
    });
    it('should result in error if no lincPasswordUpdate record in DB', function(){
        sendPasswordUpdateRequest();
        sinon.assert.called(findOneSuccessfulStub);
    });
    it('should result in saving a lenderMatchSoapResponse to the database when responseCode is F', function() {
      let fakeFailureResponse = {
        responseCode: "F",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      };

      handleSoapResponse(fakeFailureResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseCreateStub, fakeFailureResponse);
    });

    it('should result in saving a lenderMatchSoapResponse to the database when responseCode is P', function() {
      let fakePendingResponse = {
        responseCode: "P",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      };
      handleSoapResponse(fakePendingResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseCreateStub, fakePendingResponse);
    });

    it('should result in deleting all related objects when responseCode is S', function(done) {
      let fakeSuccessResponse = {
        responseCode: "S",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      };
      handleSoapResponse(fakeSuccessResponse).then(function() {
        sinon.assert.calledWith(lenderMatchEmailConfirmationDeleteStub, {
          where: {
            lenderMatchRegistrationId: fakeSuccessResponse.lenderMatchRegistrationId
          }
        });
        sinon.assert.calledWith(lenderMatchSoapResponseDeleteStub, {
          where: {
            lenderMatchRegistrationId: fakeSuccessResponse.lenderMatchRegistrationId
          }
        });
        sinon.assert.calledWith(lenderMatchRegistrationDeleteStub, {
          where: {
            id: fakeSuccessResponse.lenderMatchRegistrationId
          }
        });
      }).then(done);
    });

    it('should result in an exception if passed an unknown responseCode', function() {
      let fakeUpdateResponse = {
        responseCode: "unknown",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      };
      handleSoapResponse.bind(this, fakeUpdateResponse).should.throw("Unknown Response Code receieved from OCA.");
    });

  });

});
