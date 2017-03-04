import { nonDrupal } from "./db-connect.js";
import LenderMatchRegistration from "./lender-match-registration.js";
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
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

emailConfirmation.belongsTo(LenderMatchRegistration);

emailConfirmation.sync();

export default emailConfirmation;
