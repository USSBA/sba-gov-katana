/*global expect*/

import React from 'react';
import DocumentArticleLookup from 'client/components/molecules/document-article-lookup/document-article-lookup.jsx';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import _ from "lodash";

const submit = jest.fn();
const reset = jest.fn();
const queryChange = jest.fn();
const pageChange = jest.fn();

let lookupProps = {
  title: "This is a title",
  queryState: {},
  items: [
    {
      name: "Obi-Wan Kenobi",
      title: "Master",
      lightsaberColor: "Green",
      age: "40"
    }, {
      name: "Luke Skywalker",
      title: "Knight",
      lightsaberColor: "Blue",
      age: "20"
    }, {
      name: "Yoda",
      title: "Master",
      lightsaberColor: "Green",
      age: "900"
    }, {
      name: "Bastilla Shan",
      title: "Knight",
      lightsaberColor: "Yellow",
      age: "24"
    }
  ],
  itemCount: 42,
  pageNumber: 2,
  pageSize: 4,
  taxonomies: [
    {
      name: "Title",
      terms: ["Padawan", "Knight", "Master"]
    }, {
      name: "LightsaberColor",
      terms: ["Red", "Green", "Blue", "Yellow"]
    }
  ],
  onSubmit: submit,
  onReset: reset,
  onQueryChange: queryChange,
  onPageChange: pageChange,
  isFetching: false,
  fieldsToShowInDetails: [
    "Name", "LightsaberColor"
  ],
  type: "jedi"
}
describe("DocumentArticleLookup", () => {
  test('should render with all the information', () => {
    let props = _.clone(lookupProps);
    const component = renderer.create(<DocumentArticleLookup {...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should fire the submit when the apply button is pressed ', () => {
    let props = _.clone(lookupProps);
    const component = shallow(<DocumentArticleLookup {...props}/>);
    component.find("ApplyButton").prop("submit")();
    expect(submit).toBeCalled();
  });
  //
  // test('should show important data properly ', () => {
  //   let props = _.clone(lookupProps);
  //   const component = shallow(<DocumentArticleLookup {...props}/>);
  //   expect(component.find("Paginator").prop("pageNumber")).toEqual(props.pageNumber);
  // });

  // test('should render without a zip code ', () => {
  //   let cardData = _.omit(card, "zipCode");
  //   const component = shallow(<LinkCard {...cardData}/>);
  //   expect(component.find(".document-article-lookup-citystatezip")).toHaveLength(0);
  // });
  //
  // test('should render without the link', () => {
  //   let cardData = _.omit(card, "link");
  //   const component = shallow(<LinkCard {...cardData}/>);
  //   expect(component.find(".document-article-lookup-link")).toHaveLength(0);
  // });

})
