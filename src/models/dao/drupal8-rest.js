import axios from "axios";
import config from "config";
import Promise from "bluebird";


function fetchFromDrupalEight(type, id) {
  const options = {
    url: type + "/" + id + "/",
    params: {
      "_format": "json"
    },
    baseURL: config.get("drupal8.hostname"),
    headers: {
      "Accepts": "application/json"
    }
  };
  return Promise.resolve(axios.request(options)
    .then(function(response) {
      return response.data;
    }));
}




export { fetchFromDrupalEight };
