const _ = require('lodash')
const drupalUserDao = require('../models/dao/drupal-user.js')
const sessionModel = require('../models/drupal7/drupal-session.js')

function isAdministrator(sessionId) {
  return sessionModel
    .findOne({
      where: {
        ssid: sessionId
      }
    })
    .then(result => {
      if (result) {
        return result.uid
      }
      return 0
    })
    .then(drupalUserDao.fetchUserRoles)
    .then(rolesObjects => {
      return _.map(rolesObjects, 'userRole')
    })
    .then(roles => {
      if (_.includes(roles, 'administrator')) {
        return true
      }
      return false
    })
}

export { isAdministrator }
