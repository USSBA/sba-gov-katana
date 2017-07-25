import _ from "lodash";
import sinon from "sinon";
import Promise from 'bluebird';

import * as restService from "../../../../src/models/dao/drupal8-rest.js"
import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";

import taxonomy23 from "./data/contact/taxonomy23.json"
import taxonomy29 from "./data/contact/taxonomy29.json"
import taxonomy75 from "./data/contact/taxonomy75.json"

import contactsNodeData from "./data/contact/contacts.json";
import contactParagraph from "./data/contact/contact-paragraph.json";
import contactOutput from "./data/contact/contact-output.json";

import sbicContactParagraph from "./data/contact/sbic-contact-paragraph.json";
import sbicContactOutput from "./data/contact/sbic-contact-output.json";

describe("Drupal 8 Contact Service", function() {
  let fetchContent,
    fetchById;

  function setupStub() {
    fetchContent.returns(Promise.resolve(contactsNodeData));
    fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 23).returns(Promise.resolve(taxonomy23));
    fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 29).returns(Promise.resolve(taxonomy29));
    fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 75).returns(Promise.resolve(taxonomy75));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 2739).returns(Promise.resolve(contactParagraph));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 4273).returns(Promise.resolve(sbicContactParagraph));
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
    return drupalEightDataService.fetchContacts({
      category: category
    })
      .then((result) => {
        result.should.deep.equal(output);
        return result;
      })
      .then(result => done())
      .catch(error => done(error));
  }

  it("should format the contact data correctly", function(done) {
    setupStub();
    runTest(done, contactOutput, "Export working capital");
  });

  it("should format the sbic contact data correctly", function(done) {
    setupStub();
    runTest(done, sbicContactOutput, "SBIC");
  });

});
