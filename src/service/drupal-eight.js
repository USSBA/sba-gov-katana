import _ from "lodash";
import Promise from "bluebird";
import url from "url";
import cache from "memory-cache";

const fieldPrefix = "field_";
const nodeEndpoint = "node";
const taxonomyEndpoint = "/taxonomy/term";
const paragraphEndpoint = "entity/paragraph";
const contactEndpoint = "contacts";


import { fetchById, fetchContentByType } from "../models/dao/drupal8-rest.js";

import { sanitizeTextSectionHtml } from "../util/formatter.js";

// a few helper functions to extract data from the drupal wrappers
function extractValue(object, key) {
  if (object && object.length > 0) {
    if (object[0].value) {
      return object[0].value;
    }
  }
  return null;
}

function extractValuePromise(value, key) {
  return Promise.resolve(extractValue(value, key));
}

function extractTargetId(object) {
  return object && object.length > 0 ? object[0].target_id : null;
}

function fetchNodeById(nodeId) {
  return fetchById(nodeEndpoint, nodeId);
}

function fetchTaxonomyTermById(taxonomyTermId) {
  return fetchById(taxonomyEndpoint, taxonomyTermId);
}

function fetchParagraphId(paragraphId) {
  return fetchById(paragraphEndpoint, paragraphId);
}

function fetchFormattedContactParagraph(paragraphArg) {
  return fetchParagraphId(paragraphArg.paragraphId).then(formatContactParagraph).then(function(response) { //eslint-disable-line no-use-before-define
    response.title = paragraphArg.title; //eslint-disable-line no-param-reassign
    return response;
  });
}

function formatContact(contact) {
  const contactArg = {
    title: !_.isEmpty(contact.title) ? contact.title[0].value : "",
    paragraphId: extractTargetId(contact.field_type_of_contact)
  };
  return fetchFormattedContactParagraph(contactArg);
}

function formatContacts(data) {
  if (data) {
    if (cache.get("contacts")) {
      return Promise.resolve(cache.get("contacts"));
    }
    return Promise.map(data, formatContact, {
      concurrency: 50
    }).tap(function(contacts) {
      cache.put("contacts", contacts);
    });

  }
  return Promise.resolve(null);
}

function fetchContacts() {
  return fetchContentByType(contactEndpoint).then(formatContacts);
}

// this is an abstract function that takes an object, removes properties that do not
// start with the given prefix and then formats the key name using the prefix and
// given custom formatter, and then formats the values to the root value (not the
// drupal 8 wrapper).  Note customerValueFormatter must return a promise
function extractFieldsByFieldNamePrefix(object, prefix, customFieldNameFormatter, customValueFormatter) {
  const withFixedKeys = _.chain(object)
    //picks every object inside node that starts with field_
    .pickBy(function(value, key) {
      return _.startsWith(key, prefix);
    })
    //maps picked objects. example = field_subsection_header_text : {value}
    .mapKeys(function(value, key) {
      const customFormatter = customFieldNameFormatter || _.identity;
      return _.chain(customFormatter(key)).replace(prefix, "").camelCase()
        .value();
    })
    .value();

  const withValuesAsPromises = _.mapValues(withFixedKeys, customValueFormatter);
  const retVal = Promise.props(withValuesAsPromises);
  return retVal;
}

function formatTaxonomyTerm(data) {
  if (data) {
    const name = extractValue(data.name);
    const vocabulary = extractTargetId(data.vid);
    return extractFieldsByFieldNamePrefix(data, fieldPrefix, null, extractValuePromise)
      .then((object) => {
        return _.assign({
          name: name,
          vocabulary: _.camelCase(vocabulary)
        }, object);
      });
  }
  return {};

}

function fetchFormattedTaxonomyTerm(taxonomyTermId) {
  return fetchTaxonomyTermById(taxonomyTermId).then(formatTaxonomyTerm);
}

function makeParagraphValueFormatter(typeName) {
  return function(value, key) {
    let newValuePromise;
    if (typeName === "text_section" && key === "text") {
      newValuePromise = Promise.resolve(sanitizeTextSectionHtml(extractValue(value)));
    } else if (key === "image") {
      let imageUrl = url.parse(value[0].url);
      const host = "http://content.sbagov.fearlesstesters.com";
      imageUrl = host + imageUrl.pathname;
      newValuePromise = Promise.resolve({
        url: imageUrl
      });
    } else if (typeName === "lookup" && key === "contactCategory") {
      const taxonomyTermId = extractTargetId(value);
      newValuePromise = fetchFormattedTaxonomyTerm(taxonomyTermId).then((result) => {
        return result.name;
      });
    } else {
      newValuePromise = Promise.resolve(extractValue(value));
    }
    return newValuePromise;
  };
}


function formatParagraph(paragraph) {
  if (paragraph) {
    const typeName = extractTargetId(paragraph.type);
    return extractFieldsByFieldNamePrefix(paragraph, fieldPrefix, function(fieldName) {
      if (typeName === "image") {
        return fieldName;
      }
      return _.replace(fieldName, typeName, "");
    }, makeParagraphValueFormatter(typeName))
      .then((object) => {
        return _.assign({
          type: _.camelCase(typeName)
        }, object);
      });
  }
  return Promise.resolve(null);

}


function formatContactParagraph(paragraph) { //eslint-disable-line complexity
  if (paragraph) {
    const contactCategoryTaxonomyId = extractTargetId(paragraph.field_bg_contact_category);
    const stateServedTaxonomyTermId = extractTargetId(paragraph.field_state_served);
    const contactCity = !_.isEmpty(paragraph.field_city) ? paragraph.field_city[0].value : "";
    const contactLink = !_.isEmpty(paragraph.field_link) ? paragraph.field_link[0].uri : "";
    const contactState = !_.isEmpty(paragraph.field_state) ? paragraph.field_state[0].value : "";
    const contactStreetAddress = !_.isEmpty(paragraph.field_street_address) ? paragraph.field_street_address[0].value : "";
    const contactZipCode = !_.isEmpty(paragraph.field_zip_code) ? paragraph.field_zip_code[0].value : "";
    const contactCategoryTaxonomyPromise = contactCategoryTaxonomyId ? fetchFormattedTaxonomyTerm(contactCategoryTaxonomyId) : Promise.resolve(null);
    const stateServedTaxonomyPromise = stateServedTaxonomyTermId ? fetchFormattedTaxonomyTerm(stateServedTaxonomyTermId) : Promise.resolve(null);
    return Promise.all([contactCategoryTaxonomyPromise, stateServedTaxonomyPromise]).spread((contactCategoryTaxonomyData, stateServedTaxonomyData) => {
      return {
        city: contactCity,
        link: contactLink,
        state: contactState,
        streetAddress: contactStreetAddress,
        zipCode: contactZipCode,
        categoryTaxonomyTerm: contactCategoryTaxonomyData,
        stateServedTaxonomyTerm: stateServedTaxonomyData
      };
    });
  }
  return Promise.resolve(null);
}


function fetchFormattedParagraph(paragraphId) {
  return fetchParagraphId(paragraphId).then(formatParagraph);
}





function formatNode(data) {
  if (data) {
    const paragraphs = data.field_paragraphs || [];
    const taxonomy = data.field_site_location;
    const title = extractValue(data.title);
    const summary = extractValue(data.field_summary);

    const paragraphIds = _.map(paragraphs, "target_id");
    const paragraphDataPromises = Promise.map(paragraphIds, fetchFormattedParagraph);

    const taxonomyPromise = taxonomy ? fetchFormattedTaxonomyTerm(extractTargetId(taxonomy)) : Promise.resolve(null);
    return Promise.all([paragraphDataPromises, taxonomyPromise]).spread((paragraphData, taxonomyData) => {
      return {
        title: title,
        paragraphs: _.compact(paragraphData),
        taxonomy: taxonomyData,
        summary: summary
      };
    });
  }
  return {};

}

function fetchFormattedNode(nodeId) {
  return fetchNodeById(nodeId).then(formatNode);
}

export { fetchFormattedNode, fetchFormattedTaxonomyTerm, nodeEndpoint, taxonomyEndpoint, paragraphEndpoint, fetchContacts };
