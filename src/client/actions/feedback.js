import axios from "axios";
import types from "./types.js";
import constants from "../services/constants.js";

export function submitResults(results) {
  return function(dispatch) {
    axios.post(constants.routes.submitFeedbackResults, {
      result: results
    })
      .then((response) => {
        dispatch({
          type: types.feedback.submitResults,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: types.feedback.submitResults,
          payload: error
        });
      });
  };
}

export function submitText(id, text) {
  return function(dispatch) {
    axios.put(constants.routes.submitFeedbackText.replace("{id}", id), {
      text
    })
      .then((response) => {
        dispatch({
          type: types.feedback.submitText,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: types.feedback.submitText,
          payload: error
        });
      });
  };
}
