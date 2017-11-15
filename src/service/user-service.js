import { get } from '../models/dao/daisho-client.js'

function isAdministrator(sessionId) {
  return get(sessionId + '/admin')
}

export { isAdministrator }
