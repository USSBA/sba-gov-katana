import daishoClient from "../models/dao/daisho-client.js";

function fetchBlogsFromDrupal() {
  return daishoClient.get("blogs");
}


function fetchFrontPageSlidesFromDrupal() {
  return daishoClient.get("frontpageslides");
}


export { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal };
