import axios from 'axios'
import path from 'path'
import queryString from 'querystring'

async function fetchRestContent(id, langOverride) {
  let data = null

  try {
    const response = await axios.get(
      '/api/content' + (id ? '/' + id : '') + '.json',
      langOverride && { headers: { 'accept-language': langOverride } }
    )

    if (langOverride === 'es') {
      data = response.data.spanishTranslation
    } else {
      data = response.data
    }
  } catch (error) {
    console.error('fetchRestContent', error)
  }

  return data
}

async function fetchApiDistrictOffice(zipcode, onError) {
  let data = null
  try {
    const response = await axios.get(`/actions/misc/search/district-office?zipcode=${zipcode}`)

    data = response.data
  } catch (error) {
    console.error('fetchDistrictOffice', error)
    onError && onError()
  }
  return data
}

async function fetchApiSbaGovContent(fileDirectory) {
  let data = null

  try {
    const response = await axios.get(`https://api.sba.gov/${fileDirectory}`)

    data = JSON.parse(response.data)
  } catch (error) {
    console.error('fetchApiSbaGovContent', error)
  }

  return data
}

async function fetchEventContent(id, langOverride) {
  let data = null

  try {
    const response = await axios.get(
      '/api/content/search/event' + (id ? '/' + id : '') + '.json',
      langOverride && { headers: { 'accept-language': langOverride } }
    )
    data = response.data
  } catch (error) {
    console.error('fetchEventContent', error)
  }

  return data
}

async function fetchSiteContent(type, query, langOverride) {
  let data = null

  try {
    const response = await axios.get(
      '/api/content/search/' + type + '.json' + (query ? '?' + queryString.stringify(query) : ''),
      langOverride && { headers: { 'accept-language': langOverride } }
    )
    data = response.data
  } catch (error) {
    console.error('fetchSiteContent', error)
  }
  return data
}

async function postMiscAction(endpoint, body) {
  const url = path.join('/actions/misc', `${endpoint}`)

  let data = null

  try {
    const response = await axios.post(url, body)
    data = response.data
  } catch (error) {
    console.error('postMiscAction', error)
    throw error
  }

  return data
}

async function runMiscAction(type, query) {
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

export {
  fetchApiDistrictOffice,
  fetchApiSbaGovContent,
  fetchRestContent,
  fetchEventContent,
  fetchSiteContent,
  postMiscAction,
  runMiscAction
}
