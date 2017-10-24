import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import VersionsList from "client/components/atoms/versions-list/versions-list.jsx";

describe("All Versions", () => {

  const mockDocumentData = {
    "documentIdNumber": 123,
    "files": [
      {
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
      }
    ]
  };

  const mockSopData = {
    "documentIdNumber": 321,
    "documentIdType": "SOP",
    "files": [
      {
        "type": "docFile",
        "effectiveDate": "October 25, 2015",
        "expirationDate": null,
        "fileUrl": "https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt",
        "version": "2.5"
      },
      {
        "type": "docFile",
        "effectiveDate": "October 25, 2015",
        "expirationDate": null,
        "fileUrl": "https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt",
        "version": "2.5"
      }
    ]
  };

  const mockDocumentDataWithOneFile = {
    "documentIdNumber": 123,
    "files": [
      {
        "type": "docFile",
        "effectiveDate": "October 25, 2015",
        "expirationDate": null,
        "fileUrl": "https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt",
        "version": "2.5"
      }
    ]
  };

  const component = shallow(
    <VersionsList doc={mockDocumentData} />
  );

  const componentWithSop = shallow(
    <VersionsList doc={mockSopData} />
  );

  test("properly maps files array members to subsequent li tags", () => {

    expect(component.find(".allVersionsList li")).toHaveLength(mockDocumentData.files.length);
  });

  test("file array member is rendered as html structure when version, effectiveDate ARE NOT available, ", function() {

    const { documentIdNumber, files } = mockDocumentData;
    const fileIndex = 0;
    const file = files[fileIndex];

    let mockHtml = `<li><strong>Version N/A</strong>`;
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

    let mockHtml = `<li><strong>Version ${file.version}</strong>`;
    mockHtml += `<strong>|</strong>`;
    mockHtml += `Effective: ${file.effectiveDate}.`;
    mockHtml += `<a href="${files[fileIndex].fileUrl}" target="_blank">Download PDF`;
    mockHtml += `<i class="fa fa-file-pdf-o" aria-hidden="true"></i>`;
    mockHtml += `</a></li>`;

    expect(component.find(".allVersionsList li").at(fileIndex).html()).toBe(mockHtml);

  });

  // TODO: DRY
  test('file array member is rendered as html structure with the correct version label when the document type is "SOP"', function() {
    const { documentIdNumber, files } = mockSopData;
    const fileIndex = 0;
    const file = files[fileIndex];

    let mockHtml = `<li><strong>${documentIdNumber} ${file.version}</strong>`;
    mockHtml += `<strong>|</strong>`;
    mockHtml += `Effective: ${file.effectiveDate}.`;
    mockHtml += `<a href="${files[fileIndex].fileUrl}" target="_blank">Download PDF`;
    mockHtml += `<i class="fa fa-file-pdf-o" aria-hidden="true"></i>`;
    mockHtml += `</a></li>`;

    expect(componentWithSop.find(".allVersionsList li").at(fileIndex).html()).toBe(mockHtml);
  });

  test('versions list is not rendered when there is one file', function() {
    const { documentIdNumber, files } = mockDocumentDataWithOneFile;
    const fileIndex = 0;
    const file = files[fileIndex];

    let mockHtml = `<li><strong>Version ${file.version}</strong>`;
    mockHtml += `<strong>|</strong>`;
    mockHtml += `Effective: ${file.effectiveDate}.`;
    mockHtml += `<a href="${files[fileIndex].fileUrl}" target="_blank">Download PDF`;
    mockHtml += `<i class="fa fa-file-pdf-o" aria-hidden="true"></i>`;
    mockHtml += `</a></li>`;

    expect(component.find(".allVersionsList li").at(fileIndex).html()).not.toBe(mockHtml);
  });

});

