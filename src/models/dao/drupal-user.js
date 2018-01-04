import config from 'config'
const mysql = require('mysql2')
const executeDrupalSevenQuery = require('../drupal7/drupal-seven-db-client.js').executeDrupalSevenQuery
const users = require('../drupal7/drupal-users')

function findDrupalUser(userId) {
  return users.findOne({
    where: {
      uid: {
        $eq: userId
      }
    }
  })
}

function fetchDrupalUserEmail(userId) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve("test@sba.gov")
  } else {
    return findDrupalUser(userId).then(function(user) {
      return user.mail
    })
  }
}

function fetchUserRoles(userId) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve([{
      "userRole": "administrator"
    }, {
      "userRole": "RPT User"
    }])
  } else {
    const sqlQuery = mysql.format(
      "select role.name as userRole from users inner join users_roles on users.uid = users_roles.uid inner join role on users_roles.rid = role.rid where (role.name in ('administrator','Author', 'Blog Administrator', 'Blog Author', 'Blog Moderator', 'Drupal Help Desk', 'Event Author', 'Event Moderator', 'Guest Blogger', 'Moderator', 'RPT User')) && users.uid = ?;",
      userId
    )
    return executeDrupalSevenQuery(sqlQuery)
  }
}

module.exports.fetchUserRoles = fetchUserRoles
module.exports.fetchDrupalUserEmail = fetchDrupalUserEmail
