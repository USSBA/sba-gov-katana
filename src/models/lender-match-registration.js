import { nonDrupal } from "./db-connect.js";
import uuid from "uuid";
import * as Sequelize from "sequelize";

var lenderMatchRegistration = nonDrupal.define("lenderMatchRegistration", {
  id: { //eslint-disable-line id-length
    type: Sequelize.UUID,
    defaultValue: function() {
      return uuid.v4();
    },
    primaryKey: true
  },
  uniqueId: {
    type: Sequelize.STRING
  },
  loanName: {
    type: Sequelize.STRING
  },
  projectZipCd: {
    type: Sequelize.INTEGER
  },
  projectZip4Cd: {
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  primaryPhone: {
    type: Sequelize.STRING
  },
  primaryEmail: {
    type: Sequelize.STRING
  },
  currEmpQty: {
    type: Sequelize.INTEGER
  },
  businessAgeCd: {
    type: Sequelize.CHAR
  },
  grossRevenueSales: {
    type: Sequelize.DECIMAL
  },
  legalOrgnztnCd: {
    type: Sequelize.CHAR
  },
  businessDtlTypCd: {
    type: Sequelize.STRING
  },
  businessDtlTypTxt: {
    type: Sequelize.STRING
  },
  loanProceedTypCd: {
    type: Sequelize.STRING
  },
  proceedOthTypTxt: {
    type: Sequelize.STRING
  },
  requestedAmtRangeCd: {
    type: Sequelize.CHAR
  },
  collateralInd: {
    type: Sequelize.CHAR
  },
  collateralDesc: {
    type: Sequelize.STRING
  },
  businessAdvisoryInd: {
    type: Sequelize.CHAR
  },
  businessPlanInd: {
    type: Sequelize.CHAR
  },
  otherFundSourceInd: {
    type: Sequelize.CHAR
  },
  businessStatusDescTxt: {
    type: Sequelize.TEXT
  },
  veteran: {
    type: Sequelize.CHAR
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


lenderMatchRegistration.sync();

export default lenderMatchRegistration;
