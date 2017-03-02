import { drupal } from "./db.js";
import * as Sequelize from "sequelize";

function executeQuery(query) {
  return drupal.query(query, {
    type: Sequelize.QueryTypes.SELECT
  });
}

export { executeQuery };
