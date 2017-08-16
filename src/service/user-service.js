import daishoClient from "../models/dao/daisho-client.js";

function isAdministrator(sessionId) {
  return daishoClient.get(sessionId + "/admin");
}

export { isAdministrator };
