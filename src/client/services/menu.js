import _ from 'lodash'

function findByUrl(haystack, needle) {
  if (!haystack) {
    return null
  }
  const found = _.find(haystack, {
    url: needle
  })
  return found
}

function findSection(menu, section) {
  return findByUrl(menu, section)
}

function findSubSection(menu, section, subsection) {
  if (!menu) {
    return null
  }
  const sectionData = findSection(menu, section)
  return findByUrl(sectionData.children, subsection)
}

function findPage(menu, section, subsection, page) {
  if (!menu) {
    return null
  }
  const subsectionData = findSubSection(menu, section, subsection)
  return findByUrl(subsectionData.children, page)
}

function findPageLineage(menu, urlFragments) {
  if (!menu) {
    return null
  }
  const first = urlFragments[0]
  const rest = _.tail(urlFragments)
  const child = findByUrl(menu, first)
  let descendants = null
  if (child && child.children) {
    descendants = findPageLineage(child.children, rest)
  }
  const result = _.compact([child].concat(descendants))
  return result
}

export { findPage, findSubSection, findSection, findPageLineage }
