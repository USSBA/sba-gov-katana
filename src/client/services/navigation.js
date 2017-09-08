import { browserHistory } from "react-router";
import { logEvent } from "../services/analytics.js";

function createCtaNavigation(targetLocation, category, action, value) {
  return createNavigation(targetLocation, {
    category: category,
    action: action,
    value: value,
    label: browserHistory.getCurrentLocation().pathname
  });
}


// eslint-disable-next-line complexity
function navigateNow(targetLocation, eventConfig) {
  if (targetLocation) {
    if (targetLocation === "/" || targetLocation.match(/\/business-guide/) || targetLocation.match(/\/funding-programs/) || targetLocation.match(/\/for-partners/)) {
      browserHistory.push(targetLocation);
      if (targetLocation.indexOf("#") === -1) { //eslint-disable-line no-magic-numbers
        window.scrollTo(0, 0);
      }
      if (eventConfig) {
        logEvent({
          category: eventConfig.category || "Navigation",
          action: eventConfig.action || "Location Change",
          label: eventConfig.label || "",
          value: eventConfig.value || null
        });
      }
    } else {
      document.location = targetLocation;
    }
  } else {
    console.log("WARNING: navigateNow passed a null target location");
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

export { createCtaNavigation, goBackNow, navigateNow, createNavigation };
