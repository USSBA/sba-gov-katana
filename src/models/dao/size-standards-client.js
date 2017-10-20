import axios from "axios";
import config from "config";
import Promise from "bluebird";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import winston from "winston";


function get(resource, query) {
  const formattedOptions = {
    url: resource,
    params: query,
    baseURL: "https://" + config.get("sizestandards.endpoint") + "/",
    headers: {
      "Accepts": "application/json"
    }
  };
  winston.info("Requesting ", formattedOptions);

  return Promise.resolve().then(() => {
    return axios.request(formattedOptions)
      .then(function(response) {
        if (response && response.data) {
          return response.data;
        }
        winston.info("Response from SizeStandardsAPI did not contain data");
        return null;
      })
      .catch(function(error) {
        winston.error(error);
        throw new Error("Error encountered contacting the SizeStandards client in get");
      });
  });
}

export { get };
