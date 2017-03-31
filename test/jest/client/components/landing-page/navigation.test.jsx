/*global expect, jest*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import Navigation from 'client/components/landing-page/navigation.jsx';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('Navigation renders two buttons', () => {
    const component = renderer.create(
        <Navigation />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});

test('that the "Find Lenders" button fires a push event', () => {
    const component = shallow(
        <Navigation />
    );
    jest.mock(component.browserHistory);
    // component.find('Button#landing-page-button-find-lenders').simulate("click");
    // expect(component);
});
