import React from "react";
import {shallow} from "enzyme";

import {ApplyButton} from "atoms";

describe("ApplyButton", () => {

	test("the label should read, 'Apply'", () => {

		const mockText = "Apply";
		const component = shallow(<ApplyButton />);
		const expectedText = component.find("SmallInverseSecondaryButton").first().props().text;

		expect(expectedText).toBe(mockText);

	});

	test("expect mockSubmit to have been called once", () => {

		const mockSubmit = jest.fn();
		const component = shallow(<ApplyButton submit={mockSubmit} />);

		component.find("SmallInverseSecondaryButton").first().simulate("click");
		
		expect(mockSubmit).toHaveBeenCalledTimes(1);

	});

});

