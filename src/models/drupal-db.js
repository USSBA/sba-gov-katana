import { drupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

function executeQuery(query) {
  return drupal.query(query, {
    type: Sequelize.QueryTypes.SELECT
  });
}

export { executeQuery };
