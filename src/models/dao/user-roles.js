import daishoClient from "./daisho-client.js";

function fetchUserRoles(userId) {
  return daishoClient.get(userId + "/roles");
}

export { fetchUserRoles };
