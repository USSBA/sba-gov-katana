import axios from "axios";
import config from "config";
import Promise from "bluebird";



function fetchById(type, id) {
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
      if (response && response.data) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch(function(error) {
      console.log(arguments);
      if (error && error.status === 404) {
        return null;
      } else {
        console.log("Error encountered contacting the drupal 8 rest services in fetchById", error);
        throw error;
      }
    }));
}


export {
  fetchById
};
