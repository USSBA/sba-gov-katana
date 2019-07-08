/* eslint-disable */
const { isEmpty } = require('lodash')

function findByUrl(haystack, needle, langCode) {
  if (isEmpty(haystack)) {
    return null
  }

  const found = haystack.find(item => {
    if (langCode === 'es' && item.spanishTranslation && item.spanishTranslation.url === needle) {
      return item.spanishTranslation.url === needle
    } else {
      return item.url === needle
    }
  })
  return found
}

function findSection(menu, section, langCode) {
  return findByUrl(menu, section, langCode)
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
  const [first, ...rest] = urlFragments
  const child = findByUrl(menu, first)
  let descendants = null
  if (child && child.children) {
    descendants = findPageLineage(child.children, rest)
  }
  const result = [child].concat(descendants).filter(item => !!item)
  return result
}

function finder(items, key, value) {
  const id = key
  const val = value
  let foundValue
  let lastChild

  // Search surface level of items
  for (const item of items) {
    if (item[id] === val) {
      foundValue = item
      break
    }
  }

  // If no match was found, then try searching within nested items
  if (typeof foundValue === 'undefined') {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        lastChild = item
        foundValue = finder(item.children, id, val)
        if (foundValue) {
          break
        }
      }
    }
  }

  return foundValue ? [lastChild].concat(foundValue).filter(x => !!x) : null
}

function findPageLineageByNodeId(menu, nodeId) {
  return finder(menu, 'node', nodeId)
}

export { findPage, findPageLineage, findPageLineageByNodeId, findSection, findSubSection }

/* eslint-enable */
