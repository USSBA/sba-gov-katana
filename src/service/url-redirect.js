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
    resolve(node)
  })
  return promise
}
export { findNodeIdByUrl, fetchNodeDataById }
