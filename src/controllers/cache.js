import HttpStatus from "http-status-codes";
import _ from "lodash";
import cache from "memory-cache";


function clearCache(req, res) {
  console.log("Clearing the Cache (but not contacts or documents)");
  const keys = cache.keys();
  const keysWithoutContacts = _.filter(keys, (item) => {
    return !item.includes("contact");
  });

  keysWithoutContacts.forEach((key) => {
    cache.del(key);
    console.log("Cleared from cache", key);
  });
  res.status(HttpStatus.NO_CONTENT).send();
}



function clearContactCache(req, res) {
  console.log("Clearing the Cache");
  const keys = cache.keys();
  const contactKeys = _.filter(keys, (item) => {
    return item.includes("contact");
  });
  contactKeys.forEach((key) => {
    cache.del(key);
    console.log("Cleared from cache", key);
  });
  res.status(HttpStatus.NO_CONTENT).send();
}

export { clearCache, clearContactCache };
