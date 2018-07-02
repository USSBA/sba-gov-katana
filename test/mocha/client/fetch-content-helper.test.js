import * as helper from '../../../src/client/fetch-content-helper'
import sinon from 'sinon'

describe('#helper', function() {
  let fetchSiteContentStub, fetchRestContentStub
  before(function() {
    fetchSiteContentStub = sinon.stub(helper, 'fetchSiteContent')
    fetchSiteContentStub.returns('success')

    fetchRestContentStub = sinon.stub(helper, 'fetchRestContent')
    fetchRestContentStub.returns('success')
  })

  after(function() {
    fetchRestContentStub.restore()
    fetchSiteContentStub.restore()
  })

  it('should have fetchSiteContent method', function() {
    const expected = 'success'
    const result = helper.fetchSiteContent()
    result.should.equal(expected)
  })
  it('should have fetchRestContent method', function() {
    const expected = 'success'
    const result = helper.fetchRestContent()
    result.should.equal(expected)
  })
})
