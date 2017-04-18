let sinon = require('sinon');
import {
  handleSoapResponse
} from "../../../../src/service/linc-service.js";
import {
  lenderMatchRegistration
} from "../../../../src/models/lender-match-registration.js";
import {
    lenderMatchSoapResponse
} from "../../../../src/models/lender-match-soap-response.js";
import EmailConfirmation from "../../../../src/models/email-confirmation.js";

describe('linc soap request test', function() {

  describe('response handling tests', function() {
    let lenderMatchSoapResponseCreateStub, lenderMatchSoapResponseUpdateStub, lenderMatchRegistrationDeleteStub, lenderMatchEmailConfirmationDeleteStub, lenderMatchSoapResponseDeleteStub, fakeSoapResponse;

    beforeEach(function() {
      lenderMatchSoapResponseCreateStub = sinon.stub(lenderMatchSoapResponse, 'create').returns(Promise.resolve(1));
      lenderMatchSoapResponseUpdateStub = sinon.stub(lenderMatchSoapResponse, 'update').returns(Promise.resolve(1));
      lenderMatchRegistrationDeleteStub = sinon.stub(lenderMatchRegistration, 'destroy').returns(Promise.resolve(1));
      lenderMatchEmailConfirmationDeleteStub = sinon.stub(EmailConfirmation, 'destroy').returns(Promise.resolve(1));
      lenderMatchSoapResponseDeleteStub = sinon.stub(lenderMatchSoapResponse, 'destroy').returns(Promise.resolve(1));

    });

    afterEach(function() {
      lenderMatchSoapResponseCreateStub.restore();
      lenderMatchSoapResponseUpdateStub.restore();
      lenderMatchRegistrationDeleteStub.restore();
      lenderMatchEmailConfirmationDeleteStub.restore();
      lenderMatchSoapResponseDeleteStub.restore();
    });
    it('should result in saving a lenderMatchSoapResponse to the database when responseCode is F', function() {
      let fakeFailureResponse = {
        responseCode: "F",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }

      handleSoapResponse(fakeFailureResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseCreateStub, fakeFailureResponse);
    });

    it('should result in saving a lenderMatchSoapResponse to the database when responseCode is P', function() {
      let fakePendingResponse = {
        responseCode: "P",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }
      handleSoapResponse(fakePendingResponse);
      sinon.assert.calledWith(lenderMatchSoapResponseCreateStub, fakePendingResponse);
    });

    /*it('should result in deleting a lenderMatchRegistration when responseCode is S', function() {
      let fakeUpdateResponse = {
        responseCode: "S",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }
      handleSoapResponse(fakeUpdateResponse);
      sinon.assert.calledWith(lenderMatchRegistrationDeleteStub,
          {
              where: {
                  id: fakeUpdateResponse.lenderMatchRegistrationId
              }
          });
    });*/

      /*it('should result in deleting a lenderMatchSoapResponse when responseCode is S', function() {
          let fakeUpdateResponse = {
              responseCode: "S",
              errorMessageEnglish: "Unable to perform service at this time.",
              errorMessageTechnical: "Unable to perform service at this time.",
              lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
          }
          handleSoapResponse(fakeUpdateResponse);
          sinon.assert.calledWith(lenderMatchSoapResponseDeleteStub,
              {
                  where: {
                      lenderMatchRegistrationId: fakeUpdateResponse.lenderMatchRegistrationId
                  }
              });
      });*/

      it('should result in deleting an EmailConfirmation when responseCode is S', function() {
          let fakeUpdateResponse = {
              responseCode: "S",
              errorMessageEnglish: "Unable to perform service at this time.",
              errorMessageTechnical: "Unable to perform service at this time.",
              lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
          }
          handleSoapResponse(fakeUpdateResponse);
          sinon.assert.calledWith(lenderMatchEmailConfirmationDeleteStub,
              {
                  where: {
                      lenderMatchRegistrationId: fakeUpdateResponse.lenderMatchRegistrationId
                  }
              });
      });

      it('should result in an exception if passed an unknown responseCode', function() {
          let fakeUpdateResponse = {
              responseCode: "unknown",
              errorMessageEnglish: "Unable to perform service at this time.",
              errorMessageTechnical: "Unable to perform service at this time.",
              lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
          };

          (function() {
              handleSoapResponse(fakeUpdateResponse);
          }).should.throw("Unknown Response Code receieved from OCA.");
      });

  });

});
