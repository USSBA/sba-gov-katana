import { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal } from "../util/drupal-rest.js";
import { fetchDisasterFromDrupalDatabase } from "../models/dao/disaster.js";
import { fetchMainMenu } from "../models/dao/main-menu.js";
import { fetchFormattedNode, fetchFormattedTaxonomyTerm, fetchContacts, fetchFormattedMenu, fetchCounsellorCta } from "../service/drupal-eight.js";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import querystring from "querystring";
import cache from "memory-cache";

const fetchFunctions = {
  node: fetchFormattedNode,
  taxonomy: fetchFormattedTaxonomyTerm
};

const fetchContentTypeFunctions = {
  contacts: fetchContacts,
  blogs: fetchBlogsFromDrupal,
  disaster: fetchDisasterFromDrupalDatabase,
  frontpageslides: fetchFrontPageSlidesFromDrupal,
  "main-menu": fetchMainMenu,
  menu: fetchFormattedMenu,
  counsellorCta: fetchCounsellorCta
};

function fetchContentById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    const type = req.params.type;
    const id = req.params.id;
    const compositeKey = type + "-" + id;
    let promise;
    if (cache.get(compositeKey)) {
      console.log("Using cached content");
      promise = Promise.resolve(cache.get(compositeKey));
    } else {
      promise = fetchFunctions[req.params.type](req.params.id)
        .then((result) => {
          console.log("Caching " + compositeKey);
          cache.put(compositeKey, result);
          console.log("cache keys are now", cache.keys());
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
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type or id");
  }
}

function fetchContentByType(req, res) {
  if (req.params && req.params.type) {
    const type = req.params.type;
    const compositeKey = type + (!_.isEmpty(req.query) ? "-" + querystring.stringify(req.query).replace(/\=/g, "-") : "");
    console.log("compositeKey", compositeKey);
    let promise;
    if (cache.get(compositeKey)) {
      console.log("Using cached content");
      promise = Promise.resolve(cache.get(compositeKey));
    } else {
      promise = fetchContentTypeFunctions[type](req.query)
        .then((result) => {
          console.log("Caching " + compositeKey);
          cache.put(compositeKey, result);
          console.log("cache keys are now", cache.keys());
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
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error retrieving content.");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type.");
  }
}


export { fetchContentById, fetchContentByType };
