import config from 'config'
const aws = require('aws-sdk')
const csd = new aws.CloudSearchDomain({
  endpoint: config.get('aws.cloudsearch.endpoint'),
  region: 'us-east-1',
  apiVersions: '2013-01-01'
})

function search(req, res) {
  const { term, pageSize, start } = req

  const fixedTerm = term.replace(/%20/g, ' ')

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
    size: pageSize,
    //sort: 'STRING_VALUE',
    start: start
  }

  return new Promise((resolve, reject) => {
    csd.search(params, function(err, data) {
      if (err) {
        // an error occurred

        console.log(err, err.stack)

        reject(err)
      } else {
        // successful response

        console.log(data)

        const result = data

        if (result.hits.hit.length === 0) {
          result.hasNoResults = true
        }

        resolve(JSON.stringify(data))
      }
    })
  })
}

export { search }
