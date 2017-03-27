var reactGa = require("react-ga");

if (window.CONFIG.googleAnalytics.enabled) {
  reactGa.initialize(window.CONFIG.googleAnalytics.accountId);
} else {
  console.log("GA in Development Mode");
}

function logPageView() {
  if (window.CONFIG.googleAnalytics.enabled) {
    reactGa.set({
      page: window.location.pathname
    });
    reactGa.pageview(window.location.pathname);
    console.log("Posting Location Change to GA:", window.location.pathname);
  }
}

/* eslint-disable callback-return */
function googleAnalyticsMiddleware({getState}) {
  return (next) => {
    return (action) => {
      if (window.CONFIG.googleAnalytics.enabled) {
        if (action.type === "@@router/LOCATION_CHANGE") {
          console.log("Posting Location Change to GA:", action.payload.pathname);
          reactGa.pageview(action.payload.pathname);
        }
      }
      return next(action);
    };
  };
}
/* eslint-enable callback-return */

export { logPageView, googleAnalyticsMiddleware };
