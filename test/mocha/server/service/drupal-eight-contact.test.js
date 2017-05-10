import _ from "lodash";
import sinon from "sinon";

import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";
import * as drupalEightRestServiceClient from "../../../../src/models/dao/drupal8-rest.js";

import contactBase from "./data/contact.json";
import contactOutputBase from "./data/contactOutput.json";
import contactParagraphBase from "./data/contactParagraph.json";
import taxonomyBase from "./data/taxonomy1.json";


describe("Drupal 8 Contact Service", function() {
    let fetchContentByType, fetchById;

    function setupStub(contact, contactParagraph, taxonomy) {
        fetchContentByType.withArgs(drupalEightDataService.contactEndpoint).returns(Promise.resolve(contact));
        fetchById.withArgs(drupalEightDataService.paragraphEndpoint, 1).returns(Promise.resolve(contactParagraph));
        fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 1).returns(Promise.resolve(taxonomy));
    }

    before(() => {
        fetchContentByType = sinon.stub(drupalEightRestServiceClient, "fetchContentByType");
        fetchById = sinon.stub(drupalEightRestServiceClient, "fetchById");
    });

    afterEach(() => {
        fetchContentByType.reset();
        fetchById.reset();
    });

    after(() => {
        fetchContentByType.restore();
        fetchById.restore();
    });

    function runTest(done, output, extraAssertions) {

        let myExtraAssertions = extraAssertions || _.identity();
        return drupalEightDataService.fetchContacts()
            .then((result) => {
                result.should.deep.equal(output);
                return result;
            })
            .then(myExtraAssertions)
            .then(result => done())
            .catch(error => done(error));
    }

    it("should format the contact data correctly", function(done) {
        setupStub(contactBase, contactOutputBase, contactParagraphBase, taxonomyBase);
        runTest(done, contactOutputBase, function(result) {
            result.contacts.should.have.length(2);
        });
    });

/*    it("should not have a contact title when there is no title", function(done) {
        let localNode = _.set(_.cloneDeep(contactBase), "title[0].value", null);
        let output = _.assign({}, contactOutputBase, {
            title: null
        });
        setupStub(localNode);
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
    })*/
});
