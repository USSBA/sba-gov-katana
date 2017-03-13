import { executeQuery } from "../drupal-db.js";
import mysql from "mysql";

function fetchUserRoles(userId) {
  const sqlQuery = mysql.format("select role.name as userRole from users inner join users_roles on users.uid = users_roles.uid inner join role on users_roles.rid = role.rid where users.uid = ?;", userId);
  return executeQuery(sqlQuery);
}

export { fetchUserRoles };