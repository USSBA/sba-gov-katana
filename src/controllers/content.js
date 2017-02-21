import { fetchFromDrupal, fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal } from "../util/drupal-rest.js";
import { fetchDescription } from "../models/dao/disaster.js";
import HttpStatus from "http-status-codes";

function fetchContent(req, res) {
  if (req.query && req.params && req.params.type) {
    fetchFromDrupal(req.params.type + ".json", req.query)
      .then(function(data) {
        res.status(HttpStatus.OK).send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(error.response.status).send("Error retrieving content");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Too few query params");
  }
}


function fetchContentById(req, res) {
  if (req.query && req.params && req.params.type && req.params.id) {
    fetchFromDrupal(req.params.type + "/" + req.params.id + ".json")
      .then(function(data) {
        res.status(HttpStatus.OK).send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(error.response.status).send("Error retrieving content");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format");
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
  fetchDescription()
    .then(function(description) {
      res.status(HttpStatus.OK).send({
        description: description,
        visible: true
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(error.response.status).send("Error retrieving content");
    });
}


export { fetchContent, fetchContentById, fetchFrontPageSlides, fetchBlogs, fetchDisaster };
