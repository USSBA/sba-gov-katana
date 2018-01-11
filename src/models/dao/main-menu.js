import config from 'config'
import { getKey } from '../../util/s3-cache-reader.js'
import { get } from './daisho-client.js'

function fetchMainMenu(userId) {
  if (config.get('cache.useS3')) {
    return getKey('mainMenu')
  } else {
    return get('mainMenu')
  }
}

export { fetchMainMenu }
