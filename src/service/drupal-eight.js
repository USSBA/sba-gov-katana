import _ from "lodash";
import Promise from "bluebird";

const fieldPrefix = "field_";

import { fetchById } from "../models/dao/drupal8-rest.js";

// a few helper functions to extract data from the drupal wrappers
function extractValue(object) {
  return object && object.length > 0 ? object[0].value : null;
}

function extractTargetId(object) {
  return object && object.length > 0 ? object[0].target_id : null;
}

function fetchNodeById(nodeId) {
  return fetchById("node", nodeId);
}

function fetchTaxonomyTermById(taxonomyTermId) {
  return fetchById("/taxonomy/term", taxonomyTermId);
}

function fetchParagraphId(paragraphId) {
  return fetchById("entity/paragraph", paragraphId);
}


// this is an abstract function that takes an object, removes properties that do not
// start with the given prefix and then formats the key name using the prefix and
// given custom formatter, and then formats the values to the root value (not the
// drupal 8 wrapper)
function extractFieldsByFieldNamePrefix(object, prefix, customFieldNameFormatter) {
  return _.chain(object)
    .pickBy(function(vvalue, key) {
      return _.startsWith(key, prefix);
    })
    .mapKeys(function(value, key) {
      const customFormatter = customFieldNameFormatter || _.identity;
      return _.chain(customFormatter(key)).replace(prefix, "").camelCase()
        .value();
    })
    .mapValues(extractValue)
    .value();
}



function formatParagraph(paragraph) {
  const typeName = extractTargetId(paragraph.type);
  const formattedParagraph = extractFieldsByFieldNamePrefix(paragraph, fieldPrefix, function(fieldName) {
    return _.replace(fieldName, typeName, "");
  });
  return _.chain(formattedParagraph)
    .merge({
      type: _.camelCase(typeName)
    })
    .value();
}

function formatTaxonomyTerm(data) {
  const name = extractValue(data.name);
  const vocabulary = extractTargetId(data.vid);
  const fields = extractFieldsByFieldNamePrefix(data, fieldPrefix);
  return _.merge(fields, {
    name: name,
    vocabulary: _.camelCase(vocabulary)
  });
}

function fetchFormattedParagraph(paragraphId) {
  return fetchParagraphId(paragraphId).then(formatParagraph);
}



function fetchFormattedTaxonomyTerm(taxonomyTermId) {
  return fetchTaxonomyTermById(taxonomyTermId).then(formatTaxonomyTerm);
}

function formatNode(data) {
  const paragraphs = data.field_paragraphs || [];
  const taxonomy = data.field_site_location;
  const title = extractValue(data.title);

  const paragraphIds = _.map(paragraphs, "target_id");
  const paragraphDataPromises = Promise.map(paragraphIds, fetchFormattedParagraph);

  const taxonomyPromise = taxonomy ? fetchFormattedTaxonomyTerm(extractTargetId(taxonomy)) : Promise.resolve(null);

  return Promise.all([paragraphDataPromises, taxonomyPromise]).spread((paragraphData, taxonomyData) => {
    return {
      title: title,
      paragraphs: paragraphData,
      taxonomy: taxonomyData
    };
  });
}

function fetchFormattedNode(nodeId) {
  return fetchNodeById(nodeId).then(formatNode);
}

export { fetchFormattedNode, fetchFormattedTaxonomyTerm };
