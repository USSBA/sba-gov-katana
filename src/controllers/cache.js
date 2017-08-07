import HttpStatus from "http-status-codes";
import _ from "lodash";
import cache from "memory-cache";


function clearCache(req, res) {
  console.log("Clearing the Cache (but not contacts or documents)");
  const keys = cache.keys();
  const keysWithoutContacts = _.filter(keys, (item) => {
    return !item.startsWith("contact") && !item.startsWith("document");
  });

  keysWithoutContacts.forEach((key) => {
    cache.del(key);
    console.log("Cleared from cache", key);
  });
  res.status(HttpStatus.NO_CONTENT).send();
}



function clearContactCache(req, res) {
  console.log("Clearing the Contact Cache");
  const keys = cache.keys();
  const contactKeys = _.filter(keys, (item) => {
    return item.startsWith("contact");
  });
  contactKeys.forEach((key) => {
    cache.del(key);
    console.log("Cleared from cache", key);
  });
  res.status(HttpStatus.NO_CONTENT).send();
}


function clearDocumentCache(req, res) {
  console.log("Clearing the Document Cache");
  const keys = cache.keys();
  const contactKeys = _.filter(keys, (item) => {
    return item.startsWith("document");
  });
  contactKeys.forEach((key) => {
    cache.del(key);
    console.log("Cleared from cache", key);
  });
  res.status(HttpStatus.NO_CONTENT).send();
}

export { clearCache, clearContactCache, clearDocumentCache };
