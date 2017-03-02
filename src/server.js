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

const metaVariables = {
  description: "We support America's small businesses. The SBA connects entrepreneurs with lenders and funding to help them plan, start and grow their business.",
  title: "Small Business Administration"
};

app.get("/", function(req, res) {
  res.render("main", metaVariables);
});

import * as lenderMatchController from "./controllers/lender-match-controller.js";
app.get(["/linc", "/linc/", "/linc/*"], function(req, res) {
  res.render("main", metaVariables);
});
app.post("/linc/matchFormData", jsonParser, lenderMatchController.handleLenderMatchSubmission);
app.get("/linc/confirmEmail", lenderMatchController.handleEmailConfirmation);
app.post("/linc/resend", jsonParser, lenderMatchController.handleResendEmailConfirmation);
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

// import { executeQuery } from "./models/drupal-db.js";
// app.get("/linc/matchCounselorsTest", function(req, res) {
//   console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////");
//   executeQuery("SELECT node.title AS node_title, node.nid AS nid, location.city AS location_city, location.street AS location_address, location.postal_code AS location_zipcode, field_data_field_partner_website.field_partner_website_url AS website, location_phone.phone AS phone, (COALESCE(ACOS(0.77710412277735*COS(RADIANS(location.latitude))*(0.21981811088358*COS(RADIANS(location.longitude)) + -0.97554087465753*SIN(RADIANS(location.longitude))) + 0.62937205400497*SIN(RADIANS(location.latitude))), 0.00000)*6369640.5452077) AS location_distance FROM node LEFT JOIN location_instance ON node.vid = location_instance.vid LEFT JOIN location ON location_instance.lid = location.lid LEFT JOIN stg_sba_resource_partner_offices ON location.name = stg_sba_resource_partner_offices.PRTLOCNM LEFT JOIN field_data_field_partner_website ON node.nid = field_data_field_partner_website.entity_id LEFT JOIN location_phone ON location.lid = location_phone.lid WHERE (COALESCE(ACOS(0.77710412277735*COS(RADIANS(location.latitude))*(0.21981811088358*COS(RADIANS(location.longitude)) + -0.97554087465753*SIN(RADIANS(location.longitude))) + 0.62937205400497*SIN(RADIANS(location.latitude))), 0.00000)*6369640.5452077) > 0 AND (( (node.status = '1') AND (node.type IN ('sba_resource_partner_offices')) AND (node.nid IN (SELECT taxonomy_index.nid AS nid FROM taxonomy_index WHERE ( (taxonomy_index.tid IN ('7354', '7355', '7356', '7357', '7358', '7361', '7359', '7362', '7366', '7364', '88266', '88268')) ))) )) GROUP BY node.nid, location.lid ORDER BY location_distance ASC LIMIT 3;")
//     .then(function(results) {
//       console.log(results);
//     });
// });

import * as lincCounselor from "./controllers/linc-counselor.js";
app.post("/matchCounselors", jsonParser, lincCounselor.getCounselorsByLocation);

import { fetchContent, fetchContentById, fetchFrontPageSlides, fetchBlogs, fetchDisaster } from "./controllers/content.js";
if (config.get("drupal.enablePassThrough")) {
  app.get("/content/:type.json", fetchContent);
  app.get("/content/:type/:id.json", fetchContentById);
}
app.get("/content/frontpageslides.json", fetchFrontPageSlides);
app.get("/content/blogs.json", fetchBlogs);
app.get("/content/disaster.json", fetchDisaster);

import { getMainMenu } from "./controllers/main-menu.js";
app.get("/content/main-menu.json", getMainMenu);




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
