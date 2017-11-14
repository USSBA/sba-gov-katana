import querystring from 'querystring'

function getQueryParams() {
  let queryParams = {}
  const { search } = window.location
  if (search && search !== '') {
    queryParams = querystring.decode(search.replace('?', ''))
  }
  return queryParams
}

export { getQueryParams }
