const { findNodeIdByUrl, fetchNodeDataById } = require('../service/url-redirect.js')
const httpStatus = require('http-status-codes')

function handleUrlRedirect(req, res) {
  const url = req.query.url

  if (url) {
    const { nodeId, langCode } = findNodeIdByUrl(url)
    if (!nodeId) {
      res.status(httpStatus.NOT_FOUND).send('Url not found in redirect table')
    } else {
      fetchNodeDataById(nodeId).then(data => {
        res.status(httpStatus.OK).send(data)
      })
    }
  } else {
    res.status(httpStatus.NOT_FOUND)
  }
}

module.exports.handleUrlRedirect = handleUrlRedirect
