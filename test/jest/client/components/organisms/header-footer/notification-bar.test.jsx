import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import NotificationBar from "client/components/organisms/header-footer/notification-bar.jsx";

describe("NotificationBar", () => {

	test("first div tag should contain mockDescription value", function() {

		const mockDescription = "test description";
		const component = shallow(<NotificationBar description={mockDescription} />);

		expect(component.find(".description").text()).toBe(mockDescription);

	});

	test("image tag should fire mockFunction call when clicked", function() {

		const mockFunction = jest.fn();
		const component = shallow(<NotificationBar onClose={mockFunction} />);

		component.find("img").first().simulate("click");

		expect(mockFunction).toHaveBeenCalledTimes(1);

	});

	test("a tag should read, 'LEARN MORE'", function() {


		const mockLabel = "LEARN MORE";
		const component = shallow(<NotificationBar />);

		expect(component.find("a").first().text()).toBe(mockLabel);

	});

	test("a tag url should be value of mockUrl value", function() {

		const mockUrl = "#";
		const component = shallow(<NotificationBar url={mockUrl} />);

		expect(component.find("a").first().props().href).toBe(mockUrl);

	});

});