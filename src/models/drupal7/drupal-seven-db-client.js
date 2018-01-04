import Sequelize from 'sequelize'
const config = require('config')
var drupalSeven = new Sequelize(
  config.get('database.drupalSeven.databaseName'),
  config.get('database.drupalSeven.user'),
  config.get('database.drupalSeven.password'),
  {
    host: config.get('database.drupalSeven.host'),
    dialect: 'mysql',
    pool: config.get('database.pool')
  }
)

function executeDrupalSevenQuery(query) {
  return drupalSeven.query(query, {
    type: Sequelize.QueryTypes.SELECT
  })
}

module.exports.executeDrupalSevenQuery = executeDrupalSevenQuery
module.exports.drupalSeven = drupalSeven
