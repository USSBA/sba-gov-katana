import * as helper from '../../../src/client/fetch-content-helper'
import sinon from 'sinon'

describe('#helper', function() {
  let fetchContentByIdStub, fetchContentByQuery
  before(function() {
    fetchContentByIdStub = sinon.stub(helper, 'fetchContentById')
    fetchContentByIdStub.returns('success')

    fetchContentByQuery = sinon.stub(helper, 'fetchContentByQuery')
    fetchContentByQuery.returns('success')
  })

  after(function() {
    fetchContentByIdStub.restore()
    fetchContentByQuery.restore()
  })

  it('should have fetchContentById method', function() {
    const expected = 'success'
    const result = helper.fetchContentById()
    result.should.equal(expected)
  })
  it('should have fetchContentByQuery method', function() {
    const expected = 'success'
    const result = helper.fetchContentByQuery()
    result.should.equal(expected)
  })
})
