//DO NOT INCLUDE THIS IN THE DEFAULT TEST SCRIPT
import chai from 'chai'
import {
  findNodeIdByUrl,
  fetchNodeDataById,
  addUrlNodeMapping,
  mapUrlNodeParameters
} from '../../../../src/service/url-redirect.js'

describe('URL Redirect Service', function() {
  describe('#addUrlNodeMapping', function() {
    it('should successfully return from aws', function(done) {
      const result = addUrlNodeMapping(1, '/partners', new Date())
      result.should.be.fulfilled.notify(done)
      result.then(response => {
        console.log(response)
      })
    })

    it('should update existing entry in aws', function(done) {
      const date = new Date()
      const result = addUrlNodeMapping(2, 'http://www.myurl.com' + date, date)
      const result2 = addUrlNodeMapping(2, 'http://www.myurl.com' + date, date)

      result.should.be.fulfilled
      result2.should.be.fulfilled.notify(done)

      result.then(response => {
        console.log(response)
      })
      result2.then(response => {
        console.log(response)
      })
    })
  })
})
