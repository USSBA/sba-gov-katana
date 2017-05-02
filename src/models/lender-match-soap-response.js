import { nonDrupal } from "./db-connect.js";
import uuid from "uuid";
import * as Sequelize from "sequelize";
import lenderMatchRegistration from "./lender-match-registration.js";

const lenderMatchSoapResponse = nonDrupal.define("lenderMatchSoapResponse", {
  id: { //eslint-disable-line id-length
    type: Sequelize.UUID,
    defaultValue: function() {
      return uuid.v4();
    },
    primaryKey: true
  },
  responseCode: {
    type: Sequelize.CHAR
  },
  errorMessageEnglish: {
    type: Sequelize.STRING
  },
  errorMessageTechnical: {
    type: Sequelize.STRING
  },
  processed: {
    type: Sequelize.BIGINT
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

lenderMatchSoapResponse.belongsTo(lenderMatchRegistration);

export default lenderMatchSoapResponse;
