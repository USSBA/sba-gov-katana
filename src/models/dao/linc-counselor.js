import daishoClient from "./daisho-client.js";

function fetchCounselorsByLocation(userId) {
  return daishoClient.get("counselors-by-location");
}

export { fetchCounselorsByLocation };
