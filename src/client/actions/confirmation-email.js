import axios from "axios";
import queryString from "querystring";

export function resendConfirmationEmail(emailAddress) {
  return function(dispatch) {
    axios.post("/linc/resend", {
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
