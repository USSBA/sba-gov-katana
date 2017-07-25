import sinon from "sinon";
import Promise from "bluebird";
import * as feedbackService from "../../../../src/service/feedback-service.js";
import { handleFeedback, handleFeedbackText } from "../../../../src/controllers/feedback-controller.js";

describe("#Feedback Controller", function() {
  let saveFeedbackStub,
    saveFeedbackTextStub;
  let response;

  before(function() {
    saveFeedbackStub = sinon.stub(feedbackService, "saveFeedback");
    saveFeedbackTextStub = sinon.stub(feedbackService, "saveFeedbackText");
    response = {
      send: sinon.spy(function() {
        return this;
      }),
      status: sinon.spy(function() {
        return this;
      })
    };
  });

  after(function() {
    saveFeedbackStub.restore();
    saveFeedbackTextStub.restore()
  });

  afterEach(function() {
    response.send.reset();
    response.status.reset();
  });

  describe("#handleFeedback", function() {

    afterEach(function() {
      saveFeedbackStub.reset();
    });

    it("should return the id with good data", function(done) {
      saveFeedbackStub.returns(Promise.resolve(10));
      var request = {
        body: {
          result: true
        },
        header: function() {
          return "";
        }
      };
      handleFeedback(request, response);

      response.status.calledWith(200);
      response.send.calledWith({
        id: 10
      });
      done();
    });

    it("should return an error if no result is provided", function(done) {
      saveFeedbackStub.returns(Promise.resolve("Should not matter"));
      var request = {
        body: {},
        header: function() {
          return "";
        }
      };
      handleFeedback(request, response);

      response.status.calledWith(400);
      response.send.called.should.be.true;
      done();
    });
  });

  describe("#handleFeedbackText", function() {
    beforeEach(function() {
      saveFeedbackTextStub.returns(Promise.resolve("Should not matter"));
    })

    afterEach(function() {
      saveFeedbackTextStub.reset();
    });

    it("should return a 204 with good data", function(done) {
      var request = {
        body: {
          text: "something"
        },
        params: {
          id: 1
        },
        header: function() {
          return "";
        }
      };
      handleFeedbackText(request, response);

      response.status.calledWith(204);
      response.send.calledWith();
      done();
    });

    it("should return an error if no text is provided", function(done) {
      var request = {
        body: {
          text: {
            feedbackText: "",
            honeyPotText: ""
          }
        },
        params: {
          id: 1
        },
        header: function() {
          return "";
        }
      };
      handleFeedbackText(request, response);

      response.status.calledWith(400);
      response.send.called.should.be.true;
      done();
    });

    it("should return an error if no id is provided", function(done) {
      var request = {
        body: {
          text: "should not matter"
        },
        header: function() {
          return "";
        }
      };
      handleFeedbackText(request, response);

      response.status.calledWith(400);
      response.send.called.should.be.true;
      done();
    });
  });
});
