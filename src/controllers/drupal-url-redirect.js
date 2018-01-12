import { fetchNewUrlByOldUrl } from '../service/drupal-url-redirect.js'
import _ from 'lodash'
import HttpStatus from 'http-status-codes'

function redirectIfFound(req, res) {
  const url = req.url
  fetchNewUrlByOldUrl(url).then(newUrl => {
    if (newUrl) {
      res.status(HttpStatus.MOVED_TEMPORARILY).location(newUrl)
    }
  })
}

export { redirectIfFound }
