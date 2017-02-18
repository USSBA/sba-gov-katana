//remove this when breaking server.js up into controllers -zandypants
import zlib from "zlib";
import path from "path";
/*Contains express server setup*/
import express from "express";
import config from "config";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";

const app = express();

//set up template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views/"));


//var urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static("public"));

if (config.get("developmentOptions.webpack.enabled")) {
  console.log("Enabling Webpack");
  const webpack = require("webpack"); // eslint-disable-line global-require
  const webpackConfig = require("../webpack.config"); // eslint-disable-line global-require
  const compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, { // eslint-disable-line global-require
    publicPath: webpackConfig.output.publicPath,
    noInfo: config.get("developmentOptions.webpack.silent")
  }));

  app.use(require("webpack-hot-middleware")(compiler)); // eslint-disable-line global-require
} else {
  require("newrelic"); // eslint-disable-line global-require
}

app.get("/", function(req, res) {
  res.render("main");
});

import * as matchController from "./controllers/match-controller.js";
app.post("/linc/matchFormData", jsonParser, matchController.handleLenderMatchSubmission);
app.get("/linc/confirmEmail", matchController.handleEmailConfirmation);
app.post("/linc/matchLocalAssistants", jsonParser, function(req, res) {
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
app.get("/linc/matchCounselors", jsonParser, function(req, res) {
  console.log("zip = " + req.body.zipcode);
  res.status(HttpStatus.NO_CONTENT).send();
});

import { fetchContent, fetchContentById, fetchFrontPageSlides, fetchBlogs } from "./controllers/content.js";
if (config.get("drupal.enablePassThrough")) {
  app.get("/content/:type.json", fetchContent);
  app.get("/content/:type/:id.json", fetchContentById);
}
app.get("/content/frontpageslides.json", function(req, res) {
  res.json([{
    "imageAlt": "Find a mentor to help you start or grow a business",
    "url": "https://www.sba.gov/tools/local-assistance",
    "title": "Find a Small Business Counselor",
    "image": "https://www.sba.gov/sites/default/files/slideshow-images/National_Mentoring_Month_Herobox_500x500_0.jpg"
  }, {
    "imageAlt": "10 Steps to starting a business",
    "url": "https://www.sba.gov/starting-business/how-start-business/10-steps-starting-business",
    "title": "10 Steps to Starting a Business",
    "image": "https://www.sba.gov/sites/default/files/slideshow-images/National_Entrepreneurship_Week_Homepage_1000x1000.jpg"
  }, {
    "imageAlt": "Do I qualify for government contracts?",
    "url": "https://www.sba.gov/contracting/getting-started-contractor/qualifying-small-business",
    "title": "Do I qualify for government contracts?",
    "image": "https://www.sba.gov/sites/default/files/slideshow-images/Government_Contracting_Herobox_800x800.jpg"
  }, {
    "imageAlt": "Top Ten Cybersecurity Tips",
    "url": "https://www.sba.gov/managing-business/cybersecurity/top-ten-cybersecurity-tips",
    "title": "Top Ten Cybersecurity Tips",
    "image": "https://www.sba.gov/sites/default/files/slideshow-images/Data_Privacy_Day_Homepage_900x900.jpg"
  }]);
});
app.get("/content/blogs.json", function(req, res) {
  res.json([{
    "nodeId": "1555784",
    "url": "/blogs/6-tools-every-small-business-owner-needs-succeed-2017",
    "date": "1484243703",
    "author": "949794",
    "userId": "bridgetwpollack",
    "name": "Bridget Weston Pollack",
    "title": "6 Tools Every Small Business Owner Needs to Succeed in 2017"
  }, {
    "nodeId": "1556390",
    "url": "/blogs/using-technology-work-smarter-not-harder-twitter-chat-sbachat",
    "date": "1483732164",
    "author": "187",
    "userId": "Stephen Morris",
    "name": "Stephen Morris",
    "title": "Using Technology to Work Smarter (Not Harder) Twitter Chat | #SBAchat"
  }]);
});

app.get(["/", "/linc/*"], function(req, res) {
  res.render("main");
});

// development error handler
// will print stacktrace
if (config.get("developmentOptions.webpack.enabled")) {
  app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
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

} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
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
          error: {}
        });
      }
    }
  });
}


//listen to port
const port = config.get("server.port");
app.listen(port);
console.log("Express server listening on port " + port);
