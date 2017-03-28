import Promise from "bluebird";
import { drupal, nonDrupal } from "./db-connect.js";
import emailConfirmation from "./email-confirmation.js";
import { lenderMatchRegistration } from "./lender-match-registration.js";

function init() {
  return Promise.all([emailConfirmation.sync(), lenderMatchRegistration.sync()]);
}

export { init };
