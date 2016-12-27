//remove this when breaking server.js up into controllers -zandypants
import zlib from "zlib";

/*Contains express server setup*/
import express from "express";
import config from "config";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";

const app = express();

//set up template engine
app.set("view engine", "pug");
app.set("views", "./src/views");


//var urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static("./public"));


if (config.get("developmentOptions.webpack.enabled")) {
  const webpack = require("webpack"); // eslint-disable-line global-require
  const webpackConfig = require("../webpack.config"); // eslint-disable-line global-require
  const compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, { // eslint-disable-line global-require
    publicPath: webpackConfig.output.publicPath,
    noInfo: config.get("developmentOptions.webpack.silent")
  }));

  app.use(require("webpack-hot-middleware")(compiler)); // eslint-disable-line global-require
}


import * as matchController from "./controllers/match-controller.js";
app.post("/matchFormData", jsonParser, matchController.handleLenderMatchSubmission);
app.get("/linc/confirmEmail", matchController.handleEmailConfirmation);


app.post("/matchLocalAssistants", jsonParser, function(req, res) {
  const zipStr = "zip:" + req.body.zipcode + ":distance:50";
  zlib.deflate(zipStr, function(err, buffer) {
    if (err) {
      throw new Error(err);
    }
    const url = "https://www.sba.gov/tools/local-assistance/map/filter/";
    const encodedUrl = url + buffer.toString("hex");
    res.send({
      redirectTo: encodedUrl
    });
  });
});


app.get("/matchCounselors", jsonParser, function(req, res) {
  console.log(req.body.zipcode);
  res.status(HttpStatus.NO_CONTENT).send();
});

app.get("*", function(req, res) {
  res.render("main");
});

// development error handler
// will print stacktrace
if (config.get("developmentOptions.webpack.enabled")) {
  app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
    console.log(arguments);
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


  });

} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
    if (req.xhr) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "Something went wrong! Oh no!"
      });
    } else {
      res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
      res.render("error", {
        message: err.message,
        error: {}
      });
    }
  });
}


//listen to port
const port = config.get("server.port");
app.listen(port);
console.log("Express server listening on port " + port);
