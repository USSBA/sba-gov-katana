/**
 * Created by aadeogun on 2/13/17.
 */
import HttpStatus from "http-status-codes";
import fetchMainMenuFromDB from '../models/dao/main-menu.js';

function fetchMainMenu(req, res) {

    fetchMainMenuFromDB()
        .then(function(data) {
            res.status(HttpStatus.OK).send(data);
        })
        .catch((error) => {
            console.error(error);
            res.status(error.response.status).send("Error retrieving main-menu");
        });
}

export {fetchMainMenu};