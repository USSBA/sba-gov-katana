import { executeDrupalQuery } from "../drupal-db.js";
import mysql from "mysql";

function fetchUserRoles(userId) {
  const sqlQuery = mysql.format("select role.name as userRole from users inner join users_roles on users.uid = users_roles.uid inner join role on users_roles.rid = role.rid where (role.name in ('administrator','Author', 'Blog Administrator', 'Blog Author', 'Blog Moderator', 'Drupal Help Desk', 'Event Author', 'Event Moderator', 'Guest Blogger', 'Moderator', 'RPT User')) && users.uid = ?;", userId);
  return executeDrupalQuery(sqlQuery);
}

export { fetchUserRoles };