import daishoClient from "./daisho-client.js";

function fetchDisasterFromDrupalDatabase() {
  return daishoClient.get("disaster");
}

export { fetchDisasterFromDrupalDatabase };
