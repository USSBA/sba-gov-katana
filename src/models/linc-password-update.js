import { nonDrupal } from "./db-connect.js";
import uuid from "uuid";
import * as Sequelize from "sequelize";

const lincPasswordUpdate = nonDrupal.define("lincPasswordUpdate", {
  id: { //eslint-disable-line id-length
    type: Sequelize.UUID,
    defaultValue: function() {
      return uuid.v4();
    },
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  expiry: {
    type: Sequelize.BIGINT
  },
  schedule: {
    type: Sequelize.INTEGER
  },
  encrypted: {
    type: Sequelize.BOOLEAN
  }

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


export default lincPasswordUpdate;
