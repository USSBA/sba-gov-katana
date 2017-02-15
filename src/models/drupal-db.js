import mysql from "mysql";
import config from "config";
import Promise from "bluebird";
var pool = mysql.createPool(config.get("database.mysql"));

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, function(err, rows) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
}

export { executeQuery };


