import _ from "lodash";
import sinon from "sinon";
import Promise from "bluebird";

import * as restService from "../../../../src/models/dao/drupal8-rest.js";
import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";

import taxonomyTerm1 from "./data/taxonomys/taxonomy-term-1.json";

import taxonomys from "./data/taxonomys/taxonomys.json";
import taxonomysOutputBase from "./data/taxonomys/output-taxonomys.json";


describe("Drupal 8 Taxonomy Service", function () {
  let fetchContent,
    fetchById;

  function setupStub() {
    fetchContent.withArgs(drupalEightDataService.taxonomysEndpoint).returns(Promise.resolve(taxonomys));
    fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 1).returns(Promise.resolve(taxonomyTerm1));
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
      .then((result) => {
        return done();
      })
      .catch((error) => {
        return done(error);
      });
  }
  it("should fetch all formatted taxonomys", () => {
    setupStub();
    return drupalEightDataService.fetchTaxonomys().then((result)=>{
      result.should.have.lengthOf(taxonomysOutputBase.length);
      result.should.deep.equal(taxonomysOutputBase);
    });
  });
});
