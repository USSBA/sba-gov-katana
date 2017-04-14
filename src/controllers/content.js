import { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal } from "../util/drupal-rest.js";
import { fetchDisasterFromDrupalDatabase } from "../models/dao/disaster.js";

import { fetchFormattedNode, fetchFormattedTaxonomyTerm } from "../service/drupal-eight.js";
import HttpStatus from "http-status-codes";

const fetchFunctions = {
  node: fetchFormattedNode,
  taxonomy: fetchFormattedTaxonomyTerm
};

function fetchContentById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    fetchFunctions[req.params.type](req.params.id)
      .then(function(data) {
        res.status(HttpStatus.OK).send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(error.response.status).send("Error retrieving content");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type or id");
  }
}


function fetchBlogs(req, res) {
  fetchBlogsFromDrupal()
    .then(function(data) {
      res.status(HttpStatus.OK).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.response.status).send("Error retrieving content");
    });
}


function fetchFrontPageSlides(req, res) {
  fetchFrontPageSlidesFromDrupal()
    .then(function(data) {
      res.status(HttpStatus.OK).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.response.status).send("Error retrieving content");
    });
}


function fetchDisaster(req, res) {
  fetchDisasterFromDrupalDatabase()
    .then(function(result) {
      res.status(HttpStatus.OK).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.response.status).send("Error retrieving content");
    });
}


export { fetchContentById, fetchFrontPageSlides, fetchBlogs, fetchDisaster };
