import config from 'config'
const aws = require('aws-sdk')
aws.config.update({ region: 'us-east-1' })

const dynamodb = new aws.DynamoDB({
  apiVersion: '2012-10-08',
  region: 'us-east-1'
})

function fetchNewUrlByOldUrl(oldUrl) {
  const params = mapUrlRedirectQueryParameters(oldUrl)
  return dynamodb
    .query(params)
    .promise()
    .then(result => {
      return getMostRecentUrlFromResults(result)
    })
}

function getMostRecentUrlFromResults(resultSet) {
  if (resultSet.Count < 1) {
    return null
  } else {
    let mostRecentItem
    for (const item of resultSet.Items) {
      const oldDate = new Date(mostRecentItem.LastModified.N)
      const newDate = new Date(item.LastModified.N)
      if (newDate > oldDate) {
        mostRecentItem = item
      }
    }
    return mostRecentItem.newUrl
  }
}

function mapUrlRedirectQueryParameters(oldUrl) {
  const tableName = config.get('features.drupalRedirect.tableName')
  var params = {
    TableName: tableName,
    ProjectionExpression: 'OldUrl, NewUrl, LastModified, LastModifiedBy',
    KeyConditionExpression: 'OldUrl = :oldUrl',
    ExpressionAttributeValues: {
      ':oldUrl': oldUrl
    }
  }
  return params
}

function addUrRedirectMapping(oldUrl, newUrl, lastModifiedInEpochMiliseconds, lastModifiedBy) {
  var params = mapUrlRedirectPutParameters(oldUrl, newUrl, lastModifiedInEpochMiliseconds, lastModifiedBy)
  return dynamodb.putItem(params).promise()
}

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

export {
  fetchNewUrlByOldUrl,
  mapUrlRedirectQueryParameters,
  addUrRedirectMapping,
  mapUrlRedirectPutParameters,
  getMostRecentUrlFromResults
}
