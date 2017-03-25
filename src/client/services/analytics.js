var reactGa = require("react-ga");
reactGa.initialize(window.googleAnalyticsId);

function logPageView() {
  reactGa.set({
    page: window.location.pathname
  });
  reactGa.pageview(window.location.pathname);
}

/* eslint-disable  callback-return */
function googleAnalyticsMiddleware({getState}) {
  return (next) => {
    return (action) => {
      if (action.type === "@@router/LOCATION_CHANGE") {
        console.info(`Route Changed: ${action.payload.pathname}`);
        reactGa.pageview(action.payload.pathname);
      }
      return next(action);
    };
  };
}
/* eslint-enable  callback-return */

export { logPageView, googleAnalyticsMiddleware };
