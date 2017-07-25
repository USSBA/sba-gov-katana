import _ from "lodash";
import sinon from "sinon";
import Promise from 'bluebird';

import * as restService from "../../../../src/models/dao/drupal8-rest.js"
import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";

import ctaNode from "./data/call-to-action.json";
import ctaParagraph from "./data/call-to-action-button-paragraph.json";
import ctaOutput from "./data/call-to-action-output.json"

describe("Drupal 8 CTA Service", function() {
  let fetchContent,
    fetchById;

  function setupStub() {
    fetchById.withArgs(drupalEightDataService.nodeEndpoint, 1).returns(Promise.resolve(ctaNode));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 73).returns(Promise.resolve(ctaParagraph));
  }

  before(() => {
    fetchContent = sinon.stub(restService, "fetchContent");
    fetchById = sinon.stub(restService, "fetchById");
  });

  afterEach(() => {
    fetchContent.reset();
    fetchById.reset();
  });

  after(() => {
    fetchContent.restore();
    fetchById.restore();
  });

  function runTest(done, output, category) {
    return drupalEightDataService.fetchFormattedCallToActionByNodeId([{
      target_id: 1
    }], "Large")
      .then((result) => {
        result.should.deep.equal(output);
        return result;
      })
      .then(result => done())
      .catch(error => done(error));
  }

  it("should format the cta data correctly", function(done) {
    setupStub();
    runTest(done, ctaOutput, "Export working capital");
  });


});
