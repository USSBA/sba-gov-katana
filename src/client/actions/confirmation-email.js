import axios from "axios";
import queryString from "querystring";
import config from "../services/config.js";

export function resendConfirmationEmail(emailAddress) {
  return function(dispatch) {
    axios.post(config.routes.confirmationEmail, {
      emailAddress: emailAddress
    })
      .then((response) => {
        dispatch({
          type: "RESEND_CONFIRMATION_EMAIL_SUCCESS",
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "RESEND_CONFIRMATION_EMAIL_ERROR",
          payload: error
        });
      });
  };
}
