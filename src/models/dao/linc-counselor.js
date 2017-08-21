import { get } from "./daisho-client.js";

function fetchCounselorsByLocation(zip) {
  return get("counselors-by-location", {
    zip: zip
  });
}

export { fetchCounselorsByLocation };
