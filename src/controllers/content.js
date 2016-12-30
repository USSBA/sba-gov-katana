import data from "./temp-slideshow-response.json";
import config from "config";
import axios from "axios";
import path from "path";
import querystring from "querystring";
import HttpStatus from "http-status-codes";

function nodeReal(req, res) {
  if (req.query) {
    const givenQueryString = querystring.stringify(req.query);
    axios.get(path.join(config.get("developmentOptions.drupal.hostname"), "node.json?" + givenQueryString))
      .then(function(response) {
        res.status(HttpStatus.OK).send(response.data);
      })
      .catch(function(error) {
        console.error(error);
        res.status(error.response.status).send("Error retrieving content");
      });
  } else {
    res.send(HttpStatus.BAD_REQUEST).send("Too few query params");
  }

  res.status(HttpStatus.OK).send(data);
}


function node(req, res) {
  res.status(HttpStatus.OK).send(data);
}

function singleNode(req, res) {
  res.status(HttpStatus.OK).send(data);
}

export { node, singleNode, nodeReal };
