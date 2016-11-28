import React from 'react';
import { LoanInfo } from '../../../../../src/client/components/loan-form/loan-info.jsx'
import renderer from 'react-test-renderer';


test('LoanInfo page renders inputs', () => {
    const component = renderer.create(
        <LoanInfo />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
