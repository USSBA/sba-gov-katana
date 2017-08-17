import { get } from "./daisho-client.js";

function fetchCounselorsByLocation(userId) {
  return get("counselors-by-location");
}

export { fetchCounselorsByLocation };
