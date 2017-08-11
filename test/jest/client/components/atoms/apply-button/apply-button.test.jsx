import React from "react";
import {shallow, mount} from "enzyme";

import {ApplyButton} from "client/components/atoms/";

test("Apply Button always has a button tag that reads, 'Apply'", () => {

	const mockText = "Apply";

	const mockSubmit = () => {
		return "";
	};

	const component = shallow(
		<ApplyButton submit={mockSubmit} />
	);

	expect(component.find("SmallInverseSecondaryButton").first().props().text).toBe(mockText);

});