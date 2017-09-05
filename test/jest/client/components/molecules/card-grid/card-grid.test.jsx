/*global expect*/

import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import _ from "lodash";
import {CardGrid} from "molecules";

jest.mock("client/services/client-config.js", function(){
  return {
    googleAnalytics: {
      enabled: false
    }
  };
});

test('CardGrid renders a simple 3x3 grid', () => {
  let cards = _.map(Array(9), (item, index)=> {return {text: "this is card #"+index} })
  let renderCard = (data, index)=>(<p>{data.text}</p>);
  const component = renderer.create(<CardGrid cards={cards} renderCard={renderCard}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
