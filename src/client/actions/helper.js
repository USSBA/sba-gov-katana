import axios from 'axios'
import types from './types.js'

function fetchContent(type, id) {
  return axios.get('/api/content/' + type + (id ? '/' + id : '') + '.json').then(response => {
    return response.data
  })
}

export { fetchContent }
