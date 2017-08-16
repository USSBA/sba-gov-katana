import { get } from "./daisho-client.js";

function fetchDrupalUserEmail(userId) {
  return get(userId + "/email");
}

export { fetchDrupalUserEmail };
