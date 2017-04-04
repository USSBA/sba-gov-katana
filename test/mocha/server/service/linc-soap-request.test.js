let sinon = require('sinon');
import {
  handleSoapResponse
} from "../../../../src/service/linc-service.js";
import {
  lenderMatchSoapResponse,
  lenderMatchRegistration
} from "../../../../src/models/lender-match-registration.js";
import moment from "moment";

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

    it('should result in updating a lenderMatchSoapResponse to processed when responseCode is S', function() {
      let fakeUpdateResponse = {
        responseCode: "S",
        errorMessageEnglish: "Unable to perform service at this time.",
        errorMessageTechnical: "Unable to perform service at this time.",
        lenderMatchRegistrationId: "4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904"
      }
      handleSoapResponse(fakeUpdateResponse);
      const now = moment();
      sinon.assert.calledWith(lenderMatchSoapResponseUpdateStub, {
              processed: now.unix()
          },
          {
              where: {
                  lenderMatchRegistrationId: fakeUpdateResponse.lenderMatchRegistrationId
              }
          });
    });
  });

});
