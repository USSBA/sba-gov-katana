var CronJob = require("cron").CronJob; // eslint-disable-line id-match
import config from "config";

import { followupEmailJob, sendDataToOcaJob } from "../service/linc-service.js";
import { sendPasswordUpdateRequest } from "../service/oca-service.js";

function init() {
  /* eslint-disable no-new, id-match */
  if (config.get("linc.resendEmailJobEnabled")) {
    console.log("Starting resendConfirmationEmail job");
    new CronJob(config.get("linc.resendEmailCron"), followupEmailJob, null, true, "America/New_York");
  }
  if (config.get("linc.sendToOcaJobEnabled")) {
    console.log("Starting sending failed or pending messages to OCA");
    new CronJob(config.get("linc.ocaSoapCron"), sendDataToOcaJob, null, true, "America/New_York");
  }
  if (config.get("linc.sendToLincPasswordUpdateEnabled")) {
    console.log("Starting sending password update messages to OCA");
    new CronJob(config.get("linc.ocaPasswordUpdateCron"), sendPasswordUpdateRequest, null, true, "America/New_York");
  }
/* eslint-enable no-new, id-match */
}

export { init };
