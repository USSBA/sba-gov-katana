/*eslint-disable max-lines*/
import _ from "lodash";
import Promise from "bluebird";
import url from "url";
import config from "config";

import path from "path";
import localContacts from "../models/dao/sample-data/contacts.js";
import sbicContacts from "../models/dao/sample-data/sbic-contacts.js";
import suretyContacts from "../models/dao/sample-data/surety-contacts.js";
import documents from "../models/dao/sample-data/documents.js";
const localDataMap = {
  "State registration": localContacts,
  "SBIC": sbicContacts,
  "Surety bond agency": suretyContacts
};



const fieldPrefix = "field_";
const nodeEndpoint = "node";
const taxonomyEndpoint = "/taxonomy/term";
const taxonomysEndpoint = "taxonomys";
const paragraphEndpoint = "entity/paragraph";
const contactEndpoint = "contacts";
const documentEndpoint = "documents";
const menuTreeEndpoint = "/entity/menu/:name/tree";


import { fetchById, fetchContent } from "../models/dao/drupal8-rest.js";

import { sanitizeTextSectionHtml, formatUrl } from "../util/formatter.js";

// a few helper functions to extract data from the drupal wrappers
function extractProperty(object, key) {
  if (object && object.length > 0 && key !== null && object[0][key]) {
    return object[0][key];
  }
  return null;
}

function extractProperties(object, key) {
  return _.map(object, (item) => {
    return extractProperty([item], key);
  });
}

function extractPropertyPromise(object, key) {
  return Promise.resolve(extractProperty(object, key));
}

function extractValue(object, key) {
  return extractProperty(object, "value");
}

function extractConvertedUrl(object, key = "url") {
  return convertUrlHost(extractProperty(object, key));
}

function extractValuePromise(value, key) {
  return Promise.resolve(extractValue(value, key));
}

function extractTargetId(object) {
  return extractProperty(object, "target_id");
}

function extractTargetIds(object) {
  return extractProperties(object, "target_id");
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

function fetchMenuTreeByName(name) {
  return fetchContent(menuTreeEndpoint.replace(":name", name));
}

function fetchTaxonomys() {
  return fetchContent(taxonomysEndpoint)
    .then(formatTaxonomys);
}

function convertUrlHost(urlStr) {
  const host = _.trimEnd(config.get("drupal8.contentUrl"), "/");
  const parsedUrl = url.parse(urlStr);
  //Only modify URL if it points to localhost or tanto
  if (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "tanto") {
    return `${host}${parsedUrl.pathname}`;
  } else if (urlStr.startsWith("internal:")) {
    return urlStr.replace(/^internal:/, "");
  }
  return urlStr;
}


//contacts content type
function fetchDocuments(queryParams) {
  console.log(queryParams)
  if (config.get("drupal8.useLocalContacts")) {
    console.log("Using Development Documents information");
    return Promise.resolve(documents);
  }

  return fetchContent(documentEndpoint)
    .then((data) => {
      if (data) {
        return Promise.map(data, formatNode, {
          concurrency: 50
        });
      } else {
        return Promise.resolve([]);
      }
    }).then((data) => {
      console.log("result")
      return filterAndSortDocuments(queryParams, data)
    })
}

function filterAndSortDocuments(queryParams, documents) {
  let filteredDocuments = filterDocuments(queryParams, documents);
  let sortedDocuments = sortDocuments(queryParams, filteredDocuments);

  let start = parseInt(queryParams.start);
  let end = parseInt(queryParams.end);
  return !start && !end
    ? sortedDocuments
    : sortedDocuments.slice(queryParams.start, queryParams.end);
}

function filterDocuments(queryParams, documents) {
  return documents.filter(doc => {
    return (
      (queryParams.type === "All" || doc.documentIdType === queryParams.type) &&
      (queryParams.program === "All" || doc.programs.includes(queryParams.program)) &&
      (queryParams.activity === "All" || doc.activitys.includes(queryParams.activity)) &&
      (queryParams.search === "" ||
        doc.title.toLowerCase().includes(queryParams.search.toLowerCase()) ||
        doc.documentIdNumber.includes(queryParams.search))
    );
  });
}

function sortDocuments(queryParams, documents) {
  let sortOrder;
  if (queryParams.sortBy === "Title") {
    sortOrder = ["title"];
  } else if (queryParams.sortBy === "Number") {
    sortOrder = ["documentIdNumber"];
  } else {
    return documents;
  }
  return _.orderBy(documents, [doc => doc[sortOrder].toLowerCase()]);
}

//contacts content type
function fetchContacts(queryParams) {
  const category = queryParams.category;
  if (config.get("drupal8.useLocalContacts")) {
    console.log("Using Development Contacts information");
    return Promise.resolve(localDataMap[category] || []);
  }

  return fetchContent(contactEndpoint)
    .then(formatContacts)
    .then((results) => {
      return _.filter(results, {
        category: category
      });
    });
}

function formatContacts(data) {
  if (data) {
    return Promise.map(data, formatContact, {
      concurrency: 50
    });
  }
  return Promise.resolve([]);
}

function formatTaxonomys(data) {
  if (data) {
    return Promise.map(data, formatTaxonomyTerm, {
      concurrency: 50
    }).then((result) => {
      /* eslint-disable no-param-reassign */
      // TODO removes this eslint-disable
      return _.reduce(result, (reducedResult, value) => {
        ((reducedResult[value.vocabulary]) ||
        (reducedResult[value.vocabulary] = {
          name: value.vocabulary,
          terms: []
        })
          ).terms.push(value.name);
        return reducedResult;
      }, {});
      /* eslint-enable no-param-reassign */

    }).then(Object.values);
  }
  return Promise.resolve([]);
}

function formatContact(contact) {
  const paragraphId = extractTargetId(contact.field_type_of_contact);
  return fetchFormattedParagraph(paragraphId).then((result) => {
    return _.assign({}, {
      title: extractValue(contact.title)
    }, result);
  });
}

function defaultFieldNameFormatter(fieldName, prefix = "field_") {
  return _.chain(fieldName).replace(prefix, "").camelCase()
    .value();
}

function makeParagraphFieldFormatter(typeName) {
  return function(fieldName, prefix = "field_") { //eslint-disable-line complexity
    let modifiedFieldName = fieldName;
    if (typeName === "business_guide_contact") {
      if (fieldName === "field_bg_contact_category") {
        modifiedFieldName = "field_category";
      }
    } else if (typeName === "sbic_contact" || typeName === "surety_bond_contact") {
      if (fieldName === "field_single_contact_category") {
        modifiedFieldName = "field_category";
      }
    } else if (typeName === "banner_image" && fieldName === "field_banner_image") {
      modifiedFieldName = "image";
    } else if (typeName === "doc_file") {
      if (fieldName === "field_doc_effective") {
        modifiedFieldName = "effectiveDate";
      } else if (fieldName === "field_doc_expiration") {
        modifiedFieldName = "expirationDate";
      } else if (fieldName === "field_doc_file") {
        modifiedFieldName = "fileUrl";
      } else if (fieldName === "field_doc_version") {
        modifiedFieldName = "version";
      }
    } else if (typeName === "document_id") {
      if (fieldName === "field_doc_id_type") {
        modifiedFieldName = "field_id_type";
      } else if (fieldName === "field_doc_number") {
        modifiedFieldName = "field_number";
      }
    } else if (prefix + typeName !== fieldName) {
      modifiedFieldName = _.replace(fieldName, typeName, "");
    }
    return defaultFieldNameFormatter(modifiedFieldName, prefix);
  };
}

function makeNodeFieldFormatter(typeName) {
  return function(fieldName, prefix = "field_") { //eslint-disable-line complexity
    let modifiedFieldName = fieldName;
    const pluralizedFields = ["field_program", "field_file", "field_button", "field_activity"];
    if (typeName === "program_page" && fieldName === "field_button") {
      modifiedFieldName = "field_buttons";
    } else if (fieldName === "field_summary160") {
      modifiedFieldName = "field_summary";
    } else if (fieldName === "field_document_id") {
      modifiedFieldName = "field_documents";
    } else if (fieldName === "field_doc_number") {
      modifiedFieldName = "field_document_id_number";
    } else if (fieldName === "field_doc_id_type") {
      modifiedFieldName = "field_document_id_type";
    } else if (fieldName === "field_doc_id_type") {
      modifiedFieldName = "field_document_id_type";
    } else if (pluralizedFields.includes(fieldName)) {
      modifiedFieldName = `${fieldName}s`;
    }
    return defaultFieldNameFormatter(modifiedFieldName, prefix);
  };
}

// this is an abstract function that takes an object, removes properties that do not
// start with the given prefix and then formats the key name using the prefix and
// given custom formatter, and then formats the values to the root value (not the
// drupal 8 wrapper).  Note customerValueFormatter must return a promise
function extractFieldsByFieldNamePrefix(object, prefix, customFieldNameFormatter, customValueFormatter) {
  const fieldFormatter = customFieldNameFormatter || defaultFieldNameFormatter;
  const withFixedKeys = _.chain(object)
    //picks every object inside node that starts with field_
    .pickBy(function(value, key) {
      return _.startsWith(key, prefix);
    })
    //maps picked objects. example = field_subsection_header_text : {value}
    .mapKeys(function(value, key) {
      return fieldFormatter(key, prefix);
    })
    .value();
  const withValuesAsPromises = _.mapValues(withFixedKeys, customValueFormatter);
  const retVal = Promise.props(withValuesAsPromises);
  return retVal;
}

function formatTaxonomyTerm(data) {
  if (data) {
    const name = extractValue(data.name);
    const vocabulary = _.camelCase(extractTargetId(data.vid));
    return {
      name: name,
      vocabulary: vocabulary
    };
  }
  return {};
}

function fetchFormattedTaxonomyTerm(taxonomyTermId) {
  return fetchTaxonomyTermById(taxonomyTermId).then(formatTaxonomyTerm);
}

function fetchFormattedTaxonomyName(id) {
  return fetchFormattedTaxonomyTerm(id).then((item) => {
    return item.name;
  });
}

function fetchFormattedTaxonomyNames(ids) {
  return Promise.mapSeries(ids, fetchFormattedTaxonomyName);
}

function formatLink(value, index = 0) {
  return Promise.resolve({
    url: convertUrlHost(value[index].uri),
    title: value[index].title
  });
}



function makeParagraphValueFormatter(typeName, paragraph) {
  return function(value, key) { //eslint-disable-line complexity
    let newValuePromise = Promise.resolve({});
    if (typeName === "text_section" && key === "text") {
      newValuePromise = Promise.resolve(sanitizeTextSectionHtml(extractValue(value)));
    } else if ((typeName === "lookup" && key === "contactCategory") || key === "idType") {
      newValuePromise = fetchFormattedTaxonomyName(extractTargetId(value));
    } else if (typeName === "card_collection" && key === "cards") {
      newValuePromise = fetchNestedParagraphs(paragraph.field_cards);
    } else if (typeName === "style_gray_background") {
      newValuePromise = fetchNestedParagraphs(paragraph.field_paragraphs);
    } else if (typeName === "business_guide_contact" || typeName === "sbic_contact") {
      if (key === "category" || key === "stateServed") {
        newValuePromise = fetchFormattedTaxonomyTerm(extractTargetId(value)).then((item) => {
          return item.name;
        });
      } else if (key === "link") {
        newValuePromise = formatLink(value).then((item) => {
          return item.url;
        });
      } else {
        newValuePromise = Promise.resolve(extractValue(value));
      }
    } else if (typeName === "surety_bond_contact") {
      if (key === "category") {
        newValuePromise = fetchFormattedTaxonomyName(extractTargetId(value));
      } else if (key === "stateServed") {
        newValuePromise = Promise.map(value, (state) => {
          return fetchFormattedTaxonomyTerm(state.target_id).then((formattedState) => {
            return formattedState.name;
          }, {
            concurrency: 1
          });
        }).then((formattedStates) => {
          return formattedStates;
        });
      } else {
        newValuePromise = Promise.resolve(extractValue(value));
      }
    } else if (key === "image" || key === "bannerImage") {
      if (value[0]) {
        newValuePromise = Promise.resolve({
          url: convertUrlHost(value[0].url),
          alt: value[0].alt
        });
      }
    } else if (key === "fileUrl") {
      if (value[0]) {
        newValuePromise = Promise.resolve(extractConvertedUrl(value));
      }
    } else if (key === "link") {
      if (value[0]) {
        newValuePromise = formatLink(value);
      }
    } else {
      newValuePromise = Promise.resolve(extractValue(value));
    }
    return newValuePromise;
  };
}

function makeNodeValueFormatter(typeName) {
  return function(value, key) { //eslint-disable-line complexity
    let newValuePromise = Promise.resolve({});
    if (value === null || !Array.isArray(value) || value.length === 0) {
      const arrayedFields = ["paragraphs", "files", "relatedDocuments", "programs", "activities"];
      if (arrayedFields.includes(key)) {
        // Special case for fields expecting arrays
        newValuePromise = Promise.resolve([]);
      } else {
        newValuePromise = Promise.resolve({});
      }
    } else if (typeName === "program_page" && key === "buttons") {
      newValuePromise = Promise.map(value, (button) => {
        return formatLink([button]);
      });
    } else if (key === "button" || key === "officeLink") {
      newValuePromise = formatLink(value);
    } else if (key === "activities" || key === "programs") {
      newValuePromise = fetchFormattedTaxonomyNames(extractTargetIds(value));
    } else if (typeName === "document" && key === "relatedDocuments") {
      newValuePromise = fetchNestedNodes(value);
    } else if (value[0].target_type === "taxonomy_term") {
      if (key === "activitys" || key === "programs") { // Multiple
        newValuePromise = fetchFormattedTaxonomyNames(extractTargetIds(value));
      } else { // Single
        newValuePromise = fetchFormattedTaxonomyName(extractTargetId(value));
      }
    } else if (value[0].target_type === "paragraph") {
      if (key === "bannerImage") { // Single
        newValuePromise = fetchNestedParagraph(value);
      } else { // Multiple
        newValuePromise = fetchNestedParagraphs(value);
      }
    } else {
      newValuePromise = Promise.resolve(extractValue(value));
    }
    return newValuePromise;
  };
}

function makeChildNodeValueFormatter(typeName) {
  return makeNodeValueFormatter(typeName, true);
}

function formatCallToAction(data) {
  const cta = {};
  const btnRef = extractTargetId(data.field_button_action);
  cta.headline = extractValue(data.field_headline);
  cta.blurb = extractValue(data.field_blurb);
  cta.image = convertUrlHost(data.field_image[0].url);
  cta.imageAlt = data.field_image[0].alt;
  cta.title = extractValue(data.title);

  return fetchParagraphId(btnRef).then((btn) => {
    if (btn.field_link) {
      cta.btnTitle = btn.field_link[0].title;
      cta.btnUrl = btn.field_link[0].uri;
    } else if (btn.field_file && btn.field_button_text) {
      cta.btnTitle = extractValue(btn.field_button_text);
      cta.btnUrl = convertUrlHost(btn.field_file[0].url);
    }
    return cta;
  }).catch((error) => {
    console.error("Unable to retrieve button information for CallToAction");
    return cta;
  });
}

function paragraphFieldFormatter(typeName) {
  return function(fieldName) {
    if (typeName === "image" || typeName === "banner_image") {
      return fieldName;
    } else if (typeName === "business_guide_contact" && fieldName === "field_bg_contact_category") {
      return "contactCategoryTaxonomyTerm";
    }
    return _.replace(fieldName, typeName, "");
  };
}

function fetchFormattedCallToActionByNodeId(nodeId, size) {
  const ctaRef = extractTargetId(nodeId);
  return fetchNodeById(ctaRef)
    .then(formatCallToAction)
    .then(function(result) {
      return _.assign({}, {
        type: "callToAction",
        style: size
      }, result);
    })
    .catch((error) => {
      console.error("Unable to retrieve button information for CallToAction", error);
      return null;
    });
}

function formatFormattedCallToAction(paragraph) {
  return fetchFormattedCallToActionByNodeId(paragraph.field_call_to_action_reference, extractValue(paragraph.field_style));
}


function fetchCounsellorCta() {
  const counsellorCtaNodeId = config.get("counsellorCta.nodeId");
  return fetchFormattedCallToActionByNodeId(counsellorCtaNodeId, "Large");
}


function formatParagraph(paragraph) {
  if (paragraph) {
    const typeName = extractTargetId(paragraph.type);
    switch (typeName) {
      case "call_to_action":
        //need to return at some point
        return fetchFormattedCallToActionByNodeId(paragraph.field_call_to_action_reference, extractValue(paragraph.field_style));
      default: {
        const paragraphFormatter = makeParagraphValueFormatter(typeName, paragraph);
        const extractedFieldsPromise = extractFieldsByFieldNamePrefix(paragraph, fieldPrefix, makeParagraphFieldFormatter(typeName), paragraphFormatter);
        const combineResultWithCamelizedTypename = (object) => {
          return _.assign({
            type: _.camelCase(typeName)
          }, object);
        };

        return extractedFieldsPromise.then(combineResultWithCamelizedTypename);
      }
    }
  }
  return Promise.resolve(null);
}

function fetchFormattedParagraph(paragraphId) {
  return fetchParagraphId(paragraphId)
    .then(formatParagraph)
    .catch((error) => {
      console.error("Unable to fetchFormattedParagraph " + paragraphId);
      console.error(error);
      return null;
    });
}

function fetchNestedParagraphs(paragraphs) {
  if (paragraphs) {
    const paragraphIds = _.map(paragraphs, "target_id");
    return Promise.map(paragraphIds, fetchFormattedParagraph).then((result) => {
      return _.compact(result);
    });
  }
  return Promise.resolve(null);
}

function fetchNestedParagraph(paragraphs) {
  if (paragraphs) {
    if (paragraphs.length > 1) {
      console.log(`WARNING: fetchNestedParagraph called, but was given multiple paragraphs: ${JSON.stringify(paragraphs)}`);
    }
    return fetchFormattedParagraph(extractTargetId(paragraphs));
  }
  return Promise.resolve(null);
}

function fetchNestedNodes(nodes) {
  if (nodes) {
    const nodeIds = _.map(nodes, "target_id");
    return Promise.map(nodeIds, fetchFormattedChildNode).then((result) => {
      return _.compact(result);
    });
  }
  return Promise.resolve(null);
}

function fetchNestedNode(nodes) {
  if (nodes) {
    if (nodes.length > 1) {
      console.log(`WARNING: fetchNestedNode called, but was given multiple nodes: ${JSON.stringify(nodes)}`);
    }
    return fetchFormattedChildNode(extractTargetId(nodes));
  }
  return Promise.resolve(null);
}

function formatChildNode(data) {
  return formatNode(data, true);
}

function formatNode(data, isChild = false) {
  if (data) {
    // Process other required data
    const nodeType = extractTargetId(data.type);
    const otherData = {};
    otherData.type = _.camelCase(nodeType);
    otherData.title = extractValue(data.title);
    otherData.id = extractValue(data.nid);

    // Create an object minus the "one-off" fields above
    let minimizedData = _.omit(data, ["field_site_location"]);
    if (isChild) {
      minimizedData = _.omit(minimizedData, ["field_related_documents"]);
    }

    // Extract any other fields
    const nodeValueFormatter = makeNodeValueFormatter(nodeType);
    const extractedFieldsPromise = extractFieldsByFieldNamePrefix(minimizedData, fieldPrefix, makeNodeFieldFormatter(nodeType), nodeValueFormatter);

    return Promise.all([extractedFieldsPromise]).spread((extractedFields) => {
      const formattedNode = {};
      _.merge(formattedNode, extractedFields, otherData);
      return formattedNode;
    });
  } else {
    return {};
  }
}

function formatMenu(data, parentUrl) {
  if (data) {
    const myUrl = formatUrl(data.link.url, data.link.title);
    const fullUrl = path.join(parentUrl, myUrl);

    let promise = Promise.resolve(null);
    if (data.has_children && data.subtree) {
      promise = formatMenuTree(data.subtree, fullUrl); //eslint-disable-line no-use-before-define
    }

    return promise.then((submenus) => {
      return {
        title: data.link.title,
        url: myUrl,
        fullUrl: fullUrl,
        children: submenus,
        description: data.link.description,
        node: data.link.route_parameters ? data.link.route_parameters.node : null,
        weight: _.toNumber(data.link.weight)
      };
    });
  }
  return Promise.resolve({});

}

function formatMenuTree(data, parentUrl) {
  if (data) {
    const rootUrl = parentUrl ? parentUrl : "/";
    return Promise.map(data, (item) => {
      return formatMenu(item, rootUrl);
    }, {
      concurrency: 1
    }).then((menu) => {
      return _.chain(menu).sortBy("weight").value();
    });
  }
  return Promise.resolve([]);
}


function fetchFormattedNode(nodeId) {
  return fetchNodeById(nodeId).then(formatNode);
}

function fetchFormattedChildNode(nodeId) {
  return fetchNodeById(nodeId).then(formatChildNode);
}

function fetchFormattedMenu() {
  return fetchMenuTreeByName("main").then(formatMenuTree);
}

function fetchTaxonomyVocabulary(queryParams) {
  const data = fetchTaxonomys();
  let names = _.map(data, "name");
  if (queryParams.names) {
    names = queryParams.names.split(",");
  }
  return Promise.resolve(data)
    .then((results) => {
      return _.filter(results, (item) => {
        return _.includes(names, item.name);
      });
    });
}

export { fetchFormattedNode, fetchFormattedTaxonomyTerm, nodeEndpoint, taxonomyEndpoint, paragraphEndpoint, taxonomysEndpoint, fetchTaxonomys, fetchContacts, contactEndpoint, fetchParagraphId, fetchFormattedMenu, fetchMenuTreeByName, formatMenuTree, fetchCounsellorCta, convertUrlHost, formatParagraph, makeParagraphValueFormatter, extractFieldsByFieldNamePrefix, makeParagraphFieldFormatter, formatNode, extractValue, extractProperty, extractProperties, fetchFormattedCallToActionByNodeId, formatLink, extractConvertedUrl, fetchFormattedTaxonomyNames, fetchFormattedTaxonomyName, makeNodeFieldFormatter, fetchTaxonomyVocabulary, fetchDocuments, filterAndSortDocuments };
