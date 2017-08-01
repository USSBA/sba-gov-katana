import _ from "lodash";
import sinon from "sinon";

import * as drupalEightDataService from "../../../../src/service/drupal-eight.js";
import * as drupalEightRestServiceClient from "../../../../src/models/dao/drupal8-rest.js";

import outputBase from "./data/output.json";
import outputDocumentBase from "./data/output-node-document.json";
import nodeBase from "./data/node.json";
import firstParagraphBase from "./data/paragraph1.json";
import secondParagraphBase from "./data/paragraph2.json";
import thirdParagraphBase from "./data/paragraph3.json";
import fourthParagraphBase from "./data/paragraph4.json";
import fifthParagraphBase from "./data/paragraph5-banner-image.json";
import taxonomyOneBase from "./data/taxonomy1.json";
import taxonomyTwoBase from "./data/taxonomy2.json";
import taxonomyThreeBase from "./data/taxonomy3.json";
import taxonomyFourBase from "./data/taxonomy4.json";
import paragraphBannerImage from "./data/paragraph-banner-image.json";
import paragraphDocFileOne from "./data/paragraph-doc-file1.json";
import paragraphDocFileTwo from "./data/paragraph-doc-file2.json";
import paragraphDocIdOne from "./data/paragraph-doc-id1.json";
import paragraphDocIdTwo from "./data/paragraph-doc-id2.json";
import fieldBannerImage from "./data/field-banner-image.json";
import fieldRelatedDocuments from "./data/field-related-documents.json";
import nodeProgramPage from "./data/node-program-page.json";
import nodeDocument from "./data/node-document.json";


describe("Drupal 8 Service with mocked endpoints", function() {
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

  // This will stub out endpoints based on the position in the array for each of
  // nodes, paragraphs, and taxonomys.  Assigns endpoint id of index+1
  function setupDynamicStub(nodes, paragraphs, taxonomys) {
    for (var i = 0; i < nodes.length; i++) {
      fetchById.withArgs(drupalEightDataService.nodeEndpoint, i + 1).returns(Promise.resolve(nodes[i]));
    }
    for (var i = 0; i < paragraphs.length; i++) {
      fetchById.withArgs(drupalEightDataService.paragraphEndpoint, i + 1).returns(Promise.resolve(paragraphs[i]));
    }
    for (var i = 0; i < taxonomys.length; i++) {
      fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, i + 1).returns(Promise.resolve(taxonomys[i]));
    }
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

    const myExtraAssertions = extraAssertions || _.identity();
    return drupalEightDataService.fetchFormattedNode(1)
      .then((result) => {
        result.should.deep.equal(output);
        return result;
      })
      .then(myExtraAssertions)
      .then((result) => {
        return done();
      })
      .catch((error) => {
        return done(error);
      });
  }

  it("should format the node data correctly", function(done) {
    setupStub(nodeBase, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, outputBase, function(result) {
      result.paragraphs.should.have.length(4);
    });
  });

  it("should not have a title when there is not title", function(done) {
    const localNode = _.set(_.cloneDeep(nodeBase), "title[0].value", null);
    const output = _.assign({}, outputBase, {
      title: null
    });
    setupStub(localNode, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should return normally when there are no paragraphs", function(done) {
    const localNode = _.assign({}, nodeBase, {
      field_paragraphs: null
    });
    const output = _.assign({}, outputBase, {
      paragraphs: []
    });
    setupStub(localNode, null, null, null, null, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });


  it("should return normally less the paragraph when a paragraph is not found", function(done) {
    const lastTwoParagraphs = _.slice(outputBase.paragraphs, 2);
    const output = _.assign({}, outputBase, {
      paragraphs: lastTwoParagraphs
    });
    setupStub(nodeBase, null, null, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should ignore the taxonomy field entirely when field_site_location is null", function(done) {
    const localNode = _.assign({}, nodeBase, {
      field_site_location: null
    });
    const output = _.assign({}, outputBase, {});
    setupStub(localNode, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, taxonomyOneBase, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should ignore the taxonomy field entirely when field_site_location is not set", function(done) {
    const output = _.assign({}, outputBase, {});
    setupStub(nodeBase, firstParagraphBase, secondParagraphBase, thirdParagraphBase, fourthParagraphBase, null, taxonomyTwoBase);
    runTest(done, output);
  });

  it("should return nothing when the requested node does not exist", function(done) {
    setupStub(null, null, null, null, null, null, null);
    runTest(done, {});
  });

  describe("fetchFormattedTaxonomyNames", function() {
    it("should return one taxonomy name in an array when given one ID", function() {
      setupDynamicStub([], [], [taxonomyOneBase]);
      const expectedResult = ["Plan"];
      return drupalEightDataService.fetchFormattedTaxonomyNames([1]).then((result) => {
        result.should.deep.equal(expectedResult);
      });
    });
    it("should return two taxonomy names in an array when given two IDs", function() {
      setupDynamicStub([], [], [taxonomyOneBase, taxonomyTwoBase]);
      const expectedResult = ["Plan", "Export express"];
      return drupalEightDataService.fetchFormattedTaxonomyNames([1, 2]).then((result) => {
        result.should.deep.equal(expectedResult);
      });
    });
  });
  describe("fetchFormattedTaxonomyName", function() {
    it("should return a taxonomy name when given one ID", function() {
      setupDynamicStub([], [], [taxonomyOneBase]);
      const expectedResult = "Plan";
      return drupalEightDataService.fetchFormattedTaxonomyName(1).then((result) => {
        result.should.equal(expectedResult);
      });
    });
  });

  describe("formatNode ", function() {
    describe("of type 'program_page': ", function() {
      it("should properly format a program_page type node", function() {
        setupDynamicStub([nodeProgramPage], [firstParagraphBase, null, null, null, fifthParagraphBase], []);
        const expectedResult = {
          type: "programPage",
          summary: "fieldSummaryText",
          title: "Investment capital",
          buttons: [{
            title: "Find investors",
            url: "#paragraph-11"
          }],
          bannerImage: {
            "type": "bannerImage",
            "image": {
              "url": "http://drupal8.content.hostname/sites/default/files/2017-07/doge100.jpg",
              "alt": "DogeBannerAltText"
            },
            "captionText": "DogeBannerCaptionText",
            "link": {
              "url": "http://doge-banner-image.example.com",
              "title": "Doge Banner Link Text"
            }
          },
          paragraphs: [{
            "type": "sectionHeader",
            "text": "My Best Header Text"
          }]
        };
        return drupalEightDataService.formatNode(nodeProgramPage).then((result) => {
          result.should.deep.equal(expectedResult);
        });
      });

      it("should handle multiple buttons for program_page type", function() {
        const buttons = [
          {
            "uri": "http://left-button.example.com",
            "title": "Left Button",
            "options": []
          },
          {
            "uri": "http://right-button.example.com",
            "title": "Right Button",
            "options": []
          }
        ];
        const localNode = _.set(_.cloneDeep(nodeProgramPage), "field_button", buttons);
        setupDynamicStub([localNode], [firstParagraphBase, null, null, null, fifthParagraphBase], []);
        const expectedButtons = [
          {
            url: "http://left-button.example.com",
            title: "Left Button"
          }, {
            url: "http://right-button.example.com",
            title: "Right Button"
          }
        ];
        return drupalEightDataService.formatNode(localNode).then((result) => {
          result.buttons[0].should.deep.equal(expectedButtons[0]);
          result.buttons[1].should.deep.equal(expectedButtons[1]);
        });
      });
      it("should handle an empty field_banner_image for program_page type", function() {
        const bannerImage = [];
        const localNode = _.set(_.cloneDeep(nodeProgramPage), "field_banner_image", bannerImage);
        setupDynamicStub([localNode], [firstParagraphBase, null, null, null, fifthParagraphBase], []);
        const expectedBannerImage = {};
        return drupalEightDataService.formatNode(localNode).then((result) => {
          result.bannerImage.should.deep.equal(expectedBannerImage);
        });
      });
    });
    describe("of type 'document': ", function() {
      it("should properly format a document type node", function() {
        setupDynamicStub([nodeDocument], [paragraphDocIdOne, paragraphDocIdTwo, paragraphDocFileOne, paragraphDocFileTwo], [taxonomyOneBase, taxonomyTwoBase, taxonomyThreeBase, taxonomyFourBase]);
        const expectedResult = outputDocumentBase;
        return drupalEightDataService.formatNode(nodeDocument).then((result) => {
          result.should.deep.equal(expectedResult);
        });
      });
      it("should handle multiple nested field_related_documents nodes and not fetch further child nodes", function() {
        const childOneTitle = "First Child Document Title";
        const childTwoTitle = "Second Child Document Title";
        const documentOne = _.set(_.cloneDeep(nodeDocument), "field_related_documents", fieldRelatedDocuments);
        const documentTwo = _.set(_.set(_.cloneDeep(nodeDocument), "title[0].value", childOneTitle), "field_related_documents", fieldRelatedDocuments);
        const documentThree = _.set(_.cloneDeep(nodeDocument), "title[0].value", childTwoTitle);
        setupDynamicStub([null, documentTwo, documentThree], [paragraphDocIdOne, paragraphDocIdTwo, paragraphDocFileOne, paragraphDocFileTwo], [taxonomyOneBase, taxonomyTwoBase, taxonomyThreeBase, taxonomyFourBase]);
        const expectedRelatedDocuments = [];
        return drupalEightDataService.formatNode(documentOne).then((result) => {
          result.relatedDocuments.should.have.lengthOf(2);
          result.relatedDocuments[0].title.should.equal(childOneTitle);
          result.relatedDocuments[1].title.should.equal(childTwoTitle);
          result.relatedDocuments[0].relatedDocuments.should.be.empty;
          result.relatedDocuments[1].relatedDocuments.should.be.empty;
        });
      });
      it("should return an empty array when given no related documents", function() {
        const documentOne = _.set(_.cloneDeep(nodeDocument), "field_related_documents", []);
        setupDynamicStub([], [paragraphDocIdOne, paragraphDocIdTwo, paragraphDocFileOne, paragraphDocFileTwo], [taxonomyOneBase, taxonomyTwoBase, taxonomyThreeBase, taxonomyFourBase]);
        const expectedRelatedDocuments = [];
        return drupalEightDataService.formatNode(documentOne).then((result) => {
          result.relatedDocuments.should.deep.equal(expectedRelatedDocuments);
        });
      });
      it("should return an empty array when given no programs", function() {
        const documentOne = _.set(_.cloneDeep(nodeDocument), "field_program", []);
        setupDynamicStub([], [paragraphDocIdOne, paragraphDocIdTwo, paragraphDocFileOne, paragraphDocFileTwo], [taxonomyOneBase, taxonomyTwoBase, taxonomyThreeBase, taxonomyFourBase]);
        const expectedPrograms = [];
        return drupalEightDataService.formatNode(documentOne).then((result) => {
          result.programs.should.deep.equal(expectedPrograms);
        });
      });
      it("should return an empty array when given no activitys", function() {
        const documentOne = _.set(_.cloneDeep(nodeDocument), "field_activity", []);
        setupDynamicStub([], [paragraphDocIdOne, paragraphDocIdTwo, paragraphDocFileOne, paragraphDocFileTwo], [taxonomyOneBase, taxonomyTwoBase, taxonomyThreeBase, taxonomyFourBase]);
        const expectedActivitys = [];
        return drupalEightDataService.formatNode(documentOne).then((result) => {
          result.activitys.should.deep.equal(expectedActivitys);
        });
      });
      it("should return an empty array when given no files", function() {
        const documentOne = _.set(_.cloneDeep(nodeDocument), "field_file", []);
        setupDynamicStub([], [paragraphDocIdOne, paragraphDocIdTwo, paragraphDocFileOne, paragraphDocFileTwo], [taxonomyOneBase, taxonomyTwoBase, taxonomyThreeBase, taxonomyFourBase]);
        const expectedFiles = [];
        return drupalEightDataService.formatNode(documentOne).then((result) => {
          result.files.should.deep.equal(expectedFiles);
        });
      });
    });
  });

  describe("formatParagraph", function() {
    it("should return the formatted paragraph for section_header types", function(done) {
      const expectedResult = {
        "type": "sectionHeader",
        "text": "My Best Header Text"
      };
      const promise = drupalEightDataService.formatParagraph(firstParagraphBase).then((output) => {
        output.should.deep.equal(expectedResult);
        done();
      });
    });
    it("should return the formatted paragraph for text_section types", function(done) {
      const expectedResult = {
        "type": "textSection",
        "text": "Some text"
      };
      const promise = drupalEightDataService.formatParagraph(secondParagraphBase).then((output) => {
        output.should.deep.equal(expectedResult);
        done();
      });
    });
    it("should return the formatted paragraph for read_more types", function(done) {
      const expectedResult = {
        "type": "readMore",
        "expandedCopyText": "This is some text",
        "preview": "Stuff.",
        "titleText": "Some title"
      };
      const promise = drupalEightDataService.formatParagraph(thirdParagraphBase).then((output) => {
        output.should.deep.equal(expectedResult);
        done();
      });
    });
    it("should return the formatted paragraph for lookup types", function(done) {
      // Mock taxonomy call
      fetchById.withArgs(drupalEightDataService.taxonomyEndpoint, 2).returns(Promise.resolve(taxonomyTwoBase));
      const expectedResult = {
        "type": "lookup",
        "contactCategory": "Export express",
        "display": "Cards",
        "sectionHeaderText": "This is a lookup"
      };
      const promise = drupalEightDataService.formatParagraph(fourthParagraphBase).then((output) => {
        output.should.deep.equal(expectedResult);
        done();
      });
    });
    it("should return the formatted paragraph for banner_image types", function(done) {
      const expectedResult = {
        "type": "bannerImage",
        "image": {
          "url": "http://drupal8.content.hostname/sites/default/files/2017-07/doge100.jpg",
          "alt": "DogeBannerAltText"
        },
        "captionText": "DogeBannerCaptionText",
        "link": {
          "url": "http://doge-banner-image.example.com",
          "title": "Doge Banner Link Text"
        }
      };
      const promise = drupalEightDataService.formatParagraph(fifthParagraphBase).then((output) => {
        output.should.deep.equal(expectedResult);
        done();
      });
    });;
    it("should return the formatted paragraph for doc_file types", function() {
      const expectedResult = {
        type: "docFile",
        effectiveDate: "1867-11-07",
        expirationDate: "1934-07-04",
        fileUrl: "http://drupal8.content.hostname/sites/default/files/1898-12/88.txt",
        version: "226"
      };
      return drupalEightDataService.formatParagraph(paragraphDocFileOne).then((output) => {
        output.should.deep.equal(expectedResult);
      });
    });
  });
});

describe("Drupal 8 Service Helper Functions", function() {
  describe("convertUrlHost", function() {
    it("should convert a localhost:8080 url to drupal8", function(done) {
      const result = drupalEightDataService.convertUrlHost("http://localhost:8080/foo/bar");
      result.should.equal("http://drupal8.content.hostname/foo/bar");
      done();
    });
    it("should convert a localhost url to drupal8", function(done) {
      const result = drupalEightDataService.convertUrlHost("http://localhost/foo/bar");
      result.should.equal("http://drupal8.content.hostname/foo/bar");
      done();
    });
    it("should convert a tanto url to drupal8", function(done) {
      let result = drupalEightDataService.convertUrlHost("http://tanto/foo/bar");
      result.should.equal("http://drupal8.content.hostname/foo/bar");
      done();
    });
    it("should convert an internal relative url", function(done) {
      const result = drupalEightDataService.convertUrlHost("internal:/foo/bar");
      result.should.equal("/foo/bar");
      done();
    });
    it("should convert an internal anchor url", function(done) {
      const result = drupalEightDataService.convertUrlHost("internal:#some-tag");
      result.should.equal("#some-tag");
      done();
    });
  });
  describe("makeParagraphValueFormatter", function() {
    it("should create a paragraph value formatter for banner_image types", function() {
      const expectedResult = {
        url: "http://drupal8.content.hostname/sites/default/files/2017-07/some_image.png",
        alt: "SomeImageAltText"
      };
      const formatter = drupalEightDataService.makeParagraphValueFormatter("banner_image", paragraphBannerImage);
      const promise = formatter(fieldBannerImage, "bannerImage");
      return promise.then(function(output) {
        output.should.include(expectedResult);
      });
    });
    it("should create a paragraph value formatter for document.doc_file types", function() {
      const expectedResult = "http://drupal8.content.hostname/sites/default/files/1898-12/88.txt";
      const formatter = drupalEightDataService.makeParagraphValueFormatter("document", paragraphDocFileOne);
      const promise = formatter(paragraphDocFileOne.field_doc_file, "fileUrl");
      return promise.then(function(output) {
        output.should.deep.equal(expectedResult);
      });
    });
  });
  describe("makeParagraphFieldFormatter", function() {
    it("should create a valid formatter for image paragraphs", function(done) {
      const prefix = "field_";
      const formatter = drupalEightDataService.makeParagraphFieldFormatter("image");
      formatter("field_image", prefix).should.equal("image");
      formatter("field_caption_text", prefix).should.equal("captionText");
      done();
    });

    it("should create a valid formatter for banner_image paragraphs", function(done) {
      const prefix = "field_";
      const formatter = drupalEightDataService.makeParagraphFieldFormatter("banner_image");
      formatter("field_caption_text", prefix).should.equal("captionText");
      formatter("field_banner_image", prefix).should.equal("image");
      formatter("field_link").should.equal("link");
      done();
    });
    it("should create a valid formatter for business_guide_contact paragraphs", function(done) {
      const prefix = "field_";
      const formatter = drupalEightDataService.makeParagraphFieldFormatter("business_guide_contact");
      formatter("field_bg_contact_category", prefix).should.equal("category");
      formatter("field_city", prefix).should.equal("city");
      formatter("field_link", prefix).should.equal("link");
      formatter("field_state", prefix).should.equal("state");
      formatter("field_state_served", prefix).should.equal("stateServed");
      formatter("field_street_address", prefix).should.equal("streetAddress");
      formatter("field_zip_code", prefix).should.equal("zipCode");
      done();
    });
    it("should create a valid formatter for doc_file paragraphs", function(done) {
      const prefix = "field_";
      const formatter = drupalEightDataService.makeParagraphFieldFormatter("doc_file");
      formatter("field_doc_effective", prefix).should.equal("effectiveDate");
      formatter("field_doc_expiration", prefix).should.equal("expirationDate");
      formatter("field_doc_file", prefix).should.equal("fileUrl");
      formatter("field_doc_version", prefix).should.equal("version");
      done();
    });
    it("should create a valid formatter for subsection_header paragraphs", function(done) {
      const prefix = "field_";
      const formatter = drupalEightDataService.makeParagraphFieldFormatter("subsection_header");
      formatter("field_subsection_header_text", prefix).should.equal("text");
      done();
    });
  });

  describe("extractFieldsByFieldNamePrefix", function() {
    it("should pull out expected fields for banner_image paragraphs", function(done) {
      const typeName = "banner_image";
      const expectedResult = {
        image: {
          url: "http://drupal8.content.hostname/sites/default/files/2017-07/foo.png",
          alt: "FooAltText"
        },
        captionText: "FooCaption",
        link: {
          "url": "https://foourl.example.com",
          "title": "FooLinkText"
        }
      };
      const paragraphFormatter = drupalEightDataService.makeParagraphValueFormatter(typeName, paragraphBannerImage);
      const promise = drupalEightDataService.extractFieldsByFieldNamePrefix(paragraphBannerImage, "field_", drupalEightDataService.makeParagraphFieldFormatter(typeName), paragraphFormatter);
      promise.then((output) => {
        output.should.deep.equal(expectedResult);
        done();
      });
    });
  });

  describe("extractValue", function() {
    it("should return the value field of the first element of an array", function() {
      const testValue = [
        {
          value: "mcfly"
        }
      ];
      const result = drupalEightDataService.extractValue(testValue);
      result.should.equal("mcfly");
    });
    it("should return the value field of the first element of an array, even if more than 1 element", function() {
      const testValue = [
        {
          value: "mcfly"
        },
        {
          value: "brown"
        }
      ];
      const result = drupalEightDataService.extractValue(testValue);
      result.should.equal("mcfly");
    });
  });
  describe("extractProperty", function() {
    it("should return the value of an arbitrary key from the first element of an array", function() {
      const testValue = [
        {
          mcfly: "marty"
        },
        {
          mcfly: "seamus"
        }
      ];
      const result = drupalEightDataService.extractProperty(testValue, "mcfly");
      result.should.equal("marty");
    });
  });
  describe("extractProperties", function() {
    it("should return the values of an arbitrary key from all the elements of an array", function() {
      const testValue = [
        {
          mcfly: "marty"
        },
        {
          mcfly: "seamus"
        }
      ];
      const result = drupalEightDataService.extractProperties(testValue, "mcfly");
      result.should.deep.equal(["marty", "seamus"]);
    });
  });
  describe("extractConvertedUrl", function() {
    it("should return the converted URL using the url key from the first element of an array", function() {
      const testValue = [
        {
          url: "http://localhost:8080/foo/bar/baz.txt"
        }
      ];
      const result = drupalEightDataService.extractConvertedUrl(testValue);
      result.should.equal("http://drupal8.content.hostname/foo/bar/baz.txt");
    });
    it("should return the converted URL using an arbitrary key from the first element of an array", function() {
      const testValue = [
        {
          cheeseburger: "http://localhost:8080/foo/bar/baz.txt"
        }
      ];
      const result = drupalEightDataService.extractConvertedUrl(testValue, "cheeseburger");
      result.should.equal("http://drupal8.content.hostname/foo/bar/baz.txt");
    });
  });
  describe("formatLink", function() {
    it("should return the extracted value of the first element of the given array", function() {
      const testValue = [{
        uri: "https://example.foo.com",
        title: "Foo Title",
        options: {}
      }];
      const expectedResult = {
        url: "https://example.foo.com",
        title: "Foo Title"
      };
      return drupalEightDataService.formatLink(testValue).then((result) => {
        result.should.deep.equal(expectedResult);
      });
    });
    it("should return the extracted value of the n-th element of the given array", function() {
      const testValue = [
        {
          uri: "https://example.foo.com",
          title: "Foo Title",
          options: {}
        },
        {
          uri: "https://example.bar.com",
          title: "Bar Title",
          options: {}
        }
      ];
      const expectedResult = {
        url: "https://example.bar.com",
        title: "Bar Title"
      };
      return drupalEightDataService.formatLink(testValue, 1).then((result) => {
        result.should.deep.equal(expectedResult);
      });
    });
  });
});
