/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactSelect from 'react-select';
import MobileNav from 'client/components/organisms/header-footer/mobile-nav/mobile-nav.jsx';
import {
  shallow
} from 'enzyme';
import renderer from 'react-test-renderer';
import _ from 'lodash';

jest.mock("client/services/client-config.js", function() {
  return {
    isUserLoggedIn: false,
    googleAnalytics: {
      enabled: false
    }
  };
});

test('Mobile Navigation has the correct structure', () => {
  const component = renderer.create( <MobileNav/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// TODO add test here for to render more than just an empty menu
