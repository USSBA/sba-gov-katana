/* eslint-disable camelcase */
const drupalSeven = require('./drupal-seven-db-client.js').drupalSeven
import Sequelize from 'sequelize'

const govDeliveryDistrictCounty = drupalSeven.define(
  'govdelivery_district_county',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    state_code: {
      type: Sequelize.STRING
    },
    county_name: {
      type: Sequelize.STRING
    },
    district_name: {
      type: Sequelize.STRING
    },
    regional_topic: {
      type: Sequelize.STRING
    },
    district_topic: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
  }
)

module.exports.govDeliveryDistrictCounty = govDeliveryDistrictCounty
