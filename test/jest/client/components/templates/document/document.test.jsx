import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";

import DocumentPage from "client/components/templates/document/document.jsx";

describe("Document", () => {

  describe("All Versions", () => {

    const mockDocumentData = {
      "documentIdNumber": 123,
      "files": [{
        "type": "docFile",
        "effectiveDate": null,
        "expirationDate": null,
        "fileUrl": "#",
        "version": null
      },
        {
          "type": "docFile",
          "effectiveDate": "October 25, 2015",
          "expirationDate": null,
          "fileUrl": "https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt",
          "version": "2.5"
        }]
    };

    const component = shallow(
      <DocumentPage document={mockDocumentData} />
    );

    test("properly maps files array members to subsequent li tags", () => {

      expect(component.find(".allVersionsList li")).toHaveLength(mockDocumentData.files.length);

    });

    test("file array member is rendered as html structure when version, effectiveDate ARE NOT available, ", function() {

      const { documentIdNumber, files } = mockDocumentData;
      const fileIndex = 0;
      const file = files[fileIndex];

      let mockHtml = `<li><strong>Version: N/A</strong>`;
      mockHtml += `<strong>|</strong>`;
      mockHtml += `Effective: N/A.`;
      mockHtml += `<a href="${file.fileUrl}" target="_blank">Download PDF`;
      mockHtml += `<i class="fa fa-file-pdf-o" aria-hidden="true"></i>`;
      mockHtml += `</a></li>`;

      expect(component.find(".allVersionsList li").at(fileIndex).html()).toBe(mockHtml);

    });

    test("file array member is rendered as html structure when a version, effectiveDate ARE available, ", function() {

      const { documentIdNumber, files } = mockDocumentData;
      const fileIndex = 1;
      const file = files[fileIndex];

      let mockHtml = `<li><strong>Version ${documentIdNumber} ${file.version}</strong>`;
      mockHtml += `<strong>|</strong>`;
      mockHtml += `Effective: ${file.effectiveDate}.`;
      mockHtml += `<a href="${mockDocumentData.files[fileIndex].fileUrl}" target="_blank">Download PDF`;
      mockHtml += `<i class="fa fa-file-pdf-o" aria-hidden="true"></i>`;
      mockHtml += `</a></li>`;

      expect(component.find(".allVersionsList li").at(fileIndex).html()).toBe(mockHtml);

    });

  });

});
