import * as helper from '../../../../src/client/actions/helper.js'
import sinon from 'sinon'
import axios from 'axios'

describe('#helper', function() {
  let fetchContentStub
  before(function() {
    fetchContentStub = sinon.stub(helper, 'fetchContent')
    fetchContentStub.returns('success')
  })

  after(function() {
    fetchContentStub.restore()
  })

  it('should have fetchContent method', function() {
    const expected = 'success'
    const result = helper.fetchContent()
    result.should.equal(expected)
  })
})
