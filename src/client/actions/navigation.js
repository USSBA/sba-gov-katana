import { browserHistory } from "react-router";
import { logEvent } from "../services/analytics.js";
import types from "./types.js";

export function callToAction(targetLocation, category, action, value) {
  return function(dispatch) {
    logEvent({
      category: category,
      action: action,
      label: window.location.pathname,
      value: value
    });
    // browserHistory.push(targetLocation);
    document.location = targetLocation;
  };
}


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
