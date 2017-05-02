import Promise from "bluebird";
import { drupal, nonDrupal } from "./db-connect.js";
import lenderMatchRegistration from "./lender-match-registration.js";
import lenderMatchSoapResponse from "./lender-match-soap-response.js";
import emailConfirmation from "./email-confirmation.js";

function init() {
  const models = [
    lenderMatchSoapResponse.sync(),
    emailConfirmation.sync()
  ];
  return Promise.each(models)
    .catch(function(error) {
      console.error(error);
    });
}

export { init };
