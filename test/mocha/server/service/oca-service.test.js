let sinon = require('sinon')
import chai from 'chai'
import {
  handleSoapResponse,
  getCredentials
} from '../../../../src/service/oca-service.js'
import lenderMatchRegistration from '../../../../src/models/lender-match-registration.js'
import lenderMatchSoapResponse from '../../../../src/models/lender-match-soap-response.js'
import lincPasswordUpdate from '../../../../src/models/linc-password-update.js'
import emailConfirmation from '../../../../src/models/email-confirmation.js'

describe('linc soap request test', function() {
  describe('response handling tests', function() {
    let lenderMatchSoapResponseCreateStub,
      lenderMatchRegistrationDeleteStub,
      lenderMatchEmailConfirmationDeleteStub,
      lenderMatchSoapResponseDeleteStub

    it('should result in saving a lenderMatchSoapResponse to the database when responseCode is F', function(
      done
    ) {
      lenderMatchSoapResponseCreateStub = sinon
        .stub(lenderMatchSoapResponse, 'create')
        .returns(Promise.resolve(1))
      let fakeFailureResponse = {
        responseCode: '0',
        errorMessageEnglish: 'Unable to perform service at this time.',
        errorMessageTechnical: 'Unable to perform service at this time.',
        lenderMatchRegistrationId: '4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904',
        responseText: {
          TotalRequests: '1',
          Enquiry: {
            index: '1',
            BusinessName: 'businessName',
            ProjectZipCd: '21113',
            Result: 'F'
          },
          GoodRequests: '1',
          FailedRequests: '0'
        }
      }

      handleSoapResponse(fakeFailureResponse)
        .then(() => {
          sinon.assert.calledWith(
            lenderMatchSoapResponseCreateStub,
            fakeFailureResponse
          )
          lenderMatchSoapResponseCreateStub.restore()
        })
        .then(_ => done())
        .catch(done)
    })

    it('should result in saving a lenderMatchSoapResponse to the database when responseCode is P', function(
      done
    ) {
      lenderMatchSoapResponseCreateStub = sinon
        .stub(lenderMatchSoapResponse, 'create')
        .returns(Promise.resolve(1))
      let fakePendingResponse = {
        responseCode: '0',
        errorMessageEnglish: 'Unable to perform service at this time.',
        errorMessageTechnical: 'Unable to perform service at this time.',
        lenderMatchRegistrationId: '4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904',
        responseText: {
          TotalRequests: '1',
          Enquiry: {
            index: '1',
            BusinessName: 'businessName',
            ProjectZipCd: '21113',
            Result: 'P'
          },
          GoodRequests: '1',
          FailedRequests: '0'
        }
      }
      handleSoapResponse(fakePendingResponse)
        .then(() => {
          sinon.assert.calledWith(
            lenderMatchSoapResponseCreateStub,
            fakePendingResponse
          )
          lenderMatchSoapResponseCreateStub.restore()
        })
        .then(_ => done())
        .catch(done)
    })

    it('should result in deleting all related objects when responseCode is S', function(
      done
    ) {
      lenderMatchRegistrationDeleteStub = sinon
        .stub(lenderMatchRegistration, 'destroy')
        .returns(Promise.resolve(1))
      lenderMatchEmailConfirmationDeleteStub = sinon
        .stub(emailConfirmation, 'destroy')
        .returns(Promise.resolve(1))
      lenderMatchSoapResponseDeleteStub = sinon
        .stub(lenderMatchSoapResponse, 'destroy')
        .returns(Promise.resolve(1))

      let fakeSuccessResponse = {
        responseCode: '0',
        errorMessageEnglish: 'Unable to perform service at this time.',
        errorMessageTechnical: 'Unable to perform service at this time.',
        lenderMatchRegistrationId: '4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904',
        responseText: {
          TotalRequests: '1',
          Enquiry: {
            index: '1',
            BusinessName: 'businessName',
            ProjectZipCd: '21113',
            Result: 'S'
          },
          GoodRequests: '1',
          FailedRequests: '0'
        }
      }
      handleSoapResponse(fakeSuccessResponse)
        .then(function() {
          sinon.assert.calledWith(lenderMatchEmailConfirmationDeleteStub, {
            where: {
              lenderMatchRegistrationId:
                fakeSuccessResponse.lenderMatchRegistrationId
            }
          })
          sinon.assert.calledWith(lenderMatchSoapResponseDeleteStub, {
            where: {
              lenderMatchRegistrationId:
                fakeSuccessResponse.lenderMatchRegistrationId
            }
          })
          sinon.assert.calledWith(lenderMatchRegistrationDeleteStub, {
            where: {
              id: fakeSuccessResponse.lenderMatchRegistrationId
            }
          })
          lenderMatchRegistrationDeleteStub.restore()
          lenderMatchEmailConfirmationDeleteStub.restore()
          lenderMatchSoapResponseDeleteStub.restore()
        })
        .then(_ => done())
        .catch(done)
    })

    it.skip('should result in an exception if passed an unknown responseCode', function() {
      let fakeUpdateResponse = {
        responseCode: '0',
        errorMessageEnglish: 'Unable to perform service at this time.',
        errorMessageTechnical: 'Unable to perform service at this time.',
        lenderMatchRegistrationId: '4b4cb2e1-1ea3-488d-9ee5-37bd80ae8904',
        responseText: {
          TotalRequests: '1',
          Enquiry: {
            index: '1',
            BusinessName: 'businessName',
            ProjectZipCd: '21113',
            Result: 'unknown'
          },
          GoodRequests: '1',
          FailedRequests: '0'
        }
      }
      handleSoapResponse(fakeUpdateResponse).should.throw(
        Error,
        'Unknown Response Code receieved from OCA: unknown'
      )
    })
  })

  describe('# getCredentials', () => {
    let lincPasswordUpdateStub

    before(() => {
      lincPasswordUpdateStub = sinon.stub(lincPasswordUpdate, 'findOne')
    })

    afterEach(() => {
      lincPasswordUpdateStub.reset()
    })

    after(() => {
      lincPasswordUpdateStub.restore()
    })

    it('should retrieve credentials but not decrypt them if decrypt is false', done => {
      let record = {
        username: 'lskywalker',
        password: 'thereisstillgoodinhim',
        encrypted: false
      }
      lincPasswordUpdateStub.returns(Promise.resolve(record))
      getCredentials()
        .then(result => {
          result.should.deep.equal({
            username: 'lskywalker',
            password: 'thereisstillgoodinhim',
            record: record
          })
        })
        .then(result => {
          return done()
        })
        .catch(done)
    })

    it('should retrieve credentials but not decrypt them if decrypt is true', done => {
      let record = {
        username: 'lskywalker',
        password:
          '2360ecbbde2a0e63269a199777d89df751127a16c2d706dc143aba443b6cd74535547e0043687ec98b2cd91cd2d945023bGNWlYXSqfTYylaxJvZK+skxBo0J8rpCFOILYg1JM4=',
        encrypted: true
      }
      lincPasswordUpdateStub.returns(Promise.resolve(record))
      getCredentials()
        .then(result => {
          result.should.deep.equal({
            username: 'lskywalker',
            password: 'thereisstillgoodinhim',
            record: record
          })
        })
        .then(result => {
          return done()
        })
        .catch(done)
    })
  })
})
