/* eslint-disable camelcase */
const drupalSeven = require('./drupal-seven-db-client.js').drupalSeven
import Sequelize from 'sequelize'

const users = drupalSeven.define(
  'users',
  {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    pass: {
      type: Sequelize.STRING
    },
    mail: {
      type: Sequelize.STRING
    },
    theme: {
      type: Sequelize.STRING
    },
    signature: {
      type: Sequelize.INTEGER
    },
    signature_format: {
      type: Sequelize.TEXT
    },
    created: {
      type: Sequelize.INTEGER
    },
    access: {
      type: Sequelize.INTEGER
    },
    login: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    timezone: {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.INTEGER
    },
    init: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.BLOB
    },
    uuid: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
  }
)

module.exports = users
