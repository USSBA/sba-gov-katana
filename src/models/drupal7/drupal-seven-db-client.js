/* eslint-disable no-empty-function */
import Sequelize from 'sequelize'
const config = require('config')

var drupalSeven
if (config.get('developmentOptions.devMode')) {
  drupalSeven = {
    define: () => {
      return {
        removeAttribute: () => {}
      }
    },
    query: () => {
      return Promise.resolve({})
    }
  }
} else {
  drupalSeven = new Sequelize(
    config.get('database.drupal.databaseName'),
    config.get('database.drupal.user'),
    config.get('database.drupal.password'),
    {
      host: config.get('database.drupal.host'),
      dialect: 'mysql',
      pool: config.get('database.pool')
    }
  )
}

function executeDrupalSevenQuery(query) {
  return drupalSeven.query(query, {
    type: Sequelize.QueryTypes.SELECT
  })
}

module.exports.executeDrupalSevenQuery = executeDrupalSevenQuery
module.exports.drupalSeven = drupalSeven
