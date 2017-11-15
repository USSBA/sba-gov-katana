import axios from 'axios'
import types from './types.js'

function receiveContent(type, id, data) {
  return {
    type: types.restContent,
    contentType: type,
    id,
    data: data,
    receivedAt: Date.now()
  }
}

function fetchContent(type, id) {
  return dispatch => {
    dispatch(receiveContent(type, id))
    return axios
      .get('/api/content/' + type + (id ? '/' + id : '') + '.json')
      .then(response => {
        return response.data
      })
      .then(data => {
        return dispatch(receiveContent(type, id, data))
      })
  }
}

function shouldFetchContent(state, type, id) {
  // Always use preexisting restContent if we have it; consider expiring data in the future
  try {
    if (state.restContent[type][id]) {
      return false
    }
  } catch (error) {
    /*Do nothing*/
  }
  return true
}

export function fetchContentIfNeeded(type, id) {
  return (dispatch, getState) => {
    if (type && id && shouldFetchContent(getState(), type, id)) {
      return dispatch(fetchContent(type, id))
    }
    return Promise.resolve()
  }
}
