import _ from "lodash";
import sinon from "sinon";
import Promise from "bluebird";

import documentData from "./data/document/documents.json";
import documentSortAndFilterOutput from "./data/document/document-sort-and-filter-output.json";
import * as drupalService from "../../../../src/service/drupal-eight.js";

describe("Drupal 8 Document Service", function() {
  describe("filterAndSortDocuments", function() {
    it("should return all documents", () => {
      drupalService
        .filterAndSortDocuments(
          {
            search: "",
            type: "all",
            program: "all",
            activity: "all",
            start: "0",
            end: "0"
          },
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should return all documents with no range", () => {
      drupalService
        .filterAndSortDocuments(
          {
            search: "",
            type: "all",
            program: "all",
            activity: "all"
          },
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should return 10 documents", () => {
      drupalService
        .filterAndSortDocuments(
          {
            search: "",
            type: "all",
            program: "all",
            activity: "all",
            start: "0",
            end: "10"
          },
          documentData
      )
        .should.have.lengthOf(10);
    });
    it("should filter and sort 10 documents", () => {
      drupalService
        .filterAndSortDocuments(
          {
            search: "",
            type: "SOP",
            program: "8(a)",
            activity: "Leverage commitments and draws",
            sortBy: "last-updated",
            start: "0",
            end: "0"
          },
          documentData
      )
        .should.deep.equal(documentSortAndFilterOutput);
    });
    it("should search for documents", () => {
      let value = drupalService.filterAndSortDocuments(
        {
          search: "ad elit",
          type: "all",
          program: "all",
          activity: "all",
          sortBy: "",
          start: "0",
          end: "0"
        },
        documentData
      );
      value[0].title.should.equal("ad elit ad magna labore dolore");
    });
  });
});
