import { browserHistory } from "react-router";
import { logEvent } from "../services/analytics.js";

export function locationChange(targetLocation, eventConfig) {
  return function(dispatch) {
    browserHistory.push(targetLocation);
    logEvent({
      category: "Navigation",
      action: "Location Change",
      label: eventConfig.label
    });
  // dispatch({
  //   type: "LOCATION_CHANGE",
  //   path: targetLocation
  // });
  };
}

export function goBack() {
  return function(dispatch) {
    browserHistory.goBack();
    logEvent({
      category: "Navigation",
      action: "Back Button Pushed",
      label: browserHistory.getCurrentLocation().pathname
    });
  };
}
