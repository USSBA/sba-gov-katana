import { get } from "./daisho-client.js";

function fetchDisasterFromDrupalDatabase() {
  return get("disaster");
}

export { fetchDisasterFromDrupalDatabase };
