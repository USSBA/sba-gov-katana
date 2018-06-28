import axios from 'axios'
import types from './actions/types.js'
import queryString from 'querystring'

function formatContentByIdResponse(type, id, data) {
  return {
    type: types.restContent,
    contentType: type,
    id,
    data: data,
    receivedAt: Date.now()
  }
}

async function fetchContentById(type, id) {
  let data = null
  try {
    const response = await axios.get('/api/content/' + type + (id ? '/' + id : '') + '.json')
    data = response.data
  } catch (error) {
    console.error('fetchContentById', error)
  }

  return formatContentByIdResponse(type, id, data)
}

function formatContentByQueryResponse(prop, query, data) {
  return {
    type: types.siteContent,
    contentType: prop,
    query,
    data: data,
    receivedAt: Date.now()
  }
}

async function fetchContentByQuery(prop, type, query) {
  const url = '/api/content/' + type + '.json' + (query ? '?' + queryString.stringify(query) : '')
  let data = null
  try {
    const response = await axios.get(url)
    data = response.data
  } catch (error) {
    console.error('fetchContentByQuery', error)
  }

  return formatContentByQueryResponse(prop, query, data)
}

export { fetchContentById, fetchContentByQuery, formatContentByIdResponse, formatContentByQueryResponse }
