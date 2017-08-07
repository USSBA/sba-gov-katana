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
          drupalService.sanitizeDocumentParams({
            search: "",
            type: "all",
            program: "all",
            activity: "all"
          }),
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should return all documents with no range", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            search: "",
            type: "all",
            program: "all",
            activity: "all"
          }),
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should return 10 documents", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            search: "",
            type: "all",
            program: "all",
            activity: "all",
            start: "0",
            end: "10"
          }),
          documentData
      )
        .should.have.lengthOf(10);
    });
    it("should filter and sort 10 documents", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            search: "",
            type: "SOP",
            program: "8(a)",
            activity: "Leverage commitments and draws",
            sortBy: "last-updated"
          }),
          documentData
      )
        .should.deep.equal(documentSortAndFilterOutput);
    });
    it("should search for documents", () => {
      let value = drupalService.filterAndSortDocuments(
        drupalService.sanitizeDocumentParams({
          search: "ad elit",
          type: "all",
          program: "all",
          activity: "all",
          sortBy: ""
        }),
        documentData
      );
      value[0].title.should.equal("ad elit ad magna labore dolore");
    });
    it("should search for documents with only a search param", () => {
      let value = drupalService.filterAndSortDocuments(
        drupalService.sanitizeDocumentParams({
          search: "ad elit"
        }),
        documentData
      );
      value[0].title.should.equal("ad elit ad magna labore dolore");
    });
    it("should return all documents with only a type param", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            type: "all"
          }),
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should return all documents with only a program param", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            program: "all"
          }),
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should return all documents with only an activity param", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            activity: "all"
          }),
          documentData
      )
        .should.deep.equal(documentData);
    });
    it("should sort all documents with only a sort by param", () => {
      let value = drupalService.filterAndSortDocuments(
        drupalService.sanitizeDocumentParams({
          sortBy: "title"
        }),
        documentData
      );
      value[0].title.should.equal("ad elit ad magna labore dolore");
    });
    it("should return an error when the start/end is not a number", () => {
      drupalService
        .filterAndSortDocuments(
          drupalService.sanitizeDocumentParams({
            search: "all",
            type: "all",
            program: "all",
            activity: "all",
            start: "Use the Force, Luke",
            end: "Stay on target!"
          }),
          documentData
      )
        .should.throw();
    });
  });
});
