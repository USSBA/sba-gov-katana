import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {NotificationBar} from "client/components/organisms/header-footer/notification-bar.jsx";

jest.mock("client/services/client-config.js", function(){
    return {
        isUserLoggedIn: false
    };
});

describe("NotificationBar", () => {

	test("Can NotificationBar contain a message?", function() {

	});

});