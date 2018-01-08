const drupalSeven = require('./drupal-seven-db-client.js').drupalSeven
import Sequelize from 'sequelize'

const sessions = drupalSeven.define(
  'sessions',
  {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    sid: {
      type: Sequelize.STRING
    },
    ssid: {
      type: Sequelize.STRING
    },
    hostname: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.INTEGER
    },
    cache: {
      type: Sequelize.INTEGER
    },
    session: {
      type: Sequelize.BLOB
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = sessions
