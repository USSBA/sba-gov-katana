import HttpStatus from 'http-status-codes'
import { fetchUserRoles } from '../models/dao/drupal-user.js'

function getUserRoles(req, res) {
  if (req.params) {
    fetchUserRoles(req.params.userId)
      .then(function(data) {
        res.status(HttpStatus.OK).send(JSON.stringify(data))
      })
      .catch(error => {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error retrieving user roles')
      })
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('No user id.')
  }
}

export { getUserRoles }
