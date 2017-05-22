import _ from "lodash";

function findByUrl(haystack, needle) {
  if (!haystack) {
    return null;
  }
  const found = _.find(haystack, {
    url: needle
  });
  return found;
}

function findSection(menu, section) {
  return findByUrl(menu, section);
}


function findSubSection(menu, section, subsection) {
  if (!menu) {
    return null;
  }
  const sectionData = findSection(menu, section);
  return findByUrl(sectionData.children, subsection);
}

function findPage(menu, section, subsection, page) {
  if (!menu) {
    return null;
  }
  const subsectionData = findSubSection(menu, section, subsection);
  return findByUrl(subsectionData.children, page);
}

function findPageLineage(menu, section, subsection, page) {
  if (!menu) {
    return null;
  }
  const sectionData = findByUrl(menu, section);
  const subsectionData = findSubSection(menu, section, subsection);
  const pageData = findByUrl(subsectionData.children, page);
  return {
    pageData: pageData,
    subsectionData: subsectionData,
    sectionData: sectionData
  };
}


export { findPage, findSubSection, findSection, findPageLineage };
