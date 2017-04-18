import _ from "lodash";
import sinon from "sinon";

import * as drupaleight from "../../../../src/service/drupal-eight.js";
import * as rest from "../../../../src/models/dao/drupal8-rest.js";

import outputBase from "./data/output.json";
import nodeBase from "./data/node.json";
import firstParagraphBase from "./data/paragraph1.json";
import secondParagraphBase from "./data/paragraph2.json";
import thirdParagraphBase from "./data/paragraph3.json";
import taxonomyBase from "./data/taxonomy1.json";


describe("Drupal 8 Service", function() {
  let fetchById;

  function setupStub(node, firstParagraph, secondParagraph, thirdParagraph, taxonomy) {
    fetchById.withArgs(drupaleight.nodeEndpoint, 1).returns(Promise.resolve(node));
    fetchById.withArgs(drupaleight.paragraphEndpoint, 1).returns(Promise.resolve(firstParagraph));
    fetchById.withArgs(drupaleight.paragraphEndpoint, 2).returns(Promise.resolve(secondParagraph));
    fetchById.withArgs(drupaleight.paragraphEndpoint, 3).returns(Promise.resolve(thirdParagraph));
    fetchById.withArgs(drupaleight.taxonomyEndpoint, 1).returns(Promise.resolve(taxonomy));
  }

  beforeEach(() => {
    fetchById = sinon.stub(rest, "fetchById");
  })

  afterEach(() => {
    fetchById.reset();
    fetchById.restore();
  })

  function runTest(done, output, extraAssertions) {
    let myExtraAssertions = extraAssertions || _.identity();
    return drupaleight.fetchFormattedNode(1)
      .then((result) => {
        result.should.deep.equal(output);
        return result;
      })
      .then(myExtraAssertions)
      .then(result => done())
      .catch(error => done(error));
  }

  it("should format the node data correctly", function(done) {
    setupStub(nodeBase, firstParagraphBase, secondParagraphBase, thirdParagraphBase, taxonomyBase);
    runTest(done, outputBase, function(result) {
      result.paragraphs.should.have.length(3);
    });
  })

  it("should not have a title when there is not title", function(done) {
    let node2 = _.set(nodeBase, "title[0].value", null);
    let output = _.set(outputBase, "title", null);
    setupStub(node2, firstParagraphBase, secondParagraphBase, thirdParagraphBase, taxonomyBase);
    runTest(done, output);
  })

  it("should return normally when there are no paragraphs", function(done) {
    let node2 = _.set(nodeBase, "field_paragraphs", null);
    let output = _.set(outputBase, "paragraphs", []);
    setupStub(nodeBase, null, null, null, taxonomyBase);
    runTest(done, output);
  })


  it("should return normally less the paragraph when a paragraph is not found", function(done) {
    let output = _.set(outputBase, "paragraphs", _.tail(outputBase.paragraphs, 2));
    setupStub(nodeBase, null, secondParagraphBase, thirdParagraphBase, taxonomyBase);
    runTest(done, output);
  })

  it("should return normally less the taxonomy when no taxonomy is given", function(done) {
    let node2 = _.set(nodeBase, "field_site_location", null);
    let output = _.set(outputBase, "taxonomy", null);
    setupStub(nodeBase, null, secondParagraphBase, thirdParagraphBase, taxonomyBase);
    runTest(done, output);
  })

  it("should return normally less the taxonomy when the given taxonomy is not found", function(done) {
    let output = _.set(outputBase, "taxonomy", null);
    setupStub(nodeBase, null, secondParagraphBase, thirdParagraphBase, null);
    runTest(done, output);
  })

  it("should return nothing", function(done) {
    setupStub(null, null, null, null, null);
    runTest(done, {});
  })
})
