let sinon = require('sinon')
import chai from 'chai'

import {
  fetchNewUrlByOldUrl,
  mapUrlRedirectQueryParameters,
  addUrRedirectMapping,
  mapUrlRedirectPutParameters
} from '../../../../src/service/drupal-url-redirect.js'

describe('#Drupal Url Redirect Service', () => {
  describe('#mapUrlRedirectQueryParameters', () => {
    it('correctly maps parameters', () => {
      const creationTimeInMiliseconds = 2000
      const params = mapUrlRedirectPutParameters(
        'http://www.myoldurl.com',
        'http://www.mynewurl.com',
        creationTimeInMiliseconds,
        'lsemesky'
      )
      const expectedResult = {
        Item: {
          LastModified: {
            N: 2000
          },
          LastModifiedBy: {
            S: 'lsemesky'
          },
          NewUrl: {
            S: 'http://www.mynewurl.com'
          },
          OldUrl: {
            S: 'http://www.myoldurl.com'
          }
        },
        ReturnConsumedCapacity: 'TOTAL',
        TableName: 'DrupalUrlRedirect'
      }
      params.should.deep.equal(expectedResult)
    })
  })

  describe('#mapUrlRedirectQueryParameters', () => {
    it('correctly maps parameters', () => {
      const params = mapUrlRedirectQueryParameters('http://www.oldurl.com')
      const expectedResult = {
        Key: {
          OldUrl: {
            S: 'http://www.oldurl.com'
          }
        },
        ProjectionExpression: 'OldUrl, NewUrl, LastModified, LastModifiedBy',
        TableName: 'DrupalUrlRedirect'
      }
      params.should.deep.equal(expectedResult)
    })
  })
})
