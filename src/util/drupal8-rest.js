import axios from "axios";
import _ from "lodash";
import config from "config";
import Promise from "bluebird";
import URL from "url";

var requestObject = {
  baseURL: config.get("drupal8.hostname"),
  headers: {
    "Accepts": "application/json"
  }
};


function fetchFromDrupal8(type, id) {
  const options = _.merge({}, requestObject);
  options.url = type + "/" + id + "/";
  options.params = {
    "_format": "json"
  };
  console.log(options);
  return axios.request(options)
    .then(function(response) {
      return response.data;
    });
}


function fetchNodeFromDrupal8(nodeId) {
  return fetchFromDrupal8("node", nodeId);
}

function fetchParagraphFromDrupal8(paragraphId) {
  return fetchFromDrupal8("entity/paragraph", paragraphId);
}

function formatDrupal8NodeResponse(response) {
  let paragraphs = response['field_paragraphs'];
  let title = response['title'][0].value;
  return Promise.map(paragraphs, (paragraph) => {
    return fetchParagraphFromDrupal8(paragraph['target_id']);
  }).then((paragraphData) => {
    return {
      title: title,
      paragraphs: paragraphData
    };
  });


}


function fetchFormattedNode(nodeId) {
  return fetchNodeFromDrupal8(nodeId).then(formatDrupal8NodeResponse);
}






export {
  fetchFormattedNode
};
