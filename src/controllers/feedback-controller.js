import { saveFeedback, saveFeedbackText } from "../service/feedback-service.js";
import moment from "moment";
import HttpStatus from "http-status-codes";

function handleFeedback(req, res) {
  if (req && req.body && req.body.result) {
    const feedback = {
      id: req.body.id,
      sessionId: req.sessionInfo || "",
      result: req.body.result,
      timestamp: moment().unix(),
      sourceIpAddress: req.ip
    };
    saveFeedback(feedback)
      .then(function(id) {
        res.status(HttpStatus.OK).send({
          id: id
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error saving feedback.");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Result missing from body.  Please check that the HTTP Request body includes a result with a value 'yes' or 'no'");
  }
}

function handleFeedbackText(req, res) {
  if (req && req.body && req.body.text.honeyPotText) {
    console.log("This is submitted by a spam bot.");
  } else if (req && req.body && req.body.text.feedbackText && req.params && req.params.id) {
    saveFeedbackText(req.params.id, req.body.text.feedbackText)
      .then(function() {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch((error) => {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error saving feedback.");
      });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Text missing from body or ID missing from URL.  Please check that the HTTP request includes a text");
  }
}

export { handleFeedback, handleFeedbackText };
