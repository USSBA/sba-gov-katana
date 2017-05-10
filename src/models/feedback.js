import { nonDrupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

var feedback = nonDrupal.define("feedback", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  result: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timestamp: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  sourceIpAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sessionId: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  },
  sourceLocation: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


export default feedback;
