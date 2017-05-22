import axios from "axios";
import config from "config";
import Promise from "bluebird";
import HttpStatus from "http-status-codes";


function fetchContent(resource) {
  const options = {
    url: resource,
    params: {
      "_format": "json"
    },
    baseURL: config.get("drupal8.hostname"),
    headers: {
      "Accepts": "application/json"
    }
  };
  console.log("Submitting request to ", resource);

  return Promise.resolve(axios.request(options)
    .then(function(response) {
      //   console.log("Response was ", response);
      if (response && response.data) {
        return response.data;
      }
      return null;

    })
    .catch(function(error) {
      if (error && error.response && error.response.status === HttpStatus.NOT_FOUND) {
        return null;
      }
      console.error(error);
      throw new Error("Error encountered contacting the drupal 8 rest services in fetchContent");
    }));
}

function fetchById(type, id) {
  return fetchContent(type + "/" + id + "/");
}



export { fetchById, fetchContent };
