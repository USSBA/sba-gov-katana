import _ from "lodash";
import sinon from "sinon";

import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";

import contactOutputBase from "./data/contactOutput.json";


describe("Drupal 8 Contact Service", function() {
    let fetchContacts;

    function setupStub(contact) {
        fetchContacts.withArgs().returns(Promise.resolve(contact));
    }

    before(() => {
        fetchContacts = sinon.stub(drupalEightDataService, "fetchContacts");
    });

    afterEach(() => {
        fetchContacts.reset();
    });

    after(() => {
        fetchContacts.restore();
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
        setupStub(contactOutputBase);
        runTest(done, contactOutputBase, function(result) {
            result.should.have.length(2);
        });
    });
});
