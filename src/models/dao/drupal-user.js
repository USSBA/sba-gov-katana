import daishoClient from "./daisho-client.js";

function fetchDrupalUserEmail(userId) {
  return daishoClient.get(userId + "/email");
}

export { fetchDrupalUserEmail };
