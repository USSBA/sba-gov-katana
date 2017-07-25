import _ from "lodash";
import Promise from "bluebird";
import url from "url";
import config from "config";
import localContacts from "../models/dao/contacts.js";
import path from "path";


const fieldPrefix = "field_";
const nodeEndpoint = "node";
const taxonomyEndpoint = "/taxonomy/term";
const paragraphEndpoint = "entity/paragraph";
const contactEndpoint = "contacts";
const menuTreeEndpoint = "/entity/menu/:name/tree";


import {
  fetchById,
  fetchContent
} from "../models/dao/drupal8-rest.js";

import {
  sanitizeTextSectionHtml,
  formatUrl
} from "../util/formatter.js";

// a few helper functions to extract data from the drupal wrappers
function extractProperty(object, key) {
  if (object && object.length > 0 && key !== null && object[0][key]) {
    return object[0][key];
  }
  return null;
}

function extractValue(object, key) {
  return extractProperty(object, "value");
}

function extractValuePromise(value, key) {
  return Promise.resolve(extractValue(value, key));
}

function extractTargetId(object) {
  return extractProperty(object, "target_id");
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

function convertUrlHost(urlStr) {
  const host = _.trimEnd(config.get("drupal8.contentUrl"), "/");
  const parsedUrl = url.parse(urlStr);
  //Only modify URL if it points to localhost
  if (parsedUrl.hostname === "localhost") {
    return `${host}${parsedUrl.pathname}`;
  }
  return urlStr;
}

//contacts content type
function fetchContacts(queryParams) {
  let type = queryParams.type + "Contact";
  if (config.get("drupal8.useLocalContacts")) {
    console.log("Using Development Contacts information");
    return Promise.resolve(localContacts);
  }

  return fetchContent(contactEndpoint)
    .then(formatContacts)
    .then((results) => {
      return _.filter(results, {
        type: type
      });
    })
}

function formatContacts(data) {
  if (data) {
    return Promise.map(data, formatContact, {
      concurrency: 50
    });
  }
  return Promise.resolve([]);
}

function formatContact(contact) {
  const paragraphId = extractTargetId(contact.field_type_of_contact);
  return fetchFormattedParagraph(paragraphId).then((result) => {
    return _.assign({}, {
      title: extractValue(contact.title)
    }, result)
  });
}



function defaultFieldNameFormatter(fieldName, prefix = "field_") {
  return _.chain(fieldName).replace(prefix, "").camelCase()
    .value();
}

function makeParagraphFieldFormatter(typeName) {
  return function(fieldName, prefix = "field_") {
    let modifiedFieldName = fieldName;
    if (typeName === "business_guide_contact") {
      if (fieldName === "field_bg_contact_category") {
        modifiedFieldName = "field_category"
      }
    } else if (typeName === "sbic_contact") {
      if (fieldName === "field_single_contact_category") {
        modifiedFieldName = "field_category"
      }
    } else if (typeName !== "image" && typeName !== "banner_image") {
      modifiedFieldName = _.replace(fieldName, typeName, "");
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

function formatLink(value) {
  return Promise.resolve({
    url: convertUrlHost(value[0].uri),
    title: value[0].title
  });
}


function makeParagraphValueFormatter(typeName, paragraph) {
  return function(value, key) { //eslint-disable-line complexity
    let newValuePromise = Promise.resolve({});
    if (typeName === "text_section" && key === "text") {
      newValuePromise = Promise.resolve(sanitizeTextSectionHtml(extractValue(value)));
    } else if (typeName === "lookup" && key === "contactCategory") {
      const taxonomyTermId = extractTargetId(value);
      newValuePromise = fetchFormattedTaxonomyTerm(taxonomyTermId).then((result) => {
        return result.name;
      });
    } else if (typeName === "card_collection" && key === "cards") {
      newValuePromise = fetchNestedParagraph(paragraph, "card_collection"); //eslint-disable-line no-use-before-define
    } else if (typeName === "style_gray_background") {
      newValuePromise = fetchNestedParagraph(paragraph, "style_gray_background"); //eslint-disable-line no-use-before-define
    } else if (typeName === "business_guide_contact" || typeName === "sbic_contact") {
      if (key === "category" || key === "stateServed") {
        newValuePromise = fetchFormattedTaxonomyTerm(extractTargetId(value)).then((item) => item.name);
      } else if (key === "link") {
        newValuePromise = formatLink(value).then((item) => item.url);
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
  return function(value, key) {
    let newValuePromise = Promise.resolve({});
    if (!(Array.isArray(value) & value.length > 0)) {
      newValuePromise = Promise.resolve({});
    } else if (key === "button") {
      newValuePromise = Promise.resolve({
        url: extractProperty(value, "uri"),
        title: extractProperty(value, "title")
      });
    } else if (key !== "paragraphs" && value[0].target_type === "paragraph") {
      newValuePromise = fetchFormattedParagraph(extractTargetId(value)); //eslint-disable-line no-use-before-define
    } else {
      newValuePromise = Promise.resolve(extractValue(value));
    }
    return newValuePromise;
  };
}

function formatCallToAction(paragraph) {
  const ctaRef = extractTargetId(paragraph.field_call_to_action_reference);
  const cta = {
    type: "callToAction",
    style: extractValue(paragraph.field_style)
  };
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
      return "contactCategoryTaxonomyTerm"
    } else {
      return _.replace(fieldName, typeName, "");

    }
  };
}

function formatFormattedCallToActionByNodeId(nodeId, size) {
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
      console.error("Unable to retrieve button information for CallToAction");
      return null;
    });
}

function formatFormattedCallToAction(paragraph) {
  return formatFormattedCallToActionByNodeId(paragraph.field_call_to_action_reference, extractValue(paragraph.field_style));
}


function fetchCounsellorCta() {
  const counsellorCtaNodeId = config.get("counsellorCta.nodeId");
  return formatFormattedCallToActionByNodeId(counsellorCtaNodeId, "Large");
}


function formatParagraph(paragraph) {
  if (paragraph) {
    const typeName = extractTargetId(paragraph.type);
    switch (typeName) {
      case "call_to_action":
        //need to return at some point
        return formatCallToAction(paragraph);
      default:
        {
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

function fetchNestedParagraph(nestedParagraph, typeName) {
  if (nestedParagraph) {
    let paragraphs;
    if (typeName === "card_collection") {
      paragraphs = nestedParagraph.field_cards || [];
    } else if (typeName === "style_gray_background") {
      paragraphs = nestedParagraph.field_paragraphs || [];
    }
    const paragraphIds = _.map(paragraphs, "target_id");
    return Promise.map(paragraphIds, fetchFormattedParagraph);
  }
  return Promise.resolve(null);
}

function formatNode(data) {
  if (data) {
    // Format Paragraphs
    const paragraphs = data.field_paragraphs || [];
    const paragraphIds = _.map(paragraphs, "target_id");
    const paragraphDataPromises = Promise.map(paragraphIds, fetchFormattedParagraph);

    // Format Taxonomy
    const taxonomy = data.field_site_location;
    const taxonomyPromise = taxonomy ? fetchFormattedTaxonomyTerm(extractTargetId(taxonomy)) : Promise.resolve(null);

    // Format Summary (could be named one of two things)
    const summary = extractValue(data.field_summary || data.field_summary160);

    // Create an object minus the "one-off" fields above
    const minimizedData = _.omit(data, ["field_paragraphs", "field_site_location",
      "field_summary", "field_summary160"
    ]);

    // Extract any other fields
    const nodeValueFormatter = makeNodeValueFormatter(extractTargetId(data.type));
    const extractedFieldsPromise = extractFieldsByFieldNamePrefix(minimizedData, fieldPrefix, makeParagraphFieldFormatter(""), nodeValueFormatter);

    return Promise.all([paragraphDataPromises, taxonomyPromise, extractedFieldsPromise]).spread((paragraphData, taxonomyData, extractedFields) => {
      const formattedNode = {
        title: extractValue(data.title),
        paragraphs: _.compact(paragraphData),
        summary: summary
      };
      _.merge(formattedNode, extractedFields);
      return formattedNode;
    });
  }
  return {};
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

function fetchFormattedMenu() {
  return fetchMenuTreeByName("main").then(formatMenuTree);
}

export {
  fetchFormattedNode,
  fetchFormattedTaxonomyTerm,
  nodeEndpoint,
  taxonomyEndpoint,
  paragraphEndpoint,
  fetchContacts,
  contactEndpoint,
  fetchParagraphId,
  fetchFormattedMenu,
  fetchMenuTreeByName,
  formatMenuTree,
  fetchCounsellorCta,
  convertUrlHost,
  formatParagraph,
  makeParagraphValueFormatter,
  extractFieldsByFieldNamePrefix,
  makeParagraphFieldFormatter,
  formatNode,
  extractValue,
  extractProperty
};
