import React from "react";
import {shallow} from "enzyme";
let sinon = require('sinon');

import SearchBox from "client/components/organisms/search-box/search-box.jsx";

describe("searchBox", () => {

	// has 1 h2 tag
	// has 1 search field
	// has 1 multiselect control
	// has 1 button
		// button reads "Submit"
		// fires an onClick event

	test("has 1 h2 tag", () => {

		const component = shallow(<SearchBox />);
		expect(component.find("h2")).toHaveLength(1);

	});

	test("has 1 TextInput Component", () => {

		const component = shallow(<SearchBox />);
		expect(component.find("TextInput")).toHaveLength(1);

	});

	test("has 1 Multiselect Component", () => {

		const component = shallow(<SearchBox />);
		expect(component.find(".multiSelect")).toHaveLength(1);

	});

	test("has 1 Submit Button Component", () => {

		const component = shallow(<SearchBox />);
		expect(component.find("SmallInversePrimaryButton")).toHaveLength(1);

	});

	test("Submit Button Component reads, 'Submit'", () => {

		const mockText = "Submit";
		const component = shallow(<SearchBox />);
		const expectedText = component.find("SmallInversePrimaryButton").first().props().text;
		expect(expectedText).toBe(mockText);

	});

	/* To Do: this test needs to be fleshed out more
	// for some reason 'preventDefault' is not stopping the submit call from executing/
	// This causes the following error:
	// ---
	// TypeError: Could not parse "/document/?search=&type=SBA form&program=8(a)&activity=All" as a URL
	// ---

	test("Submit Button fires 'submit' when onClick is invoked", () => {

		const preventDefault = jest.fn();
		const component = shallow(<SearchBox />);
		const instance = component.instance();
		const spy = sinon.spy(instance, "submit");
		instance.forceUpdate();
		component.find("SmallInversePrimaryButton").first().simulate("click", { preventDefault });		

		sinon.assert.calledOnce(spy);

	});
	*/

});