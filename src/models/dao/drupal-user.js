import config from 'config'
import { get } from './daisho-client.js'

function fetchDrupalUserEmail(userId) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve('test@test.com')
  } else {
    return get(userId + '/email')
  }
}

export { fetchDrupalUserEmail }
