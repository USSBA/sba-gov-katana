import HttpStatus from "http-status-codes";
import { fetchCounselorsByLocation } from "../models/dao/linc-counselor";

function getCounselorsByLocation(req, res) {
  fetchCounselorsByLocation(req.body.zipcode)
    .then(function(counselors) {
      console.log(counselors);
    });
  res.status(HttpStatus.OK).send("testingtesting");
}

export { getCounselorsByLocation };