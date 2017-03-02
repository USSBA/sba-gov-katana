import HttpStatus from "http-status-codes";
import { fetchCounselorsByLocation } from "../models/dao/linc-counselor";

function getCounselorsByLocation(req, res) {
  fetchCounselorsByLocation(req.body.zipcode)
    .then(function(counselors) {
      console.log(counselors);
      res.status(HttpStatus.OK).send(counselors);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status).send("Error retrieving counselors by location");
    });
}

export { getCounselorsByLocation };