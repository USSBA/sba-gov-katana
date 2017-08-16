import { get } from "./daisho-client.js";

function fetchUserRoles(userId) {
  return get(userId + "/roles");
}

export { fetchUserRoles };
