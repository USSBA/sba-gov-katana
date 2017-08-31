/*global expect*/

/*eslint-disable no-unused-vars*/
import React from "react";
/*eslint-enable no-unused-vars*/
import ReactSelect from "react-select";
import {MiniNav} from "client/components/organisms/header-footer/mini-nav/mini-nav.jsx";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import _ from "lodash";

// revist after DT-1655
test.skip('Enter on Search Toggle should open the search bar', () => {
    
    const component = shallow(
        <MiniNav />
    );
    component.find("#search-toggle").simulate('keyDown',{keyCode: 13});
    expect(component.contains("#search-input")).toBeDefined();

});
/**/