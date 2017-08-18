import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";

import {DocumentArticle} from "client/components/molecules/document-article/document-article.jsx";

describe("DocumentArticle", () => {
  describe("Render", () => {
    const mockArticle = [
      {
        "body": "<p>Body Text</p>",
        "category": ["Offering Circular - Debenture"],
        "officeLink": {
          "url": "http://sba.gov/office",
          "title": "Office Title"
        },
        "pdfVersion": {},
        "programs": ["SBIC"],
        "relatedDocuments": [
          {
            "activitys": ["Liquidation"],
            "body": "<p> Test Related Document Body </p>",
            "documentIdType": "SOP",
            "documentIdNumber": "10 07 1",
            "files": [
              {
                "type": "docFile",
                "effectiveDate": "2007-12-21",
                "expirationDate": "2017-07-21",
                "fileUrl": "/sites/default/files/2007-12/testpdf1.pdf",
                "version": "2"
              }, {
                "type": "docFile",
                "effectiveDate": "1987-04-21",
                "expirationDate": "2007-12-20",
                "fileUrl": "/sites/default/files/2017-07/testpdf2.pdf",
                "version": null
              }
            ],
            "officeLink": {
              "url": "https://www.sba.gov/",
              "title": "Office of Testing"
            },
            "ombNumber": {},
            "programs": ["SBIC"],
            "summary": "A related document summary",
            "type": "document",
            "title": "TEST TEST Liquidation",
            "id": 2904,
            "updated": 1501604859,
            "url": "sop-10-07-1-test-test-liquidation"
          }
        ],
        "summary": "This is a sumary",
        "type": "article",
        "title": "This is a title",
        "id": 2905,
        "updated": 1503068893,
        "url": "2017/7/18/this-summary"
      }
    ];
    const component = renderer.create(<DocumentArticle data={mockArticle}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
