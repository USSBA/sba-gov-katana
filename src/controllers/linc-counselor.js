import HttpStatus from "http-status-codes";
import { fetchCounselorsByLocation } from "../models/dao/linc-counselor";

function getCounselorsByLocation(req, res) {
  fetchCounselorsByLocation(req.query.zip)
    .then(function(counselors) {
      res.status(HttpStatus.OK).send(counselors);
    })
    .catch((error) => {
      console.log("controller error");
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        });
    });
}

export { getCounselorsByLocation };
