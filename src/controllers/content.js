import { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal } from "../util/drupal-rest.js";
import { fetchDisasterFromDrupalDatabase } from "../models/dao/disaster.js";
import { fetchMainMenu } from "../models/dao/main-menu.js";
import { fetchFormattedNode, fetchContacts, fetchFormattedMenu, fetchCounsellorCta, fetchDocuments, fetchTaxonomyVocabulary, fetchArticles } from "../service/drupal-eight.js";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import querystring from "querystring";
import cache from "memory-cache";

const fetchFunctions = {
  node: fetchFormattedNode
};

const fetchContentTypeFunctions = {
  contacts: fetchContacts,
  blogs: fetchBlogsFromDrupal,
  disaster: fetchDisasterFromDrupalDatabase,
  frontpageslides: fetchFrontPageSlidesFromDrupal,
  "main-menu": fetchMainMenu,
  menu: fetchFormattedMenu,
  counsellorCta: fetchCounsellorCta,
  documents: fetchDocuments,
  articles: fetchArticles,
  taxonomyVocabulary: fetchTaxonomyVocabulary
};

function fetchAndCache(fetchFunctionIfNeeded, input, compositeKey, res) {
  let promise;
  if (cache.get(compositeKey)) {
    console.log("Using cached content");
    promise = Promise.resolve(cache.get(compositeKey));
  } else {
    promise = fetchFunctionIfNeeded(input)
      .then((result) => {
        console.log("Caching " + compositeKey);
        cache.put(compositeKey, result);
        return result;
      });
  }
  promise.then(function(data) {
    if (data && !_.isEmpty(data)) {
      res.status(HttpStatus.OK).send(data);
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  })
    .catch((error) => {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error retrieving content");
    });
}

function fetchContentById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    const type = req.params.type;
    const id = req.params.id;
    const compositeKey = type + "-" + id;
    const fetchFunction = fetchFunctions[type];
    fetchAndCache(fetchFunction, req.params.id, compositeKey, res);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type or id");
  }
}

function fetchContentByType(req, res) {
  if (req.params && req.params.type) {
    const type = req.params.type;
    const compositeKey = type + (!_.isEmpty(req.query) ? "-" + querystring.stringify(req.query) : "");
    const fetchFunction = fetchContentTypeFunctions[type];
    fetchAndCache(fetchFunction, req.query, compositeKey, res);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type.");
  }
}


export { fetchContentById, fetchContentByType };
