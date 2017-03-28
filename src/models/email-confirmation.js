import { nonDrupal } from "./db-connect.js";
import { lenderMatchRegistration, lenderMatchSoapResponse } from "./lender-match-registration.js";
import * as Sequelize from "sequelize";

var emailConfirmation = nonDrupal.define("emailConfirmation", {
  sent: {
    type: Sequelize.BIGINT
  },
  sentFollowup: {
    type: Sequelize.BIGINT
  },
  token: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  confirmed: {
    type: Sequelize.BIGINT
  }

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

emailConfirmation.belongsTo(lenderMatchRegistration);

emailConfirmation.sync();

export default emailConfirmation;
