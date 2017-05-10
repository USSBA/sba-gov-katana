import _ from "lodash";
import { fetchUserRoles } from "../models/dao/user-roles.js";
import Sessions from "../models/drupal-session.js";


function isAdministrator(sessionId) {
  return Sessions.findOne({
    where: {
      ssid: sessionId
    }
  })
    .then((result) => {
      if (result) {
        return result.uid;
      }
      return false;

    })
    .then(fetchUserRoles)
    .then((rolesObjects) => {
      return _.map(rolesObjects, "userRole");
    })
    .then((roles) => {
      if (_.includes(roles, "administrator")) {
        return true;
      }
      return false;

    });
}


export default {
  isAdministrator
};
