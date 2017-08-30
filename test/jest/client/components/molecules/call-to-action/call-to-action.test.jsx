
import React from "react";
import {CallToAction} from "client/components/molecules/call-to-action/call-to-action.jsx";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import _ from "lodash";

describe("CallToAction", () => {
  const ctaOptions = {
    btnUrl: "http://www.example.com/",
    btnTitle: "Call To Action",
    image: "http://example.com/someImage.jpg",
    imageAlt: "alt text for image",
    headline: "This is the headline for the CTA.",
    blurb: "This is the blurb for the CTA."
  };
  test("renders a small size", () => {
    const component = renderer.create(<CallToAction size="small" {...ctaOptions}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renders a medium size", () => {
    const component = renderer.create(<CallToAction size="medium" {...ctaOptions}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renders a large size", () => {
    const component = renderer.create(<CallToAction size="large" {...ctaOptions}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renders a button only", () => {
    const component = renderer.create(<CallToAction size="Button only" {...ctaOptions}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
