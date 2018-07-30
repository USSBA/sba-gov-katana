let sinon = require('sinon')
let chai = require('chai')
chai.should()
let expect = chai.expect

let officeSearch = require('../../../../src/service/office-search.js')
let dynamoDbClient = require('../../../../src/service/dynamo-db-client.js')

let exampleDynamoDBResponse = {
  Items: [
    {
      city: 'Old Greenwich',
      zip: '06870',
      dst: 1,
      longitude: '-73.568040',
      timezone: -5,
      country: 'us',
      latitude: '41.033347',
      state: 'CT'
    },
    {
      city: 'Other Greenwich',
      zip: '06871',
      dst: 1,
      longitude: '-74.568040',
      timezone: -5,
      country: 'us',
      latitude: '40.033347',
      state: 'CT'
    }
  ],
  Count: 1,
  ScannedCount: 1
}

let exampleCloudSearchResponse = {
  status: { timems: 3, rid: '3sCN9b4slBwKlnJa' },
  hits: {
    found: 526,
    start: 0,
    hit: [
      {
        id: '5663',
        fields: {
          location_city: ['Bozeman'],
          location_state: ['MT'],
          location_zipcode: ['59717'],
          location_name: ['Bozeman'],
          location_hours_of_operation: ['Monday through Friday from 9 a.m. to 5 p.m.'],
          title: ['406 Labs'],
          office_type: ['Startup accelerator'],
          geolocation: ['45.66652999999999,-111.047602'],
          office_website: ['http://www.montana.edu/launchpad/accelerator.html'],
          type: ['office'],
          location_street_address: ['251 A&B Strand Union Building']
        }
      },
      {
        id: '5664',
        fields: {
          location_city: ['Topeka'],
          location_phone_number: ['785-783-8062'],
          location_zipcode: ['66603'],
          location_name: ['Topeka'],
          location_hours_of_operation: ['Monday through Friday from 9 a.m. to 5 p.m.'],
          location_state: ['KS'],
          title: ['712 Innovations'],
          office_type: ['Startup accelerator'],
          geolocation: ['39.0496664,-95.67365269999999'],
          office_website: ['http://www.712Innovations.com'],
          type: ['office'],
          location_street_address: ['712 S Kansas Ave., Suite 1']
        }
      }
    ]
  }
}

let exampleCloudSearchEmptyResponse = {
  status: { timems: 31, rid: '//mU9b4s+C0KlCOm' },
  hits: { found: 0, start: 0, hit: [] }
}

describe('# Office Search', () => {
  let dynamoDbClientQueryStub
  let officeSearchRunSearchStub

  before(() => {
    dynamoDbClientQueryStub = sinon.stub(dynamoDbClient, 'queryDynamoDb')
    officeSearchRunSearchStub = sinon.stub(officeSearch, 'runSearch')
  })

  afterEach(() => {
    dynamoDbClientQueryStub.reset()
    officeSearchRunSearchStub.reset()
  })

  after(() => {
    dynamoDbClientQueryStub.restore()
    officeSearchRunSearchStub.restore()
  })

  afterEach(() => {
    dynamoDbClientQueryStub.reset()
    officeSearchRunSearchStub.reset()
  })

  describe('computeLocation', () => {
    it('should return the lat and long from the first item that DynamoDB returns', async () => {
      dynamoDbClientQueryStub.returns(exampleDynamoDBResponse)
      let result = await officeSearch.computeLocation('11111')
      result.should.eql({ latitude: '41.033347', longitude: '-73.568040' })
    })

    it('should return null if the zip code is invalid', async () => {
      dynamoDbClientQueryStub.returns({
        Items: [],
        Count: 0,
        ScannedCount: 1
      })
      let result = await officeSearch.computeLocation('00000')
      expect(result).to.eql(null)
    })
  })

  describe('officeSearch', () => {
    it('should properly handle an empty address', async () => {
      dynamoDbClientQueryStub.returns(exampleDynamoDBResponse)
      officeSearchRunSearchStub.returns(exampleCloudSearchEmptyResponse)
      let result = await officeSearch.officeSearch({ address: null })
      officeSearchRunSearchStub.calledOnce.should.be.true
      officeSearchRunSearchStub.calledWith({
        query: `type: 'office'`,
        filterQuery: null,
        queryParser: 'structured',
        return: '_all_fields',
        sort: 'title asc',
        size: 20,
        start: 0
      }).should.be.true
      result.should.eql(exampleCloudSearchEmptyResponse.hits)
    })

    it('should properly handle no address', async () => {
      dynamoDbClientQueryStub.returns(exampleDynamoDBResponse)
      officeSearchRunSearchStub.returns(exampleCloudSearchEmptyResponse)
      let result = await officeSearch.officeSearch({})
      officeSearchRunSearchStub.calledOnce.should.be.true
      officeSearchRunSearchStub.calledWith({
        query: `type: 'office'`,
        filterQuery: null,
        queryParser: 'structured',
        return: '_all_fields',
        sort: 'title asc',
        size: 20,
        start: 0
      }).should.be.true
      result.should.eql(exampleCloudSearchEmptyResponse.hits)
    })

    it('should enter the lat and long into the params for cloudsearch query', async () => {
      dynamoDbClientQueryStub.returns(exampleDynamoDBResponse)
      officeSearchRunSearchStub.returns(exampleCloudSearchEmptyResponse)
      let result = await officeSearch.officeSearch({ address: '06870' })
      officeSearchRunSearchStub.calledOnce.should.be.true
      officeSearchRunSearchStub.calledWith({
        query: `type: 'office'`,
        filterQuery: null,
        queryParser: 'structured',
        return: '_all_fields,distance',
        sort: 'distance asc',
        size: 20,
        start: 0,
        expr: '{"distance":"haversin(41.033347,-73.568040,geolocation.latitude,geolocation.longitude)"}'
      }).should.be.true
      result.should.eql(exampleCloudSearchEmptyResponse.hits)
    })
  })
})
