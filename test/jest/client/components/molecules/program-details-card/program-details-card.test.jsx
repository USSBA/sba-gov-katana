import React from "react";
import {ProgramDetailsCard} from "molecules";
import {shallow} from "enzyme";

describe("ProgramDetailsCard", () => {

	test("should have one h4", () => {

		const component = shallow(<ProgramDetailsCard />);
		expect(component.find("h4")).toHaveLength(1);

	});

	test("should have one DecorativeDash", () => {

		const component = shallow(<ProgramDetailsCard />);
		expect(component.find("DecorativeDash")).toHaveLength(1);

	});

	test("should have one BasicLink", () => {

		const component = shallow(<ProgramDetailsCard />);
		expect(component.find("BasicLink")).toHaveLength(1);

	});

});