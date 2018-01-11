import config from 'config'
import { getKey } from '../../util/s3-cache-reader.js'
import { get } from './daisho-client.js'

function fetchDisasterFromDrupalDatabase() {
  if (config.get('cache.useS3')) {
    return getKey('disaster')
  } else {
    return get('disaster')
  }
}

export { fetchDisasterFromDrupalDatabase }
