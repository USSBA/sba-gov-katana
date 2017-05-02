import { nonDrupal } from "./db-connect.js";
import uuid from "uuid";
import * as Sequelize from "sequelize";
import lenderMatchRegistration from "./lender-match-registration.js";

const emailConfirmation = nonDrupal.define("emailConfirmation", {
  id: { //eslint-disable-line id-length
    type: Sequelize.UUID,
    defaultValue: function() {
      return uuid.v4();
    },
    primaryKey: true
  },
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

export default emailConfirmation;
