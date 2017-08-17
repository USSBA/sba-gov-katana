import feedbackData from "./feedback.json"
import fs from "fs";
let formattedFeedbackData = fs.readFileSync("test/mocha/server/util/formatted-feedback.csv", "utf-8");

import { formatFeedbackData } from "../../../../src/util/formatter.js";

describe("#Formatter", function() {

  describe("#formatFeedbackData", function() {
    it("should return nothing when there is only a script tag", function(done) {
      let formatted = formatFeedbackData(feedbackData)
      formatted.should.equal(formattedFeedbackData);
      done();
    })
  });

});
