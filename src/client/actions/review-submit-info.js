import axios from "axios";
import { browserHistory } from "react-router";
export function matchFormData(reviewSubmitInfoData) {
  return function(dispatch) {
    dispatch({
      type: "MATCH_FORM_DATA_START"
    });
    console.log("Match Form Data being sent to the server.");
    axios.post("linc/matchFormData", reviewSubmitInfoData)
      .then((response) => {
        dispatch({
          type: "MATCH_FORM_DATA_SUCCESS",
          payload: response.data
        });
        browserHistory.push("/success");
        console.log("SUCCESS: " + response.data);
      })
      .catch((error) => {
        dispatch({
          type: "MATCH_FORM_DATA_ERROR",
          payload: error
        });
        console.log("ERROR: " + error);
      });
  };
}
