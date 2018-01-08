/* eslint-disable camelcase */
const drupalSeven = require('./drupal-seven-db-client.js').drupalSeven
import Sequelize from 'sequelize'

const govDeliveryCountyZip = drupalSeven.define(
  'govdelivery_county_zip',
  {
    zip_code: {
      type: Sequelize.INTEGER
    },
    county_code: {
      type: Sequelize.INTEGER
    },
    county_name: {
      type: Sequelize.STRING
    },
    state_code: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
  }
)

govDeliveryCountyZip.removeAttribute('id')

module.exports.govDeliveryCountyZip = govDeliveryCountyZip
