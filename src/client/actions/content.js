export function fetchHappeningNow() {
  return {
    type: "FETCH_DATA",
    data: "content/node.json?type=slideshow_element&limit=4&sort=changed&direction=DESC",
  };
}
