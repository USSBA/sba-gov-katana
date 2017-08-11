import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";

import Document from "client/components/templates/document/document.jsx";
import RelatedDocumentCards from "client/components/organisms/related-document-cards/related-document-cards.jsx";

test("Document Component renders Document Article, Previous Versions List and Related Documents", () => {

	const mockDocumentData = {
		"activitys": ["Liquidation"],
		"body": {},
		"documentIdType": "SOP",
		"documentIdNumber": "2143",
		"files": [{
			"type": "docFile",
			"effectiveDate": null,
			"expirationDate": null,
			"fileUrl": "https://content.sbagov.fearlesstesters.com/sites/default/files/2017-08/Special%20Text%20Document_1.txt",
			"version": null
		}],
		"officeLink": {},
		"ombNumber": "asdf",
		"programs": ["Contracting", "7(a)", "Microloans", "SBA operations", "SBIC"],
		"relatedDocuments": [],
		"summary": "Test document for ordering",
		"type": "document",
		"title": "Z Document",
		"id": 3410,
		"updated": 1502131955,
		"url": "sop-2143-z-document"
	};

	const component = shallow(
		<Document document={mockDocumentData} />
	);

	expect(component.find(".previousVersionsList")).toHaveLength(1);

});