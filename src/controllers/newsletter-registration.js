import { registerForNewsletter } from "../models/dao/newsletter-registration.js";
import HttpStatus from "http-status-codes";

function registerUserForNewsletter(req, res) {
  if (req.query) {
    registerForNewsletter(req.query.userEmailAddress, req.query.userZipCode)
      .then(function(data) {
        res.status(HttpStatus.OK).send(JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send("Error registering user for newsletter.");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Error registering user.");
  }
}

export { registerUserForNewsletter };
