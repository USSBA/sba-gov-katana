/*global expect*/

/* eslint-disable no-unused-vars,no-undef */
import React from "react";
/*eslint-enable no-unused-vars*/
import PreviousNext from "client/components/molecules/previous-next/previous-next.jsx";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import _ from "lodash";
import util from "util";

import lineageBusinessGuide from "../../test-data/lineage-business-guide.json";
import lineageForPartners from "../../test-data/lineage-for-partners.json";

describe("PreviousNext", () => {
  test("Won't render without a lineage", () => {
    // Silence console errors for this test with deliberate errors
    const origErr = console.error
    console.error = jest.fn();
    expect(renderer.create(<PreviousNext />)).toThrowErrorMatchingSnapshot();
    console.error = origErr;
  });
  describe("Business Guide", () => {
    describe("When in a middle article", () => {
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={lineageBusinessGuide}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it sets the desktop previous url appropriately", () => {
        const expectedUrl = "/business-guide/launch/pick-your-business-location-zoning-laws";
        const component = shallow(<PreviousNext lineage={lineageBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-previous-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it sets the desktop next url appropriately", () => {
        const expectedUrl = "/business-guide/launch/choose-your-business-name-register";
        const component = shallow(<PreviousNext lineage={lineageBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it sets the mobile next url appropriately", () => {
        const expectedUrl = "/business-guide/launch/choose-your-business-name-register";
        const component = shallow(<PreviousNext lineage={lineageBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
    });
    describe("When in the first article of a middle section", () => {
      const modifiedBusinessGuide = _.merge(_.cloneDeep(lineageBusinessGuide), [{},{},lineageBusinessGuide[1].children[0]]);
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={modifiedBusinessGuide}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it assigns Previous Article to the last article of the previous section", () => {
        const expectedUrl = "/business-guide/plan/buy-existing-business-franchise";
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-previous-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
    });
    describe("When in the last article of a middle section", () => {
      const modifiedBusinessGuide = _.merge(_.cloneDeep(lineageBusinessGuide), [{},{},_.last(lineageBusinessGuide[1].children)]);
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={modifiedBusinessGuide}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it assigns Next Article to the first article of the next section", () => {
        const expectedUrl = "/business-guide/manage/manage-your-finances-business-credit";
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
    });
    describe("When in the first article of the first section", () => {
      const modifiedBusinessGuide = _.merge(_.cloneDeep(lineageBusinessGuide), [
        {},
        _.first(lineageBusinessGuide[0].children),
        _.first(_.first(lineageBusinessGuide[0].children).children)
      ]);
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={modifiedBusinessGuide}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it sets the desktop next url appropriately", () => {
        const expectedUrl = "/business-guide/plan/write-your-business-plan-template";
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it sets the mobile next url appropriately", () => {
        const expectedUrl = "/business-guide/plan/write-your-business-plan-template";
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it does not have a desktop Previous Article element", () => {
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-previous-url").exists()).toBe(false);
      });
    });
    describe("When in the last article of the last section", () => {
      const modifiedBusinessGuide = _.merge(_.cloneDeep(lineageBusinessGuide), [
        {},
        _.last(lineageBusinessGuide[0].children),
        _.last(_.last(lineageBusinessGuide[0].children).children)
      ]);
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={modifiedBusinessGuide}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it sets the desktop previous url appropriately", () => {
        const expectedUrl = "/business-guide/grow/native-american-owned-businesses-programs";
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-previous-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it does not have a Next Article element", () => {
        const component = shallow(<PreviousNext lineage={modifiedBusinessGuide} />);
        expect(component.find("#desktopDivId .previousnext-next-url").exists()).toBe(false);
      });
    });
  });
  describe("For Partners", () => {
    describe("When in a middle article", () => {
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={lineageForPartners}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it sets the desktop previous url appropriately", () => {
        const expectedUrl = "/for-partners/lenders/7a-loans/operate-as-a-7a-lender";
        const component = shallow(<PreviousNext lineage={lineageForPartners} />);
        expect(component.find("#desktopDivId .previousnext-previous-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it sets the desktop next url appropriately", () => {
        const expectedUrl = "/for-partners/lenders/7a-loans/training-and-courses";
        const component = shallow(<PreviousNext lineage={lineageForPartners} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it sets the mobile next url appropriately", () => {
        const expectedUrl = "/for-partners/lenders/7a-loans/training-and-courses";
        const component = shallow(<PreviousNext lineage={lineageForPartners} />);
        expect(component.find("#mobileDivId .previousnext-next-url").props().href).toBe(expectedUrl);
      });
    });
    describe("When in the first article of a section", () => {
      const modifiedLineageForPartners = _.merge(_.cloneDeep(lineageForPartners), [{},{},{},lineageForPartners[2].children[0]]);
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={modifiedLineageForPartners}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it does not have a desktop Previous Article element", () => {
        const component = shallow(<PreviousNext lineage={modifiedLineageForPartners} />);
        expect(component.find("#desktopDivId .previousnext-previous-url").exists()).toBe(false);
      });
      test("it sets the desktop next url appropriately", () => {
        const expectedUrl = "/for-partners/lenders/7a-loans/operate-as-a-7a-lender";
        const component = shallow(<PreviousNext lineage={modifiedLineageForPartners} />);
        expect(component.find("#desktopDivId .previousnext-next-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
      test("it sets the mobile next url appropriately", () => {
        const expectedUrl = "/for-partners/lenders/7a-loans/operate-as-a-7a-lender";
        const component = shallow(<PreviousNext lineage={modifiedLineageForPartners} />);
        expect(component.find("#mobileDivId .previousnext-next-url").props().href).toBe(expectedUrl);
      });
    });
    describe("When in the last article of a section", () => {
      const modifiedLineageForPartners = _.merge(_.cloneDeep(lineageForPartners), [{},{},{},_.last(lineageForPartners[2].children)]);
      test("it renders properly", () => {
        const component = renderer.create(<PreviousNext lineage={modifiedLineageForPartners}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
      test("it does not have a Next Article element", () => {
        const component = shallow(<PreviousNext lineage={modifiedLineageForPartners} />);
        expect(component.find("#desktopDivId .previousnext-next-url").exists()).toBe(false);
      });
      test("it sets the desktop previous url appropriately", () => {
        const expectedUrl = "/for-partners/lenders/7a-loans/training-and-courses";
        const component = shallow(<PreviousNext lineage={modifiedLineageForPartners} />);
        expect(component.find("#desktopDivId .previousnext-previous-url SmallSecondaryButton").props().url).toBe(expectedUrl);
      });
    });
  });
});
