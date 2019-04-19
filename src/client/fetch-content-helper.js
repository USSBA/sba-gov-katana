import axios from 'axios'
import queryString from 'querystring'

async function fetchRestContent(type, id, langOverride) {
  let data = null

  try {
    const response = await axios.get(
      '/api/content/' + type + (id ? '/' + id : '') + '.json',
      langOverride && { headers: { 'accept-language': langOverride } }
    )
    data = response.data
  } catch (error) {
    console.error('fetchRestContent', error)
  }

  return data
}

async function fetchSiteContent(type, query) {
  const url = '/api/content/search/' + type + '.json' + (query ? '?' + queryString.stringify(query) : '')
  let data = null
  try {
    const response = await axios.get(url)
    data = response.data
  } catch (error) {
    console.error('fetchSiteContent', error)
  }
  return data
}

async function runMiscAction(prop, type, query) {
  const url = '/actions/misc/' + type + '.json' + (query ? '?' + queryString.stringify(query) : '')
  let data = null
  try {
    const response = await axios.get(url)
    data = response.data
  } catch (error) {
    console.error('fetchSiteContent', error)
  }
  return data
}

export { fetchRestContent, fetchSiteContent, runMiscAction }
