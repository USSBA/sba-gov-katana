/* eslint-disable id-length */
import { nonDrupal } from './db-connect.js'
import * as Sequelize from 'sequelize'

var resourceCenterProfile = nonDrupal.define(
  'resourceCenterProfile',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    timestamp: {
      type: Sequelize.BIGINT
    },
    sourceIpAddress: {
      type: Sequelize.STRING
    },
    businessStage: {
      type: Sequelize.STRING
    },
    serviceArea: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    needsUpdating: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
)

var resourceCenterLanguages = nonDrupal.define(
  'resourceCenterLanguages',
  {
    language: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
)

var resourceCenterHours = nonDrupal.define(
  'resourceCenterHours',
  {
    mondayOpen: {
      type: Sequelize.STRING
    },
    mondayClose: {
      type: Sequelize.STRING
    },
    tuesdayOpen: {
      type: Sequelize.STRING
    },
    tuesdayClose: {
      type: Sequelize.STRING
    },
    wednesdayOpen: {
      type: Sequelize.STRING
    },
    wednesdayClose: {
      type: Sequelize.STRING
    },
    thursdayOpen: {
      type: Sequelize.STRING
    },
    thursdayClose: {
      type: Sequelize.STRING
    },
    fridayOpen: {
      type: Sequelize.STRING
    },
    fridayClose: {
      type: Sequelize.STRING
    },
    saturdayOpen: {
      type: Sequelize.STRING
    },
    saturdayClose: {
      type: Sequelize.STRING
    },
    sundayOpen: {
      type: Sequelize.STRING
    },
    sundayClose: {
      type: Sequelize.STRING
    },
    furtherDescription: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
)

var resourceCenterServices = nonDrupal.define(
  'resourceCenterServices',
  {
    service: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
)

var resourceCenterExpertise = nonDrupal.define(
  'resourceCenterExpertise',
  {
    expertise: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
)

resourceCenterProfile.hasOne(resourceCenterHours, {
  as: 'hours'
})
const expertise = resourceCenterProfile.hasMany(resourceCenterExpertise, {
  as: 'expertise'
})
const services = resourceCenterProfile.hasMany(resourceCenterServices, {
  as: 'services'
})
const languages = resourceCenterProfile.hasMany(resourceCenterLanguages, {
  as: 'languages'
})

export { resourceCenterProfile, services, expertise, languages, resourceCenterHours }
