/* eslint-disable no-unused-vars,no-undef */
import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import _ from "lodash";
/*eslint-enable no-unused-vars*/

// Quiet warnings about OnTouchTap
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import {BasicLink} from "client/components/atoms";

describe("BasicLink", () => {
  describe("normal link", () => {
    const defaultProps = {
      url: "/hello/world",
      text: "Hello, World!"
    };
    test("Renders as expected", () => {
      const component = renderer.create(<BasicLink {...defaultProps} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("Renders a button element", () => {
      const component = shallow(<BasicLink {...defaultProps}/>);
      expect(component.type()).toEqual("a");
    });
    test("Sets the element class", () => {
      const className = "cheeseburger"
      const componentProps = _.merge(_.clone(defaultProps), {myClassName: className});
      const component = shallow(<BasicLink {...componentProps}/>);
      expect(component.props().className).toEqual(className);
    });
    test("Sets arbitrary html properties on the element", () => {
      const customStyle = "color:green";
      const componentProps = _.merge(_.clone(defaultProps), {style: customStyle});
      const component = shallow(<BasicLink {...componentProps}/>);
      expect(component.props().style).toEqual(customStyle);
    });
    test("Assigns a provided onClick to onTouchTap", () => {
      const customOnClick = () => {return "myOnClick";};
      const componentProps = _.merge(_.clone(defaultProps), {onClick: customOnClick});
      const component = shallow(<BasicLink {...componentProps}/>);
      expect(component.props().onTouchTap()).toEqual("myOnClick");
    });

  });
  describe("button link", () => {
    const defaultProps = {
      url: "/hello/world",
      text: "Hello, World!",
      htmlElement: "button"
    };
    test("Renders as expected", () => {
      const component = renderer.create(<BasicLink {...defaultProps}/>);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("Renders a button element", () => {
      const component = shallow(<BasicLink {...defaultProps}/>);
      expect(component.type()).toEqual("button");
    });
  });
});