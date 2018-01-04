/* eslint-disable no-empty-function */
import Sequelize from 'sequelize'
const config = require('config')


var drupalSeven;
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
    config.get('database.drupalSeven.databaseName'),
    config.get('database.drupalSeven.user'),
    config.get('database.drupalSeven.password'), {
      host: config.get('database.drupalSeven.host'),
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
