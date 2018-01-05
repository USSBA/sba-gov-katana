import config from 'config'
import { get } from './daisho-client.js'

function fetchUserRoles(userId) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve(['Administrator'])
  } else {
    return get(userId + '/roles')
  }
}

export { fetchUserRoles }
