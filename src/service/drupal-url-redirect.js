const config = require('config')
// const aws = require('aws-sdk')
const { DynamoDB } = require('@aws-sdk/client-dynamodb')

const dynamodb = new DynamoDB({
  apiVersion: '2012-10-08',
  region: 'us-east-1'
})

function fetchNewUrlByOldUrl(oldUrl) {
  const params = mapUrlRedirectQueryParameters(oldUrl)
  return (
    dynamodb
      .getItem(params)
      // .promise()
      .then(response => {
        const url = response.Item ? response.Item.NewUrl.S : null
        return url
      })
  )
}

/*eslint-disable id-length*/
function mapUrlRedirectQueryParameters(oldUrl) {
  const tableName = config.get('features.drupalRedirect.tableName')
  var params = {
    TableName: tableName,
    ProjectionExpression: 'OldUrl, NewUrl, LastModified, LastModifiedBy',
    Key: {
      OldUrl: {
        S: oldUrl
      }
    }
  }
  return params
}
/*eslint-enable id-length */

function mapUrlRedirectPutParameters(oldUrl, newUrl, lastModifiedInEpochMiliseconds, lastModifiedBy) {
  const tableName = config.get('features.drupalRedirect.tableName')
  /* eslint-disable id-length */
  const params = {
    Item: {
      OldUrl: {
        S: oldUrl
      },
      NewUrl: {
        S: newUrl
      },
      LastModified: {
        N: lastModifiedInEpochMiliseconds
      },
      LastModifiedBy: {
        S: lastModifiedBy
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: tableName
  }
  /* eslint-enable id-length */
  return params
}

module.exports.fetchNewUrlByOldUrl = fetchNewUrlByOldUrl
module.exports.mapUrlRedirectQueryParameters = mapUrlRedirectQueryParameters
module.exports.mapUrlRedirectPutParameters = mapUrlRedirectPutParameters
