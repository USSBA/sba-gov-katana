/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import SuccessPage from 'client/components/success-page/success-page.jsx';
import renderer from 'react-test-renderer';


test('SuccessPage renders', () => {
    const component = renderer.create(
        <SuccessPage>

        </SuccessPage>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
