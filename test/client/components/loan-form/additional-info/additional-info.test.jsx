import React from 'react';
import { AdditionalInfoForm } from '../../../../../src/client/components/lender-match/additional-info.jsx';
import renderer from 'react-test-renderer';

test('AdditionalInfo page renders input fields', () => {
    const component = renderer.create(
        <AdditionalInfoForm />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})