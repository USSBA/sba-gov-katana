import mongodb from "./models/mongodb.js";
function init() {
  return mongodb.init();
}
export default init;
