/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import LincMain from '../../../src/client/components/linc-main.jsx';
import renderer from 'react-test-renderer';


test('LincMain renders', () => {
  const component = renderer.create(
    <LincMain>
        <div> Test </div>
    </LincMain>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});