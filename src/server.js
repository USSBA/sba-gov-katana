//remove this when breaking server.js up into controllers -zandypants
import zlib from "zlib";
import path from "path";
import _ from "lodash";
/*Contains express server setup*/
import express from "express";
import config from "config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import HttpStatus from "http-status-codes";
import {
  enableWebpackHotModuleReplacement,
  addDevelopmentErrorHandler
} from "./util/dev.js";

const app = express();
app.use(cookieParser());
//set up template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views/"));

//var urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
app.use(jsonParser);
//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static("public"));

if (config.get("developmentOptions.webpack.enabled")) {
  enableWebpackHotModuleReplacement(app, config.get("developmentOptions.webpack.silent"));
}

if (config.get("newrelic.enabled")) {
  console.log("Starting NewRelic");
  require("newrelic"); // eslint-disable-line global-require
}

const metaVariables = {
  description: "We support America's small businesses. The SBA connects entrepreneurs with lenders and funding to help them plan, start and grow their business.",
  title: "Small Business Administration"
};

app.use(function(req, res, next) {
  const sessionCookie = _.find(_.keys(req.cookies), (key) => {
    return _.startsWith(key, "SSESS");
  });
  console.log("Session cookie: ", sessionCookie);
  let hasSessionCookie = false;
  if (sessionCookie) {
    hasSessionCookie = true;
    if (req.cookies) {
      req.sessionInfo = req.cookies[sessionCookie]; //eslint-disable-line no-param-reassign
      console.log("Session info: ", req.sessionInfo);
    }
  }
  const clientConfig = {
    isUserLoggedIn: hasSessionCookie || false,
    googleAnalytics: config.get("googleAnalytics"),
    debug: config.get("developmentOptions.client.logging"),
    govdelivery: config.get("govdelivery.popupEnabled")
  };
  req.sessionAndConfig = clientConfig; //eslint-disable-line no-param-reassign
  next();
});

app.use(function(req, res, next) {
  console.log("Received request for " + req.originalUrl);
  next();
});



import * as lenderMatchController from "./controllers/lender-match-controller.js";
app.post("/linc/matchFormData", jsonParser, lenderMatchController.handleLenderMatchSubmission);
app.get("/actions/lendermatch/confirmEmail", lenderMatchController.handleEmailConfirmation);
app.post("/linc/resend", jsonParser, lenderMatchController.handleResendEmailConfirmation);
app.get("/content/counselors-redirect.json", function(req, res) {
  const zipStr = "zip:" + req.query.zip + ":distance:50";
  zlib.deflate(zipStr, function(err, buffer) {
    if (err) {
      throw new Error(err);
    }
    const url = "/tools/local-assistance/map/filter/";
    const encodedUrl = url + buffer.toString("hex");
    res.send({
      redirectTo: encodedUrl
    });
  });
});

import * as feedbackController from "./controllers/feedback-controller.js";
import * as cacheController from "./controllers/cache.js"
app.post("/actions/feedback", feedbackController.handleFeedback);
app.put("/actions/feedback/:id/text", jsonParser, feedbackController.handleFeedbackText);
app.get("/actions/clearCache", cacheController.clearCache);
app.get("/content/feedback.csv", feedbackController.retrieveFeedback);

import * as lincCounselorController from "./controllers/linc-counselor.js";
app.get("/content/counselors-by-location.json", lincCounselorController.getCounselorsByLocation);


import {
  getUserRoles
} from "./controllers/user-roles.js";
app.get("/content/:userId/roles.json", getUserRoles);

import {
  getDrupalUserEmail
} from "./controllers/user-email.js";
app.get("/content/:userId/email.json", getDrupalUserEmail);

import {
  registerUserForNewsletter
} from "./controllers/newsletter-registration.js";
app.get("/content/newsletter-registration.json", registerUserForNewsletter);

import {
  fetchContentById,
  fetchContentByType
} from "./controllers/content.js";
app.get("/content/:type/:id.json", fetchContentById);
app.get("/content/:type.json", fetchContentByType);

app.get(["/", "/*"], function(req, res, next) {
  const pugVariables = _.merge({}, metaVariables, {
    config: JSON.stringify(req.sessionAndConfig),
    tagManagerAccountId: config.get("googleAnalytics.tagManagerAccountId")
  });
  res.render("main", pugVariables);
});

// development error handler
// will print stacktrace
if (config.get("developmentOptions.webpack.enabled")) {
  addDevelopmentErrorHandler(app);
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
