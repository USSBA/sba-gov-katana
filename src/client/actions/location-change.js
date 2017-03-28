import { browserHistory } from "react-router";
import { logEvent } from "../services/analytics.js";

export function locationChange(targetLocation, eventConfig) {
  return function(dispatch) {
    browserHistory.push(targetLocation);
    logEvent({
      category: "Navigation",
      action: eventConfig.action || "Location Change",
      label: eventConfig.label || ""
    });
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
