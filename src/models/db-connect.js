/* eslint-disable no-empty-function */
import config from 'config'
import Sequelize from 'sequelize'

var nonDrupal;
if (config.get('developmentOptions.devMode')) {
  nonDrupal = {
    sync: () => {
      return Promise.resolve({})
    },
    define: () => {
      return {
        belongsTo: () => {},
        hasMany: () => {},
        hasOne: () => {}
      }
    },
    query: () => {
      return Promise.resolve({})
    }
  }
} else {
  nonDrupal = new Sequelize(
    config.get('database.nonDrupal.databaseName'),
    config.get('database.nonDrupal.user'),
    config.get('database.nonDrupal.password'), {
      host: config.get('database.nonDrupal.host'),
      dialect: 'mysql',
      pool: config.get('database.pool')
    }
  )
}

export {
  nonDrupal
}
