import { findNodeIdByUrl, fetchNodeDataById } from '../service/url-redirect.js'
import _ from 'lodash'
import HttpStatus from 'http-status-codes'

function handleUrlRedirect(req, res) {
  const url = req.query.url

  if (url) {
    const { nodeId, langCode } = findNodeIdByUrl(url)
    if (!nodeId) {
      res.status(HttpStatus.NOT_FOUND).send('Url not found in redirect table')
    } else {
      fetchNodeDataById(nodeId).then(data => {
        res.status(HttpStatus.OK).send(data)
      })
    }
  } else {
    res.status(HttpStatus.NOT_FOUND)
  }
}

export { handleUrlRedirect }
