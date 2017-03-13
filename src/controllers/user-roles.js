import HttpStatus from "http-status-codes";
import { fetchUserRoles } from "../models/dao/user_roles.js";

function getUserRoles(req, res) {
  //get from user id from cookies
  console.log(req.cookies.DRUPAL_UID);
  const userId = req.cookies.DRUPAL_UID;
  if (userId !== null) {
    fetchUserRoles(userId)
      .then(function(data) {
        res.status(HttpStatus.OK).send(JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        res.status(error.response.status).send("Error retrieving user roles");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("No user id.");
  }
}

export { getUserRoles };