import config from 'config'
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

function findNodeIdByUrl(url) {
  const params = mapUrlQueryParameters(url)
  return dynamodb
    .query(params)
    .promise()
    .then(result => {
      let nodeId = null
      if (result.Count > 0) {
        const mostRecentItem = findMostRecentItem(result.Items)
        nodeId = mostRecentItem.NodeId.S
      }
      return nodeId
    })
    .catch(error => {
      console.error('EXCEPTION: Unable to get redirect node id from DynamoDB')
      throw error
    })
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

function mapNodeIdQueryParams(nodeId) {
  const params = {
    TableName: tableName,
    IndexName: 'NodeId-Timestamp-index',
    KeyConditionExpression: 'NodeId = :nodeId',
    ExpressionAttributeValues: {
      ':nodeId': { S: nodeId }
    },
    ReturnConsumedCapacity: 'TOTAL'
  }
  return params
}

function findMostRecentUrlRedirect(url) {
  console.log('searching for url ' + url)
  return findNodeIdByUrl(url).then(nodeId => {
    if (nodeId) {
      console.log('found nodeId ' + nodeId)
      return findMostRecentUrlByNodeId(nodeId)
    }
    return null
  })
}

function findMostRecentUrlByNodeId(nodeId) {
  const params = mapNodeIdQueryParams(nodeId)
  return dynamodb
    .query(params)
    .promise()
    .then(result => {
      let url = null
      if (result.Count > 0) {
        const mostRecentItem = findMostRecentItem(result.Items)
        url = mostRecentItem.Url.S
      }
      console.log('found url ' + url)
      return url
    })
    .catch(error => {
      console.error('EXCEPTION: Unable to get redirect url from DynamoDB')
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

export {
  findNodeIdByUrl,
  findMostRecentUrlByNodeId,
  addUrlNodeMapping,
  mapUrlNodeParameters,
  mapUrlQueryParameters,
  mapNodeIdQueryParams,
  findMostRecentItem,
  findMostRecentUrlRedirect
}
