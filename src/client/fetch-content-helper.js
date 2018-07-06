import axios from 'axios'
import types from './actions/types.js'
import queryString from 'querystring'

function formatRestContentResponse(type, id, data) {
  return {
    type: types.restContent,
    contentType: type,
    id,
    data: data,
    receivedAt: Date.now()
  }
}

async function fetchRestContent(type, id) {
  let data = null
  try {
    const response = await axios.get('/api/content/' + type + (id ? '/' + id : '') + '.json')
    data = response.data
  } catch (error) {
    console.error('fetchRestContent', error)
  }

  return data
}

function formatSiteContentResponse(prop, query, data) {
  return {
    type: types.siteContent,
    contentType: prop,
    query,
    data: data,
    receivedAt: Date.now()
  }
}

async function fetchSiteContent(prop, type, query) {
  const url = '/api/content/' + type + '.json' + (query ? '?' + queryString.stringify(query) : '')
  let data = null
  try {
    const response = await axios.get(url)
    data = response.data
  } catch (error) {
    console.error('fetchSiteContent', error)
  }

  return formatSiteContentResponse(prop, query, data)
}

export { fetchRestContent, fetchSiteContent, formatRestContentResponse, formatSiteContentResponse }
