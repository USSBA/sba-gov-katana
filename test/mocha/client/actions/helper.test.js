import * as helper from '../../../../src/client/actions/helper.js'
import sinon from 'sinon'
import axios from 'axios'

describe('#helper', function() {
  let receiveContentStub
  let fetchContentStub
  let shouldFetchContentStub
  let fetchContentIfNeededStub
  before(function() {
    receiveContentStub = sinon.stub(helper, 'receiveContent')
    receiveContentStub.returns('success')

    fetchContentStub = sinon.stub(helper, 'fetchContent')
    fetchContentStub.returns('success')

    shouldFetchContentStub = sinon.stub(helper, 'shouldFetchContent')
    shouldFetchContentStub.returns('success')

    fetchContentIfNeededStub = sinon.stub(helper, 'fetchContentIfNeeded')
    fetchContentIfNeededStub.returns('success')
  })

  after(function() {
    receiveContentStub.restore()
    fetchContentStub.restore()
    shouldFetchContentStub.restore()
    fetchContentIfNeededStub.restore()
  })

  it('should have receiveContent method', function() {
    const expected = 'success'
    const result = helper.receiveContent()
    result.should.equal(expected)
  })

  it('should have fetchContent method', function() {
    const expected = 'success'
    const result = helper.fetchContent()
    result.should.equal(expected)
  })

  it('should have shouldFetchContent method', function() {
    const expected = 'success'
    const result = helper.shouldFetchContent()
    result.should.equal(expected)
  })

  it('should have fetchContentIfNeeded method', function() {
    const expected = 'success'
    const result = helper.fetchContentIfNeeded()
    result.should.equal(expected)
  })
})
