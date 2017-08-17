import { del } from "../models/dao/daisho-client.js";
import HttpStatus from "http-status-codes";
import _ from "lodash";


function deleteCache(resource, res) {
  del(resource)
    .then(() => {
      res.status(HttpStatus.OK).send("Cache cleared");
    }).catch(() => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Failed to clear the cache");
  });

}

function clearContentCollectionCacheByType(req, res) {
  if (req.params && req.params.type) {
    deleteCache("collection/" + req.params.type, res);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type or id");
  }
}

function clearContentCacheById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    deleteCache(req.params.type + "/" + req.params.id, res);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing id");
  }
}


function clearContentCacheByType(req, res) {
  if (req.params && req.params.type) {
    deleteCache(req.params.type, res);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Incorrect request format missing type or id");
  }
}

export { clearContentCollectionCacheByType, clearContentCacheById, clearContentCacheByType };
