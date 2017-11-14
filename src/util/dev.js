import HttpStatus from "http-status-codes";

export function enableWebpackHotModuleReplacement(app, silent) {
  console.log("Enabling Webpack");
  const webpack = require("webpack"); // eslint-disable-line global-require
  const webpackConfig = require("../../webpack.config.development")(); // eslint-disable-line global-require
  const compiler = webpack(webpackConfig);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      // eslint-disable-line global-require
      publicPath: webpackConfig.output.publicPath,
      noInfo: silent
    })
  );

  app.use(require("webpack-hot-middleware")(compiler)); // eslint-disable-line global-require
}

export function addDevelopmentErrorHandler(app) {
  app.use(function(err, req, res, next) {
    // eslint-disable-line no-unused-vars
    if (err) {
      console.log(err);
      if (req.xhr) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          error: "Something went wrong! Oh no!"
        });
      } else {
        res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        res.render("error", {
          message: err.message,
          error: err
        });
      }
    }
  });
}
