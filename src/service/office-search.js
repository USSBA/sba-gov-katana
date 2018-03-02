import config from 'config'
const aws = require('aws-sdk')
const csd = new aws.CloudSearchDomain({
  endpoint: config.get('aws.cloudsearch.office-endpoint'),
  region: 'us-east-1',
  apiVersions: '2013-01-01'
})
/* This is separate from search because it will need to have custom search to handle searching by specific indecies */
function officeSearch(req, res) {
  //todo: there will need to be logic to map out the query string to the correct cloudsearch params
  const { term, pageSize, start } = req
  const fixedTerm = term ? term.replace(/%20/g, ' ') : 'office'
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

        resolve(result.hits.hit)
      }
    })
    // const results = [
    //   {
    //     location: [
    //       {
    //         type: 'location',
    //         city: 'Columbia',
    //         email: 'mce@hceda.org',
    //         fax: null,
    //         hoursOfOperation: 'Monday through Friday from 9 a.m. to 5 p.m.',
    //         name: 'Maryland Center for Entrepreneurship',
    //         phoneNumber: '410-313-6550',
    //         state: 'MD',
    //         streetAddress: '9250 Bendix Road',
    //         zipCode: 21045
    //       }
    //     ],
    //     officeType: 'Startup accelerator',
    //     relatedDisaster: {},
    //     summary: {},
    //     website: null,
    //     type: 'office',
    //     title: 'Accelerator for the Commercialization of Technology (ACT)',
    //     id: 5667,
    //     updated: 1512767105,
    //     created: 1511914016
    //   }
    // ]

    // resolve(JSON.stringify(results))
  })
}

export { officeSearch }
