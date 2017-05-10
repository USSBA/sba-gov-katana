import { drupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

const sessions = drupal.define("sessions", {
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
}, {
  freezeTableName: true,
  timestamps: false
});

export default sessions;
