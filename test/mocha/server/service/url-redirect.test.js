let sinon = require('sinon')
import chai from 'chai'
import { findNodeIdByUrl, fetchNodeDataById } from '../../../../src/service/url-redirect.js'

describe('URL Redirect Service', function() {
  describe('#findNodeIdByUrl', function() {
    // TODO: Update test once logic is filled in
    it('should return a node matching the given url', function() {
      const result = findNodeIdByUrl('http://www.google.com')
      result.should.equal(1)
    })

    // TODO: Update test once logic is filled in
    it('should return null if there is no node matching the url', function() {
      let result = findNodeIdByUrl('some non existent url')
      // TODO: Remove this line once logic is functional
      result = null
      //should.be.null(result)
    })
  })
  describe('#fetchNodeDataById', function() {
    // TODO: Update test once logic is filled in
    it('should return the correct node data with the given id', function(done) {
      const expected = {
        // TODO: replace this with real data once function is unstubbed
        data: 'my dummy data'
      }
      const result = fetchNodeDataById(1)
      result.should.be.ok
      result.should.eventually.deep.equal(expected).notify(done)
    })

    // TODO: Update test once logic is filled in
    it('should reject invalid node ids', function(done) {
      const result = fetchNodeDataById(null)
      result.should.eventually.be.rejected.notify(done)
    })
  })
})
