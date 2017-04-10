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


function fetchFromDrupalEight(type, id) {
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


function fetchNodeFromDrupalEight(nodeId) {
  return fetchFromDrupalEight("node", nodeId);
}

function fetchParagraphFromDrupalEight(paragraphId) {
  return fetchFromDrupalEight("entity/paragraph", paragraphId);
}

function formatDrupalEightNodeResponse(response) {
  const paragraphs = response.field_paragraphs;
  const title = response.title[0].value;
  return Promise.map(paragraphs, (paragraph) => {
    return fetchParagraphFromDrupalEight(paragraph.target_id);
  }).then((paragraphData) => {
    return {
      title: title,
      paragraphs: paragraphData
    };
  });


}


function fetchFormattedNode(nodeId) {
  return fetchNodeFromDrupalEight(nodeId).then(formatDrupalEightNodeResponse);
}






export { fetchFormattedNode };
