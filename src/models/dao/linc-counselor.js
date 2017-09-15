import { get } from "./daisho-client.js";

function fetchCounselorsByLocation(zip) {
  return get("counselors-by-location", {
    query: {
      zip
    }
  });
}

export { fetchCounselorsByLocation };
