import config from 'config'
import { getKey } from './s3-cache-reader.js'
import { get } from '../models/dao/daisho-client.js'

function fetchBlogsFromDrupal() {
  if (config.get('cache.useS3')) {
    return getKey('blogs')
  } else {
    return get('blogs')
  }
}

function fetchFrontPageSlidesFromDrupal() {
  if (config.get('cache.useS3')) {
    return getKey('frontPageSlides')
  } else {
    return get('frontPageSlides')
  }
}

export { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal }
