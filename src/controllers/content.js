import path from 'path'
import config from 'config'
import axios from 'axios'
import HttpStatus from 'http-status-codes'

function fetchContentById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    const type = req.params.type
    const id = req.params.id
    const userPreferredLanguage = req.headers['accept-language']
    const uri =
      'https://' + path.join(config.get('content.endpoint'), 'Prod', 'api', 'content', type, id + '.json')
    axios
      .get(uri, {
        headers: { 'Accept-Language': userPreferredLanguage },
        params: req.query,
        responseType: 'json',
        // eslint-disable-next-line arrow-body-style
        transformResponse: rawReq => rawReq
      })
      .then(result => {
        res
          .set('Content-Type', 'application/json')
          .status(result.status)
          .send(result.data)
      })
      .catch(err => {
        console.error(err)
        res.status(err.response.status).send(err.response.data)
      })
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Incorrect request format missing type or id')
  }
}

function fetchContentByType(req, res) {
  if (req.params && req.params.type) {
    const type = req.params.type
    const uri =
      'https://' + path.join(config.get('content.endpoint'), 'Prod', 'api', 'content', type + '.json')
    axios
      .get(uri, {
        params: req.query,
        responseType: 'json',
        // eslint-disable-next-line arrow-body-style
        transformResponse: rawReq => rawReq
      })
      .then(result => {
        res
          .set('Content-Type', 'application/json')
          .status(result.status)
          .send(result.data)
      })
      .catch(err => {
        console.error(err)
        res.status(err.response.status).send(err.response.data)
      })
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Incorrect request format missing type.')
  }
}

export { fetchContentById, fetchContentByType }
