import { drupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

const govDeliveryDistrictCounty = drupal.define("govdelivery_district_county", {
  id: { //eslint-disable-line id-length
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  state_code: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  },
  county_name: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  },
  district_name: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  },
  regional_topic: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  },
  district_topic: { //eslint-disable-line camelcase
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});

export { govDeliveryDistrictCounty };