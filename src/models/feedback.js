import { nonDrupal } from "./db-connect.js";
import * as Sequelize from "sequelize";

var feedback = nonDrupal.define("feedback", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  result: {
    type: Sequelize.BOOLEAN
  },
  timestamp: {
    type: Sequelize.BIGINT
  },
  sourceIpAddress: {
    type: Sequelize.STRING
  },
  sessionId: {
    type: Sequelize.STRING
  }

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


export default feedback;
