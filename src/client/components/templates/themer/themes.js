import _ from 'lodash'

const themes = {
  'sba-blue': ['styleguide', 'learning-center'],
  byzantine: ['guide', 'business-guide'],
  'money-green': [
    'lendermatch',
    'funding-programs',
    'document',
    'article',
    'partners',
    'disaster-assistance'
  ],
  'cobalt-blue': ['size-standards', 'federal-contracting'],
  'sba-blue-dark': ['/']
}

function getPaths() {
  return _.chain(themes)
    .values()
    .flatten()
    .value()
}

function getTheme() {
  const theme = 'sba-blue'

  const { pathname } = window.location
  let path

  if (pathname[0] === '/' && !pathname[1]) {
    path = pathname.slice(0, 1)
  } else if (pathname.startsWith('/tools')) {
    path = pathname.slice(1)
  } else {
    path = window.location.pathname.split('/')[1]
  }

  return _.findKey(themes, function(object) {
    return _.includes(object, path)
  })
}

export { getTheme, getPaths }
export default themes