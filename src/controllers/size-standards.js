import HttpStatus from 'http-status-codes'
import { get } from '../models/dao/size-standards-client.js'

function responseWithResultAsJson(res) {
  return data => {
    return res.status(HttpStatus.OK).json(data)
  }
}

function getNaics(req, res) {
  get('naics', req.query).then(responseWithResultAsJson(res))
}

function getNaicsById(req, res, next) {
  if (req.params && req.params.id) {
    get('naics/' + req.params.id)
      .then(responseWithResultAsJson(res))
      .catch(next)
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Missing user id.')
  }
}

function getNaicsPropertyById(req, res, next) {
  if (req.params && req.params.id && req.params.property) {
    get('naics/' + req.params.id + '/' + req.params.property)
      .then(responseWithResultAsJson(res))
      .catch(next)
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Missing user id or property.')
  }
}

function determineIfSmallBusiness(req, res, next) {
  if (req.query && req.query.id) {
    get('isSmallBusiness/', req.query)
      .then(responseWithResultAsJson(res))
      .catch(next)
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Missing query param id)')
  }
}

export { getNaics, getNaicsById, getNaicsPropertyById, determineIfSmallBusiness }
