import Feedback from "../models/feedback.js";
import _ from "lodash";
import moment from "moment";
import uuid from "uuid";
import UserService from "../service/user-service.js";
import jsonToCsv from "json2csv";

function saveFeedback(feedback) {
  const newFeedback = _.assign({}, feedback, {
    id: uuid.v4(),
    timestamp: moment().unix()
  });
  return Feedback.create(newFeedback)
    .then(function(result) {
      return result.id;
    });
}

function saveFeedbackText(id, feedbackText, honeyPotText) {
  if (honeyPotText) {
    console.log("Detected submission with honeypot field filled.");
    return Promise.resolve();
  }
  return Feedback.update({
    text: feedbackText
  }, {
    where: {
      id: id
    }
  });

}

function getFeedback(sessionId) {
  // the user authorization is here for now; move it to the global ACL when one is implemented
  return UserService.isAdministrator(sessionId)
    .then((isAdmin) => {
      if (isAdmin) {
        return Feedback.findAll({
          raw: true
        }).then((data) => {
          if (data && data.length > 0) {
            const fields = _.without(_.keys(data[0]), "sourceIpAddress");
            return jsonToCsv({
              data: data,
              fields: fields
            });
          }
          return "";

        });
      }
      throw new Error("FORBIDDEN");

    });
}


export { saveFeedback, saveFeedbackText, getFeedback };
