import { fetchDescription, fetchVisibility } from "../models/dao/disaster.js";
import Promise from "bluebird";

function fetchDisasterFromDrupalDatabase() {
  return Promise.all([fetchDescription(), fetchVisibility()])
    .spread((description, visibility) => {
      return {
        description: description,
        visible: visible
      };
    });
}
export { fetchDisasterFromDrupalDatabase };
