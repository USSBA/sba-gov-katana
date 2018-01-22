import chai from 'chai'
import sinon from 'sinon'
import AWS from 'aws-sdk'
import {
  findNodeIdByUrl,
  findMostRecentUrlByNodeId,
  addUrlNodeMapping,
  mapUrlQueryParameters,
  mapUrlNodeParameters,
  mapNodeIdQueryParams,
  findMostRecentItem
} from '../../../../src/service/url-redirect.js'

describe('URL Redirect Service', function() {
  // test is skipped because it is live testing the dynamodb test database
  // instead of mocking out the query function.
  describe.skip('#findNodeIdByUrl', function() {
    it('should return a node matching the given url', function(done) {
      const result = findNodeIdByUrl('/lendermatch/laura')
      result.should.eventually.equal('1').notify(done)
    })

    it('should return null if there is no node matching the url', function(done) {
      let result = findNodeIdByUrl('some non existent url').then(nodeId => {
        chai.assert.isNull(nodeId)
        done()
      })
    })
  })
  // test is skipped because it is live testing the dynamodb test database
  // because mocking out dynamodb was not working
  describe.skip('#findMostRecentUrlByNodeId', function() {
    let dynamoDBQueryStub
    beforeEach(() => {
      dynamoDBQueryStub = sinon.stub(AWS, 'DynamoDB').returns({
        query: sinon.stub().returns({
          promise: sinon.stub().resolves({
            mytest: 'test'
          })
        })
      })
    })
    afterEach(() => {
      dynamoDBQueryStub.restore()
    })
    it('should return the correct node data with the given id', function(done) {
      const result = findMostRecentUrlByNodeId('1')
      result.should.eventually.be.ok
      result.should.eventually.equal('/partners').notify(done)
    })

    it('should reject invalid node ids', function(done) {
      const result = findMostRecentUrlByNodeId(null)
      result.should.eventually.be.rejected.notify(done)
    })
  })
  describe('#mapUrlNodeParameters', function() {
    it('should properly format the request parameters', function() {
      const expected = {
        Item: {
          NodeId: { S: '1' },
          Timestamp: { S: 'Mon Jan 08 2018 15:16:15 GMT-0500 (EST)' },
          Url: { S: 'http://myurl.com' }
        },
        ReturnConsumedCapacity: 'TOTAL',
        TableName: 'placeholder'
      }
      const result = mapUrlNodeParameters(
        1,
        'http://myurl.com',
        new Date('Mon Jan 08 2018 15:16:15 GMT-0500 (EST)')
      )
      result.should.deep.equal(expected)
    })
  })

  describe('#mapUrlQueryParameters', function() {
    it('should properly format the request parameters', function() {
      const expected = {
        ExpressionAttributeValues: {
          ':url': {
            S: 'http://www.google.com'
          }
        },
        ExpressionAttributeNames: {
          '#url': 'Url'
        },
        KeyConditionExpression: '#url = :url',
        ReturnConsumedCapacity: 'TOTAL',
        TableName: 'placeholder'
      }
      const result = mapUrlQueryParameters('http://www.google.com')
      result.should.deep.equal(expected)
    })
  })

  describe('#mapNodeIdQueryParams', function() {
    it('should properly format the request parameters', function() {
      const expected = {
        ExpressionAttributeValues: {
          ':nodeId': {
            S: '32'
          }
        },
        IndexName: 'NodeId-Timestamp-index',
        KeyConditionExpression: 'NodeId = :nodeId',
        ReturnConsumedCapacity: 'TOTAL',
        TableName: 'placeholder'
      }
      const result = mapNodeIdQueryParams('32')
      result.should.deep.equal(expected)
    })
  })

  describe('#findMostRecentItem', function() {
    const itemListInMiliseconds = [
      {
        Url: {
          S: 'http://www.url1.com'
        },
        Timestamp: {
          S: '32'
        },
        NodeId: {
          S: '6'
        }
      },
      {
        Url: {
          S: 'http://www.url2.com'
        },
        Timestamp: {
          S: '1000000'
        },
        NodeId: {
          S: '331'
        }
      },
      {
        Url: {
          S: 'http://www.url3.com'
        },
        Timestamp: {
          S: '2000'
        },
        NodeId: {
          S: '21'
        }
      },
      {
        Url: {
          S: 'http://www.url4.com'
        },
        Timestamp: {
          S: '3'
        },
        NodeId: {
          S: '12'
        }
      }
    ]

    const itemListInTimeString = [
      {
        Url: {
          S: 'http://www.url1.com'
        },
        Timestamp: {
          S: '04 Jan 1999 00:12:00 UTC'
        },
        NodeId: {
          S: '6'
        }
      },
      {
        Url: {
          S: 'http://www.url2.com'
        },
        Timestamp: {
          S: '04 Dec 1995 00:12:00 UTC'
        },
        NodeId: {
          S: '331'
        }
      },
      {
        Url: {
          S: 'http://www.url3.com'
        },
        Timestamp: {
          S: '21 Apr 2012 20:12:00 UTC'
        },
        NodeId: {
          S: '21'
        }
      },
      {
        Url: {
          S: 'http://www.url4.com'
        },
        Timestamp: {
          S: '21 Mar 1988 4:32:00 UTC'
        },
        NodeId: {
          S: '12'
        }
      }
    ]
    it('should return null when there are no items in the list', function() {
      const result = findMostRecentItem([])
      chai.assert.isNull(result)
    })
    it('should find the most recent item when timestamp is in ms', function() {
      const expected = {
        Url: {
          S: 'http://www.url2.com'
        },
        Timestamp: {
          S: '1000000'
        },
        NodeId: {
          S: '331'
        }
      }
      const result = findMostRecentItem(itemListInMiliseconds)
      result.should.deep.equal(expected)
    })

    it('should find the most recent item when timestamp is a string', function() {
      const expected = {
        Url: {
          S: 'http://www.url3.com'
        },
        Timestamp: {
          S: '21 Apr 2012 20:12:00 UTC'
        },
        NodeId: {
          S: '21'
        }
      }
      const result = findMostRecentItem(itemListInTimeString)
      result.should.deep.equal(expected)
    })
  })
})
