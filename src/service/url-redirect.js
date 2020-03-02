const config = require('config')
const aws = require('aws-sdk')
const dynamodb = new aws.DynamoDB({
  apiVersion: '2012-10-08',
  region: 'us-east-1'
})
const tableName = config.get('features.urlRedirect.tableName')
/* eslint-disable id-length */

function mapUrlQueryParameters(url) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: '#url = :url',
    ExpressionAttributeNames: {
      '#url': 'Url'
    },
    ExpressionAttributeValues: {
      ':url': { S: url }
    },
    ReturnConsumedCapacity: 'TOTAL'
  }
  return params
}

async function findNodeIdByUrl(url) {
  // if (url.startsWith('/event')) {
  //   const split = url.split('/')
  //   const eventId = split[2]
  //   return {
  //     nodeId: eventId,
  //     langCode: 'en',
  //     type: 'event'
  //   }
  // } else {
  const params = mapUrlQueryParameters(url)
  return dynamodb
    .query(params)
    .promise()
    .then(result => {
      let nodeId = null
      let langCode = null
      if (result.Count > 0) {
        const mostRecentItem = findMostRecentItem(result.Items)
        nodeId = mostRecentItem.NodeId.S
        langCode = mostRecentItem.LangCode ? mostRecentItem.LangCode.S : 'en-US'
      }
      return {
        nodeId,
        langCode
      }
    })
    .catch(error => {
      console.error('EXCEPTION: Unable to get redirect node id from DynamoDB', url)
      throw error
    })
  // }
}

function findMostRecentItem(itemList) {
  if (itemList.length < 1) {
    return null
  } else {
    let mostRecentItem = itemList[0]
    for (const item of itemList) {
      let newTime = item.Timestamp.S
      newTime = isNaN(parseInt(newTime, 10)) ? newTime : parseInt(newTime, 10)
      let oldTime = mostRecentItem.Timestamp.S
      oldTime = isNaN(parseInt(oldTime, 10)) ? oldTime : parseInt(oldTime, 10)

      const newTimeDate = new Date(newTime).getTime()
      const oldTimeDate = new Date(oldTime).getTime()
      if (newTimeDate > oldTimeDate) {
        mostRecentItem = item
      }
    }
    return mostRecentItem
  }
}

function findMatchingLangCodes(itemList, langCode) {
  if (itemList.length < 1) {
    return []
  } else {
    return itemList.filter(item => {
      if (langCode.startsWith('en')) {
        return !item.LangCode || item.LangCode.S.startsWith('en')
      } else {
        return item.LangCode && item.LangCode.S === langCode
      }
    })
  }
}

function mapNodeIdQueryParams(nodeId, langCode) {
  const params = {
    TableName: tableName,
    IndexName: 'NodeId-index',
    KeyConditionExpression: 'NodeId = :nodeId',
    ExpressionAttributeValues: {
      ':nodeId': { S: nodeId }
    },
    ReturnConsumedCapacity: 'TOTAL'
  }
  return params
}

function findMostRecentUrlRedirect(url) {
  return findNodeIdByUrl(url).then(({ nodeId, langCode }) => {
    if (nodeId && langCode) {
      return findMostRecentUrlByNodeId(nodeId, langCode)
    }
    return null
  })
}

function findMostRecentUrlByNodeId(nodeId, langCode) {
  const params = mapNodeIdQueryParams(nodeId, langCode)
  return dynamodb
    .query(params)
    .promise()
    .then(result => {
      let url = null
      if (result.Count > 0) {
        const makingLangCodes = findMatchingLangCodes(result.Items, langCode)
        const mostRecentItem = findMostRecentItem(makingLangCodes)
        url = mostRecentItem.Url.S
      }
      return url
    })
    .catch(error => {
      console.error('EXCEPTION: Unable to get redirect url from DynamoDB', nodeId, langCode)
      throw error
    })
}

function addUrlNodeMapping(nodeId, url, timestamp) {
  var params = mapUrlNodeParameters(nodeId, url, timestamp)
  return dynamodb.putItem(params).promise()
}

function mapUrlNodeParameters(nodeId, url, timestamp) {
  const params = {
    Item: {
      NodeId: {
        S: nodeId.toString()
      },
      Timestamp: {
        S: timestamp.toString()
      },
      Url: {
        S: url
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: tableName
  }
  return params
}
/* eslint-enable id-length */

module.exports.findNodeIdByUrl = findNodeIdByUrl
module.exports.findMostRecentUrlByNodeId = findMostRecentUrlByNodeId
module.exports.addUrlNodeMapping = addUrlNodeMapping
module.exports.mapUrlNodeParameters = mapUrlNodeParameters
module.exports.mapUrlQueryParameters = mapUrlQueryParameters
module.exports.mapNodeIdQueryParams = mapNodeIdQueryParams
module.exports.findMostRecentItem = findMostRecentItem
module.exports.findMostRecentUrlRedirect = findMostRecentUrlRedirect
