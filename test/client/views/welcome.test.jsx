/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import Welcome from '../../../client/views/welcome.jsx';
import renderer from 'react-test-renderer';

console.log(Welcome);

test('Welcome displays a name', () => {
  const component = renderer.create(
    <Welcome name="Jon" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});