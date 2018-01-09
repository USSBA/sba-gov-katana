import config from 'config'
const aws = require('aws-sdk')
aws.config.update({ region: 'us-east-1' })

function findNodeIdByUrl(url) {
  let nodeId = null
  // TODO: logic to find nodeId by the url
  nodeId = 1 //dummy value
  return nodeId
}

function fetchNodeDataById(nodeId) {
  // TODO: logic to fetch node data by id
  const node = {
    //dummy value
    data: 'my dummy data'
  }
  // TODO: remove the manual promise creation have this return the get promise instead
  const promise = new Promise((resolve, reject) => {
    if (nodeId) {
      resolve(node)
    } else {
      reject('invalid node id')
    }
  })
  return promise
}

function addUrlNodeMapping(nodeId, url, timestamp) {
  var params = mapUrlNodeParameters(nodeId, url, timestamp)
  const dynamodb = new aws.DynamoDB({
    apiVersion: '2012-10-08',
    region: 'us-east-1'
  })
  return dynamodb.putItem(params).promise()
}

function mapUrlNodeParameters(nodeId, url, timestamp) {
  const tableName = config.get('features.urlRedirect.tableName')
  const sortKey = nodeId + '#' + timestamp
  /* eslint-disable id-length */
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
      },
      SortKey: {
        S: sortKey
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: tableName
  }
  /* eslint-enable id-length */
  return params
}

export { findNodeIdByUrl, fetchNodeDataById, addUrlNodeMapping, mapUrlNodeParameters }
