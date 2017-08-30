import { browserHistory } from "react-router";
import { logEvent } from "../services/analytics.js";

function callToAction(targetLocation, category, action, value) {
  navigateNow(targetLocation, {
    category: category,
    action: action,
    value: value,
    label: window.location.pathname
  });
}


// eslint-disable-next-line complexity
function navigateNow(targetLocation, eventConfig) {
  if (targetLocation) {
    browserHistory.push(targetLocation);
  } else {
    console.log("WARNING: navigateNow passed a null target location");
  }

  //TODO: Unsure of this;  what happens with anchor tags?
  window.scrollTo(0, 0);
  if (eventConfig) {
    logEvent({
      category: eventConfig.category || "Navigation",
      action: eventConfig.action || "Location Change",
      label: eventConfig.label || "",
      value: eventConfig.value || null
    });
  }
}

function createNavigation(targetLocation, eventConfig) {
  return () => {
    navigateNow(targetLocation, eventConfig);
  };
}

function goBackNow() {
  browserHistory.goBack();
  logEvent({
    category: "Navigation",
    action: "Back Button Pushed",
    label: browserHistory.getCurrentLocation().pathname
  });
}

export { callToAction, goBackNow, navigateNow, createNavigation };