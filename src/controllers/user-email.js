import HttpStatus from "http-status-codes";
import { fetchDrupalUserEmail } from "../models/dao/drupal-user.js";

function getDrupalUserEmail(req, res) {
  if (req.params) {
    fetchDrupalUserEmail(req.params.userId)
      .then(function(data) {
        res.status(HttpStatus.OK).send(JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error retrieving user email");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("No user email.");
  }
}

export { getDrupalUserEmail };