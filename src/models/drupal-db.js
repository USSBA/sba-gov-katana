import { drupal, nonDrupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

function executeDrupalQuery(query) {
  return drupal.query(query, {
    type: Sequelize.QueryTypes.SELECT
  });
}

function executeNonDrupalQuery(query) {
  return nonDrupal.query(query, {
    type: Sequelize.QueryTypes.SELECT
  });
}

export { executeDrupalQuery, executeNonDrupalQuery };
