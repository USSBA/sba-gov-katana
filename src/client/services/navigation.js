import { browserHistory } from "react-router";
import { logEvent } from "../services/analytics.js";

function callToAction(targetLocation, category, action, value) {
  navigate(targetLocation, {
    category: category,
    action: action,
    value: value,
    label: window.location.pathname
  });
// logEvent({
//   category: category,
//   action: action,
//   label: window.location.pathname,
//   value: value
// });
// // browserHistory.push(targetLocation);
// document.location = targetLocation;
}


function navigate(targetLocation, eventConfig) {
  if(targetLocation){
    browserHistory.push(targetLocation);
  } else {
    console.log(`WARNING: navigate passed a null target location`);
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

function navigateOnClick(targetLocation, eventConfig){
  return () => {
    navigate(targetLocation, eventConfig);
  }
}

function goBack() {
  browserHistory.goBack();
  logEvent({
    category: "Navigation",
    action: "Back Button Pushed",
    label: browserHistory.getCurrentLocation().pathname
  });
}

export { callToAction, goBack, navigate, navigateOnClick };