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
    baseURL: config.get("daisho.hostname") + (config.has("daisho.port") ? ":" + config.get("daisho.port") : ""),
    headers: {
      "Accepts": "application/json"
    }
  };
  winston.info("Submitting request to ", options);

  return Promise.resolve().then(() => {
    return axios.request(options)
      .then(function(response) {
        if (response && response.data) {
          //   winston.info("Response from Daisho ", response.data);
          return response.data;
        }
        winston.info("Response from Daisho did not contain data");
        return null;
      })
      .catch(function(error) {
        winston.error(error);
        throw new Error("Error encountered contacting the daisho client in get");
      });
  });
}

function del(resource) {
  const options = {
    method: "delete",
    url: "/api/content/" + resource + ".json",
    baseURL: config.get("daisho.hostname") + (config.has("daisho.port") ? ":" + config.get("daisho.port") : "")
  };
  winston.info("Submitting request to ", options);

  return Promise.resolve().then(() => {
    return axios.request(options)
      .then(function(response) {
        if (response && response.status === HttpStatus.NO_CONTENT) {
          winston.info("Response from Daisho ", response.data);
          return response.data;
        } else {
          throw new Error("Error encountered contacting the daisho client, recieved " + response.status);
        }
      })
      .catch(function(error) {
        winston.error(error);
        throw new Error("Error encountered contacting the daisho client in del");
      });
  });
}


export { get, del };
