import { dbConnection } from "../mongodb.js";
import Promise from "bluebird";
import uuid from "uuid";
import _ from "lodash";

function create(formData) {
  const toInsert = _.merge({}, formData, {
    _id: uuid.v4()
  });
  return new Promise((resolve, reject) => {
    var collection = dbConnection.collection("lenderMatchRecord");
    // Insert some documents
    collection.insert(toInsert, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result.ops[0]);
      }
    });
  });
}

function retrieve(lenderMatchRecordId) {
  return new Promise((resolve, reject) => {
    var collection = dbConnection.collection("lenderMatchRecord");
    // Insert some documents
    collection.find({
      _id: lenderMatchRecordId
    }, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export { create, retrieve };
