import { nonDrupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

function executeNonDrupalQuery(query) {
  return nonDrupal.query(query, {
    type: Sequelize.QueryTypes.SELECT
  });
}

export { executeNonDrupalQuery };
