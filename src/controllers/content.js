import { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal } from "../util/drupal-rest.js";
import { fetchDisasterFromDrupalDatabase } from "../models/dao/disaster.js";
import { fetchMainMenu } from "../models/dao/main-menu.js";
import { fetchFormattedNode, fetchContacts, fetchFormattedMenu, fetchCounsellorCta, fetchDocuments, fetchTaxonomyVocabulary, fetchArticles } from "../service/drupal-eight.js";
import { fetchNotification } from "../service/notification.js";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import querystring from "querystring";

const fetchFunctions = {
  node: fetchFormattedNode
};

const fetchContentTypeFunctions = {
  contacts: fetchContacts,
  blogs: fetchBlogsFromDrupal,
  disaster: fetchDisasterFromDrupalDatabase,
  frontpageslides: fetchFrontPageSlidesFromDrupal,
  "main-menu": fetchMainMenu,
  siteMap: fetchFormattedMenu,
  counsellorCta: fetchCounsellorCta,
  documents: fetchDocuments,
  articles: fetchArticles,
  taxonomyVocabulary: fetchTaxonomyVocabulary,
  notification: fetchNotification
};

function fetchContentById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    const type = req.params.type;
    const id = req.params.id;
    const fetchFunction = fetchFunctions[type];
    if (fetchFunction) {
      fetchFunction(id, {
        headers: req.headers
      }).then(function(data) {
        res.status(HttpStatus.OK).send(data);
      })
        .catch((error) => {
          console.error(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error retrieving content");
        });
    } else {
      console.error("fetchContentById encountered an unknown type " + type);
      res.status(HttpStatus.BAD_REQUEST).send("Unknown Content Type: " + type);
    }
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type or id");
  }
}

function fetchContentByType(req, res) {
  if (req.params && req.params.type) {
    const type = req.params.type;
    const fetchFunction = fetchContentTypeFunctions[type];
    if (fetchFunction) {
      fetchFunction(req.query).then(function(data) {
        res.status(HttpStatus.OK).send(data);
      })
        .catch((error) => {
          console.error(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error retrieving content");
        });
    } else {
      console.error("fetchContentById encountered an unknown type " + type);
      res.status(HttpStatus.BAD_REQUEST).send("Unknown Content Type: " + type);
    }
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type.");
  }
}


export { fetchContentById, fetchContentByType };
