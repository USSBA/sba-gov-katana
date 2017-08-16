import axios from "axios";
import config from "config";
import Promise from "bluebird";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import winston from "winston";


function get(resource, query) {
  const options = {
    url: "/api/content/" + resource + ".json",
    params: query,
    baseURL: config.get("daisho.hostname") + ":" + config.get("daisho.port"),
    headers: {
      "Accepts": "application/json"
    }
  };
  winston.info("Submitting request to ", resource);

  return Promise.resolve().then(() => {
    axios.request(options)
      .then(function(response) {
        if (response && response.data) {
          return response.data;
        }
        return null;

      })
      .catch(function(error) {
        if (error && error.response && error.response.status === HttpStatus.NOT_FOUND) {
          return null;
        }
        winston.error(error);
        throw new Error("Error encountered contacting the drupal 8 rest services in fetchContent");
      });
  });
}


export { get };
