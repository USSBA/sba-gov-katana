require('dotenv').config()

const aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

aws.config.update({ region: 'us-east-1' })
aws.config.apiVersions = { cloudsearchdomain: '2013-01-01' }

const csd = new aws.CloudSearchDomain({
  endpoint: 'search-testing1-5vjiwj6xij2n5ww6wnwtozyrwa.us-east-1.cloudsearch.amazonaws.com'
})

function search(req, res) {
  const { term, pageSize, pageNumber } = req

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
    size: pageSize,
    //sort: 'STRING_VALUE',
    start: pageNumber
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

  // query search results

  /*let result = [
    {
      hits: {
        found: 0,
        hit: []
      }
    }
  ]*/

  /*
  if (decodeURIComponent(req.term) !== 'no new taxes') {
    result = [
      {
        status: {
          rid: 'rd+5+r0oMAo6swY=',
          'time-ms': 9
        },
        hits: {
          found: 3,
          start: 0,
          hit: [
            {
              id: 'tt1951265',
              fields: {
                title: 'The Hunger Games: Mockingjay - Part 1',
                description:
                  'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
                url: 'https://sba.gov/lorem-ipsum/'
              }
            },
            {
              id: 'tt1951264',
              fields: {
                title: 'The Hunger Games: Catching Fire',
                description:
                  'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
                url: 'https://sba.gov/lorem-ipsum/'
              }
            },
            {
              id: 'tt1392170',
              fields: {
                title: 'The Hunger Games',
                description:
                  'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
                url: 'https://sba.gov/lorem-ipsum/'
              }
            }
          ]
        }
      }
    ]
  }
  */

  /* if (result[0].hits.hit.length === 0) {
    result[0].hasNoResults = true
  }

  return Promise.resolve(JSON.stringify(result))
  */
}

export { search }
