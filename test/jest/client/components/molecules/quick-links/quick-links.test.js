import React from "react";
import { QuickLinks } from "client/components/molecules/quick-links/quick-links.jsx";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

jest.mock("client/services/client-config.js", function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  };
});

const fetchContentIfNeeded = jest.fn();

describe("QuickLinks", () => {

  test("to match snapshot", () => {

    const testProps = {
      actions: {
        fetchContentIfNeeded: fetchContentIfNeeded
      },
      navigation: {
        locationChange: {}
      }
    };

    const mockItem = {
      type: "quickLinks",
      typeOfLinks: [
        {
          type: "documentLookup",
          documentActivity: [],
          documentProgram: ["CDC/504"],
          documentType: ["SOP"],
          sectionHeaderText: "SOPs"
        },
        {
          type: "documentLookup",
          documentActivity: [],
          documentProgram: ["7(a)"],
          documentType: ["Information notice"],
          sectionHeaderText: "Policy guidance"
        },
        {
          type: "ratesList",
          rate: [
            {
              type: "rate",
              name: "SBA LIBOR Base Rate",
              percent: 4.08
            },
            {
              type: "rate",
              name: "SBA Peg Rate",
              percent: 6.08
            },
            {
              type: "rate",
              name: "SBA FIXED Base Rate",
              percent: 2.625
            }
          ],
          sectionHeaderText: "Rates"
        }, {
          type: "articleLookup",
          articleProgram: null,
          sectionHeaderText: "Articles"
        }
      ]
    };

    const component = renderer.create(<QuickLinks data={ mockItem } {...testProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  test("SOP number and most recent version displayed", () => {
    const mockData = {
      type: "quickLinks",
      typeOfLinks: [
        {
          type: "documentLookup",
          documentActivity: [],
          documentProgram: ["CDC/504"],
          documentType: ["SOP"],
          sectionHeaderText: "SOPs"
        }
      ]};
      const mockDocuments = {
        count: 5,
        items: [
          {
            activitys: ["Authorization", "General", "Closing", "Credit and risk", "Investment and transactions"],
            documentIdNumber: "873",
            documentIdType: "SOP",
            files: [{
              type: "docFile",
              effectiveDate: "1991-03-26",
              expirationDate: "2013-09-03",
              fileUrl: "",
              version: "1A"
            },
            {
              type: "docFile",
              effectiveDate: "2013-09-04",
              expirationDate: "2015-09-03",
              fileUrl: "",
              version: "1B"
            },
            {
              type: "docFile",
              effectiveDate: "2016-09-04",
              expirationDate: "2020-09-03",
              fileUrl: "",
              version: "2"
            }],
            id: 3390,
            officeLink: {
              url: "",
              title: "Office Title"},
            ombNumber: "52",
            programs: ["Lending programs", "CDC/504", "Microloans", "SBA operations", "Surety Bonds", "HUBZone", "Disaster assistance"],
            summary: "This is the summary of the first document",
            title: "Document Title 1",
            type: "document",
            updated: 1501764139,
            url: "sop-873-document-title-1"
          }
        ]
    };
    const testProps = {
      actions: {
        fetchContentIfNeeded: fetchContentIfNeeded
      },
      navigation: {
        locationChange: {}
      },
      data: mockData,
      "documents-0": mockDocuments
    };

    const component = renderer.create(<QuickLinks {...testProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("SOP number and no future version", () => {
    // Date.now will return 11/12/2017
    Date.now = jest.fn(() => 1510536484927);
    const currentDate = Date.now();
    const futureEffectiveDate = new Date(2510536484927);
    const futureExpirationDate = new Date(3510536484927);
    const mockData = {
      type: "quickLinks",
      typeOfLinks: [
        {
          type: "documentLookup",
          documentActivity: [],
          documentProgram: ["CDC/504"],
          documentType: ["SOP"],
          sectionHeaderText: "SOPs"
        }
      ]};
      const mockDocuments = {
        count: 5,
        items: [
          {
            activitys: ["Authorization", "General", "Closing", "Credit and risk", "Investment and transactions"],
            documentIdNumber: "691",
            documentIdType: "SOP",
            files: [{
              type: "docFile",
              effectiveDate: "1991-03-26",
              expirationDate: "2013-09-03",
              fileUrl: "",
              version: "1"
            },
            {
              type: "docFile",
              effectiveDate: futureEffectiveDate, 
              expirationDate: futureExpirationDate,
              fileUrl: "",
              version: "2"
            }],
            id: 3386,
            officeLink: {
              url: "",
              title: "Office Title"},
            ombNumber: "503",
            programs: ["Contracting", "7(a)", "CDC/504", "SBA operations", "SBIC", "Surety Bonds", "Disaster assistance"],
            summary: "This is the summary of the second document",
            title: "Document Title 2",
            type: "document",
            updated: 1501764139,
            url: "sop-691-document-title-2"
          }
        ]
    };
    const testProps = {
      actions: {
        fetchContentIfNeeded: fetchContentIfNeeded
      },
      navigation: {
        locationChange: {}
      },
      data: mockData,
      "documents-0": mockDocuments
    };

    const component = renderer.create(<QuickLinks {...testProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("SOP number and no version", () => {
      const mockData = {
      type: "quickLinks",
      typeOfLinks: [
        {
          type: "documentLookup",
          documentActivity: [],
          documentProgram: ["CDC/504"],
          documentType: ["SOP"],
          sectionHeaderText: "SOPs"
        }
      ]};
      const mockDocuments = {
        count: 5,
        items: [
          {
            activitys: ["Authorization", "General", "Closing", "Credit and risk", "Investment and transactions"],
            documentIdNumber: "42",
            documentIdType: "SOP",
            files: [{
              type: "docFile",
              effectiveDate: "1991-03-26",
              expirationDate: "1992-09-03",
              fileUrl: "",
              version: ""
            },
            {
              type: "docFile",
              effectiveDate: "1992-09-04", 
              expirationDate: "1993-09-03",
              fileUrl: "",
              version: ""
            },
            {
              type: "docFile",
              effectiveDate: "1993-09-04",
              expirationDate: "1994-09-03",
              fileUrl: "",
              version: ""
            },
            {
              type: "docFile",
              effectiveDate: "1994-09-04", 
              expirationDate: "1995-09-03",
              fileUrl: "",
              version: ""
            },
            {
              type: "docFile",
              effectiveDate: "1995-09-04",
              expirationDate: "2013-09-03",
              fileUrl: "",
              version: ""
            },
            {
              type: "docFile",
              effectiveDate: "2013-09-04", 
              expirationDate: "2020-09-03",
              fileUrl: "",
              version: ""
            }],
            id: 3399,
            officeLink: {
              url: "",
              title: "Office Title"},
            ombNumber: "97",
            programs: ["Contracting", "7(a)", "CDC/504", "SBA operations", "SBIC", "Surety Bonds", "Disaster assistance"],
            summary: "This is the summary of the third document",
            title: "Document Title 3",
            type: "document",
            updated: 1501764139,
            url: "sop-42-document-title-3"
          }
        ]
    };
    const testProps = {
      actions: {
        fetchContentIfNeeded: fetchContentIfNeeded
      },
      navigation: {
        locationChange: {}
      },
      data: mockData,
      "documents-0": mockDocuments
    };

    const component = renderer.create(<QuickLinks {...testProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
