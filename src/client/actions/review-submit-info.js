import axios from "axios";
import { browserHistory } from "react-router";
export function matchFormData(reviewSubmitInfoData) {
  return function(dispatch) {
    dispatch({
      type: "MATCH_FORM_DATA_START"
    });
    axios.post("matchFormData", reviewSubmitInfoData)
      .then((response) => {
        dispatch({
          type: "MATCH_FORM_DATA_SUCCESS",
          payload: response.data
        });
        browserHistory.push("/linc/success");
      })
      .catch((error) => {
        dispatch({
          type: "MATCH_FORM_DATA_ERROR",
          payload: error
        });
      });
  };
}
