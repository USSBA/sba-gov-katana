import { nonDrupal } from "./db-connect.js";
import uuid from "uuid";
import * as Sequelize from "sequelize";

const lenderMatchRegistration = nonDrupal.define(
  "lenderMatchRegistration",
  {
    id: {
      //eslint-disable-line id-length
      type: Sequelize.UUID,
      defaultValue: function() {
        return uuid.v4();
      },
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    emailAddress: {
      type: Sequelize.STRING
    },
    businessName: {
      type: Sequelize.STRING
    },
    businessZip: {
      type: Sequelize.INTEGER
    },
    industry: {
      type: Sequelize.TEXT
    },
    industryExperience: {
      type: Sequelize.TEXT
    },
    loanAmount: {
      type: Sequelize.STRING
    },
    loanDescription: {
      type: Sequelize.TEXT
    },
    loanUsage: {
      type: Sequelize.STRING
    },
    businessWebsite: {
      type: Sequelize.STRING
    },
    businessDescription: {
      type: Sequelize.STRING
    },
    hasWrittenPlan: {
      type: Sequelize.BOOLEAN
    },
    hasFinancialProjections: {
      type: Sequelize.BOOLEAN
    },
    isGeneratingRevenue: {
      type: Sequelize.BOOLEAN
    },
    isVeteran: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);
export default lenderMatchRegistration;
