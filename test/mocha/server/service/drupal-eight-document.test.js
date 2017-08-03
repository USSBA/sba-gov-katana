import _ from "lodash";
import sinon from "sinon";
import Promise from "bluebird";

import documentData from "./data/document/documents.json";
import * as drupalService from "../../../../src/service/drupal-eight.js";

let value = drupalService.filterAndSortDocuments(
	{
		search: "",
		type: "SOP",
		program: "All",
		activity: "All",
		sortBy: "Number",
		start: "0",
		end: "0"
	},
	documentData
);

console.log(value);

// describe("Drupal 8 Document Service", function() {
// 	describe("filterDocuments", function() {
// 		it("should filter types, programs and activities", () => {
// 			drupalService
// 				.filterDocuments(
// 					{
// 						search: "",
// 						type: "asldkfjals",
// 						program: "slkdfjlsj",
// 						activity: "asdfasf",
// 						start: "1",
// 						end: "10"
// 					},
// 					documentData
// 				)
// 				.should.equal([]);
// 		});
// 	});
// });
