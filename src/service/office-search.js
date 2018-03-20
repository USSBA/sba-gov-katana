import config from 'config'
import { decode } from 'punycode'
const aws = require('aws-sdk')
const csd = new aws.CloudSearchDomain({
  endpoint: config.get('aws.cloudsearch.officeEndpoint'),
  region: 'us-east-1',
  apiVersions: '2013-01-01'
})

function buildFilterQuery(req) {
  const filters = buildFilters(req)
  const filterArray = []
  //todo use lodash to filter out empty filters
  for (const filter of filters) {
    if (filter) {
      filterArray.push(filter)
    }
  }
  return filterArray.length ? `(and ${filterArray.join(' ')})` : null
}

function buildIsSbaOfficeFilterQuery(isSbaOffice) {
  let sbaOfficeString = ''
  if (isSbaOffice && (isSbaOffice === true || isSbaOffice.toLowerCase() === 'true')) {
    const sbaOfficeNames = config.get('features.office.sbaOfficeNames')
    const sbaSearchStrings = sbaOfficeNames.map(officeName => {
      return `office_type: '${formatString(officeName)}'`
    })
    if (sbaOfficeNames.length === 1) {
      sbaOfficeString = sbaSearchStrings[0]
    } else if (sbaOfficeNames.length > 1) {
      sbaOfficeString = `(or ${sbaSearchStrings.join(' ')})`
    }
  }
  return sbaOfficeString
}

function formatString(string) {
  let result = decodeURI(string)
  //cloudsearch requires us to escape backslashes and quotes
  result = result.replace(/\\/g, '\\\\')
  result = result.replace(/'/g, "\\'")
  return result
}

function buildFilters(req) {
  const { zipCode, service, type, isSbaOffice } = req
  const filters = [
    zipCode ? `location_zipcode: '${formatString(zipCode)}'` : '',
    service ? `office_service: '${formatString(service)}'` : '',
    type ? `office_type: '${formatString(type)}'` : '',
    buildIsSbaOfficeFilterQuery(isSbaOffice)
  ]
  return filters
}
/* This is separate from search because it will need to have custom search to handle searching by specific indecies */
function officeSearch(req, res) {
  const { pageSize, start } = req
  let { term } = req
  term = term ? decodeURI(term) : 'office'

  const defaultPageSize = 20
  const defaultStart = 0
  const params = {
    query: term /* required */,
    //cursor: 'STRING_VALUE',
    //expr: 'STRING_VALUE',
    //facet: 'STRING_VALUE',
    //filterQuery: 'STRING_VALUE',
    //highlight: 'STRING_VALUE',
    //partial: true || false,
    //queryOptions: 'STRING_VALUE',
    //queryParser: 'simple | structured | lucene | dismax',
    //return: 'STRING_VALUE',
    size: pageSize || defaultPageSize,
    //sort: 'STRING_VALUE',
    start: start || defaultStart
  }

  const filterQuery = buildFilterQuery(req)
  if (filterQuery) {
    params.filterQuery = filterQuery
  }

  return new Promise((resolve, reject) => {
    csd.search(params, function(err, data) {
      if (err) {
        // an error occurred

        console.log(err, err.stack)

        reject(err)
      } else {
        // successful response

        const result = data

        resolve(result.hits)
      }
    })
  })
}

export { officeSearch }
