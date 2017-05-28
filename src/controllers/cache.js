import HttpStatus from "http-status-codes";
import _ from "lodash";
import cache from "memory-cache";


function clearCache(req, res) {
  console.log("Clearing the Cache");
  cache.clear();
  res.status(HttpStatus.OK).json({
    status: "success",
    message: "The cache has been cleared"
  });
}

export { clearCache };
