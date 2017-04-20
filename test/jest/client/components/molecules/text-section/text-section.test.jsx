/*global expect*/

import React from 'react';
import TextSection from 'client/components/molecules/text-section/text-section.jsx';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

test('TextSection renders a simple paragraph', () => {
  let text = "<p>test</p>";
  const component = renderer.create(<TextSection text={text} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('TextSection renders several paragraph', () => {
  let text = "<p>test</p><p>test</p><p>test</p>";
  const component = renderer.create(<TextSection text={text} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextSection renders several paragraphs with an unordered list in the middle', () => {
  let text = "<p>test</p><ul><li>1</li>1<li></li></ul><p>test</p>";
  const component = renderer.create(<TextSection text={text} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
