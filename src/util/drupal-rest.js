import { get } from '../models/dao/daisho-client.js'

function fetchBlogsFromDrupal() {
  return get('blogs')
}

function fetchFrontPageSlidesFromDrupal() {
  return get('frontpageslides')
}

export { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal }
