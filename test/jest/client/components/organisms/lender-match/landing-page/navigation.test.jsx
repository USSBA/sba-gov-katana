/*global expect, jest*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import {Navigation} from 'client/components/organisms/lender-match/landing-page/navigation.jsx';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

jest.mock('client/services/analytics.js', function(){
    // console.log(arguments);
});

test('Navigation renders two buttons', () => {
    const component = renderer.create(
        <Navigation />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
