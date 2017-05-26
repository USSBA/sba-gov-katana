import HttpStatus from "http-status-codes";
import _ from "lodash";
import cache from "memory-cache";


function clearCache(req, res) {
  cache.clear()
  res.status(HttpStatus.NO_CONTENT).send();
}

export {
  clearCache
};
