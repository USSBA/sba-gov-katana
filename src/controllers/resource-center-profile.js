import { saveProfile, getProfiles } from "../service/resource-center-profile.js";
import _ from "lodash";
import HttpStatus from "http-status-codes";

/***************
 Expected POST Body Sample:
 {
   "profile": {
     "type": "WBC",
     "name": "My WBC Center",
     "address": "8 Market Place, Baltimore, MD 21202",
     "phone": "123-456-7890",
     "businessStage": "Stage51",
     "serviceArea": "Area51",
     "url": "www.example.com",
     "hours": {
       "mondayOpen": "9:00 am",
       "mondayClose": "5:00 pm",
       "tuesdayOpen": "9:00 am",
       "tuesdayClose": "5:00 pm",
       "wednesdayOpen": "9:00 am",
       "wednesdayClose": "5:00 pm",
       "thursdayOpen": "9:00 am",
       "thursdayClose": "5:00 pm",
       "fridayOpen": "9:00 am",
       "fridayClose": "5:00 pm",
       "saturdayOpen": "9:00 am",
       "saturdayClose": "5:00 pm",
       "sundayOpen": "9:00 am",
       "sundayClose": "5:00 pm"
     },
     "expertise": [
       "Being Cool",
       "Being Rad"
     ],
     "services": [
       "Cool Consultancy",
       "Rad Consultancy"
     ],
     "languages": [
       "Skater",
       "Surfer"
     ]
   }
 }
 */

function handleProfileSubmission(req, res) {
  if (_.has(req, "body.profile")) {
    const profile = _.assign(
      {
        sourceIpAddress: req.ip
      },
      req.body.profile
    );
    saveProfile(profile, req.body.honeyPotText)
      .then(function() {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch((error) => {
        console.error(error);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send("Error saving resource center profile.");
      });
  } else {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send(
        "Profile missing from body.  Please check that the HTTP request includes a profile value"
      );
  }
}

function retrieveProfiles(req, res) {
  // There is currently no authorization required for requests to proceed
  if (req) {
    getProfiles(req.sessionInfo)
      .then(function(results) {
        res
          .header("Content-Type", "application/json")
          .status(HttpStatus.OK)
          .send(results);
      })
      .catch((error) => {
        if (error.message === "FORBIDDEN") {
          res
            .status(HttpStatus.FORBIDDEN)
            .send(
              "Please log in as an Administrator before requesting this data"
            );
        } else {
          console.log("Error Thrown during Profile Retrieval", error);
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send("Error retrieving Resource Center Profiles");
        }
      });
  } else {
    res
      .status(HttpStatus.FORBIDDEN)
      .send("Please log in as an Administrator before requesting this data.");
  }
}

export { retrieveProfiles, handleProfileSubmission };
