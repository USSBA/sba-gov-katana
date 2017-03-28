var reactGa = require("react-ga");


function isEnabled() {
  return window.CONFIG.googleAnalytics.enabled;
}

if (isEnabled()) {
  reactGa.initialize(window.CONFIG.googleAnalytics.accountId);
} else {
  console.log("GA in Development Mode");
}

function logPageView() {
  if (isEnabled()) {
    reactGa.set({
      page: window.location.pathname
    });
    reactGa.pageview(window.location.pathname);
    console.log("Posting Location Change to GA:", window.location.pathname);
  }
}

function logEvent(eventToLog) {
  if (isEnabled()) {
    console.log("Posting Event to GA:", eventToLog);
    reactGa.event(eventToLog);
  }
}

/* eslint-disable callback-return */
function googleAnalyticsMiddleware({getState}) {
  return (next) => {
    return (action) => {
      if (isEnabled()) {
        if (action.type === "@@router/LOCATION_CHANGE") {
          logEvent({
            category: "Navigation",
            action: "Changed Location",
            label: action.payload.pathname
          });
        }
      }
      return next(action);
    };
  };
}
/* eslint-enable callback-return */

export { logPageView, googleAnalyticsMiddleware, logEvent };
