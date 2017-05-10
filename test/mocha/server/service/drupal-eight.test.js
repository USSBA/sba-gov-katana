import _ from "lodash";
import sinon from "sinon";

import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";
import * as drupalEightRestServiceClient from "../../../../src/models/dao/drupal8-rest.js";

import outputBase from "./data/output.json";
import nodeBase from "./data/node.json";
import firstParagraphBase from "./data/paragraph1.json";
import secondParagraphBase from "./data/paragraph2.json";
import thirdParagraphBase from "./data/paragraph3.json";
import fourthParagraphBase from "./data/paragraph4.json";
import taxonomyOneBase from "./data/taxonomy1.json";
import taxonomyTwoBase from "./data/taxonomy2.json";


describe("Drupal 8 Service", function() {
  let fetchById;

  function setupStub(node, firstParagraph, secondParagraph, thirdParagraph, fourthParagraph, taxonomy1, taxonomy2) {
    fetchById.withArgs(drupalEightDataService.nodeEndpoint, 1).returns(Promise.resolve(node));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 1).returns(Promise.resolve(firstParagraph));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 2).returns(Promise.resolve(secondParagraph));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 3).returns(Promise.resolve(thirdParagraph));
    fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 4).returns(Promise.resolve(fourthParagraph));
    fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 1).returns(Promise.resolve(taxonomy1));
    fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 2).returns(Promise.resolve(taxonomy2));
  }

  before(() => {
    fetchById = sinon.stub(drupalEightRestServiceClient, "fetchById");
  });

  afterEach(() => {
    fetchById.reset();
  });

  after(() => {
    fetchById.restore();
  });

  function runTest(done, output, extraAssertions) {

    let myExtraAssertions = extraAssertions || _.identity();
    return drupalEightDataService.fetchFormattedNode(1)
      .then((result) => {
        result.should.deep.equal(output);
        return result;
      })
      .then(myExtraAssertions)
      .then(result => done())
      .catch(error => done(error));
  }

  it("should format the node data correctly", function(done) {
    setupStub(nodeBase, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, outputBase, function(result) {
      result.paragraphs.should.have.length(4);
    });
  });

  it("should not have a title when there is not title", function(done) {
    let localNode = _.set(_.cloneDeep(nodeBase), "title[0].value", null);
    let output = _.assign({}, outputBase, {
      title: null
    });
    setupStub(localNode, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should return normally when there are no paragraphs", function(done) {
    let localNode = _.assign({}, nodeBase, {
      field_paragraphs: null
    });
    let output = _.assign({}, outputBase, {
      paragraphs: []
    });
    setupStub(localNode, null, null, null, null, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });


  it("should return normally less the paragraph when a paragraph is not found", function(done) {
    let lastTwoParagraphs = _.slice(outputBase.paragraphs, 2);
    let output = _.assign({}, outputBase, {
      paragraphs: lastTwoParagraphs
    });
    setupStub(nodeBase, null, null, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should return normally less the taxonomy when no taxonomy is given", function(done) {
    let localNode = _.assign({}, nodeBase, {
      field_site_location: null
    });
    let output = _.assign({}, outputBase, {
      taxonomy: null
    });
    setupStub(localNode, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should return normally less the taxonomy when the given taxonomy is not found", function(done) {
    let output = _.assign({}, outputBase, {
      taxonomy: {}
    });
    setupStub(nodeBase, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, null, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should return nothing when the requested node does not exist", function(done) {
    setupStub(null, null, null, null, null, null, null);
    runTest(done, {});
  })
});
