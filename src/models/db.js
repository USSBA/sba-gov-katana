import Promise from "bluebird";
import { nonDrupal } from "./db-connect.js";

import lenderMatchRegistration from "./lender-match-registration.js";
import lenderMatchSoapResponse from "./lender-match-soap-response.js";
import emailConfirmation from "./email-confirmation.js";
import feedback from "./feedback.js";

function init() {
  return nonDrupal
    .sync()
    .then(() => {
      console.log("Database sync complete");
    })
    .catch(function(error) {
      console.error(error);
    });
}

export { init };
