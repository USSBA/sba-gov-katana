let sinon = require('sinon');
import chai from "chai";

import { fetchNotification } from "../../../../src/service/notification.js";
import * as Drupal8 from "../../../../src/service/drupal-eight.js";

describe("notification.js", () => {

  const mockFetchAnnouncments = sinon.stub(Drupal8, "fetchAnnouncements");

  it("should return the most recent announcement", (done) => {

    mockFetchAnnouncments.returns(Promise.resolve([{
      start: "2012-04-23",
      expiration: "2013-04-23"
    }, {
      start: "2017-04-23",
      expiration: "4000-04-23"
    }]));

    fetchNotification().then((result) => {

      result.should.deep.equal({
        start: "2017-04-23",
        expiration: "4000-04-23"
      });

    }).then((result) => {

      done();

    }).catch((error) => {

      done(error);

    });

  });

  it("should return no announcements", (done) => {

    mockFetchAnnouncments.returns(Promise.resolve([{
      start: "2012-04-23",
      expiration: "2013-04-23"
    }, {
      start: "2015-04-23",
      expiration: "2016-04-23"
    }]));

    fetchNotification().then((result) => {

      chai.expect(result).to.equal(undefined);

    }).then((result) => {

      done();

    }).catch((error) => {

      done(error);

    });

  });

});
