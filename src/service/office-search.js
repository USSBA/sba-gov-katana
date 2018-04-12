import config from 'config'
const aws = require('aws-sdk')
const csd = new aws.CloudSearchDomain({
  endpoint: config.get('aws.cloudsearch.officeEndpoint'),
  region: 'us-east-1',
  apiVersions: '2013-01-01'
})
/* This is separate from search because it will need to have custom search to handle searching by specific indecies */
function officeSearch(req, res) {
  //todo: there will need to be logic to map out the query string to the correct cloudsearch params
  const { term, zipCode, pageSize, start } = req
  const fixedTerm = term ? decodeURIComponent(term) : 'office'
  const filterQuery = zipCode ? `(and location_zipcode:'${zipCode}')` : ''
  const defaultPageSize = 20
  const defaultStart = 0
  const params = {
    query: fixedTerm /* required */,
    //cursor: 'STRING_VALUE',
    //expr: 'STRING_VALUE',
    //facet: 'STRING_VALUE',
    //filterQuery: 'STRING_VALUE',
    //highlight: 'STRING_VALUE',
    //partial: true || false,
    //queryOptions: 'STRING_VALUE',
    //queryParser: 'simple | structured | lucene | dismax',
    //return: 'STRING_VALUE',
    size: pageSize | defaultPageSize,
    //sort: 'STRING_VALUE',
    start: start | defaultStart
  }

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

        resolve(result.hits.hit)
      }
    })
  })
}

export { officeSearch }
