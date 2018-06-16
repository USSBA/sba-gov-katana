const _ = require('lodash')
const config = require('config')
const aws = require('aws-sdk')
const csd = new aws.CloudSearchDomain({
  endpoint: config.get('aws.cloudsearch.officeEndpoint'),
  region: 'us-east-1',
  apiVersions: '2013-01-01'
})

const kilometersPerMile = 1.60934
const dynamoDbClient = require('./dynamo-db-client.js')

// for testing purposes
async function runSearch(params) {
  const result = await csd.search(params).promise()
  return result
}

// function buildFilterQuery(req) {
//   const filters = buildFilters(req)
//   const filterArray = []
//   //todo use lodash to filter out empty filters
//   for (const filter of filters) {
//     if (filter) {
//       filterArray.push(filter)
//     }
//   }
//   return filterArray.length ? `(and ${filterArray.join(' ')})` : null
// }

// function buildIsSbaOfficeFilterQuery(isSbaOffice) {
//   let sbaOfficeString = ''
//   if (isSbaOffice && (isSbaOffice === true || isSbaOffice.toLowerCase() === 'true')) {
//     const sbaOfficeNames = config.get('features.office.sbaOfficeNames')
//     const sbaSearchStrings = sbaOfficeNames.map(officeName => {
//       return `office_type: '${formatString(officeName)}'`
//     })
//     if (sbaOfficeNames.length === 1) {
//       sbaOfficeString = sbaSearchStrings[0]
//     } else if (sbaOfficeNames.length > 1) {
//       sbaOfficeString = `(or ${sbaSearchStrings.join(' ')})`
//     }
//   }
//   return sbaOfficeString
// }

function formatString(string) {
  let result = decodeURI(string)
  //cloudsearch requires us to escape backslashes and quotes
  result = result.replace(/\\/g, '\\\\')
  result = result.replace(/'/g, "\\'")
  return result
}

function buildFilters(service, type) {
  const filters = [
    service ? `office_service: '${formatString(service)}'` : null,
    type ? `office_type: '${formatString(type)}'` : null
  ]
  return _.compact(filters)
}

function buildParams(query, geo) {
  const { pageSize, start, address, q, service, type, distance } = query //eslint-disable-line id-length
  const { latitude, longitude } = geo
  const filters = buildFilters(service, type, distance)
  const defaultPageSize = 20
  const defaultStart = 0
  let params = {
    query: q || 'office', //eslint-disable-line id-length
    filterQuery: filters && filters.length > 0 ? filters.join(' and ') : null,
    return: '_all_fields',
    sort: 'title asc',
    size: pageSize || defaultPageSize,
    start: start || defaultStart
  }
  if (latitude && longitude) {
    params = Object.assign({}, params, {
      sort: 'distance asc',
      return: '_all_fields,distance',
      expr: `{"distance":"haversin(${latitude},${longitude},geolocation.latitude,geolocation.longitude)"}`
    })
  }
  return params
}

async function computeLocation(address) {
  if (!address) {
    return {
      latitude: null,
      longitude: null
    }
  }

  const params = {
    TableName: config.get('aws.cloudsearch.zipCodeDynamoDBTableName'),
    KeyConditionExpression: 'zip = :zipval',
    ExpressionAttributeValues: {
      ':zipval': address
    }
  }
  try {
    const result = await dynamoDbClient.queryDynamoDb(params)
    // assumes that there is only one record in DynamoDB per zipcode
    const item = result.Items[0]
    if (item) {
      return {
        latitude: item.latitude,
        longitude: item.longitude
      }
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
    throw new Error("Failed to geocode user's location")
  }
}

/* This is separate from search because it will need to have custom search to handle searching by specific indecies */
async function officeSearch(query) {
  const { address } = query
  const geo = await computeLocation(address)
  if (!geo) {
    return []
  }

  const params = buildParams(query, geo)
  try {
    const result = await module.exports.runSearch(params) // call the module.exports version for stubbing during testing
    const hits = result.hits
    if (hits && hits.length > 0) {
      const newHitList = hits.hit.map(item => {
        if (item && item.exprs && item.exprs.distance) {
          return Object.assign({}, item, { exprs: { distance: item.exprs.distance / kilometersPerMile } })
        } else {
          return item
        }
      })
      return Object.assign({}, hits, { hit: newHitList })
    } else {
      return hits
    }
  } catch (err) {
    console.error(err, err.stack)
    throw new Error('Failed to search cloudsearch for offices')
  }
}

module.exports.officeSearch = officeSearch
module.exports.computeLocation = computeLocation

// for testing purposes
module.exports.runSearch = runSearch
