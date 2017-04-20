import { drupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

const govDeliveryCountyZip = drupal.define("govdelivery_county_zip", {
  zip_code: { //eslint-disable-line camelcase
    type: Sequelize.INTEGER
  },
  county_code: { //eslint-disable-line camelcase
    type: Sequelize.INTEGER
  },
  county_name: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  },
  state_code: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  }

}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});

govDeliveryCountyZip.removeAttribute("id");

export { govDeliveryCountyZip };