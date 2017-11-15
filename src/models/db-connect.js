import config from 'config'
import Sequelize from 'sequelize'

var nonDrupal = new Sequelize(
  config.get('database.nonDrupal.databaseName'),
  config.get('database.nonDrupal.user'),
  config.get('database.nonDrupal.password'),
  {
    host: config.get('database.nonDrupal.host'),
    dialect: 'mysql',
    pool: config.get('database.pool')
  }
)

export { nonDrupal }
