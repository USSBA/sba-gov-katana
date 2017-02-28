/**
 * Created by aadeogun on 2/13/17.
 */
import HttpStatus from "http-status-codes";
import { fetchMainMenu } from "../models/dao/main-menu-hardcoded.js";

function getMainMenu(req, res) {
  fetchMainMenu()
    .then(function(data) {
      res.status(HttpStatus.OK).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.response.status).send("Error retrieving main-menu");
    });
}

export { getMainMenu };
