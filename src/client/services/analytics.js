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
      console.log("will dispatch", action);

      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action);

      console.log("state after dispatch", getState());

      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue;
    };
  };
}
/* eslint-enable  callback-return */

export { logPageView, googleAnalyticsMiddleware };
