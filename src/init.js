import mongodb from "./models/mongodb.js";
import * as cron from "./util/cron.js";
function init() {
  return Promise.all([mongodb.init(), cron.init()]);
}
export default init;
