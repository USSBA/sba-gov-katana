import React from 'react';
import { LoanInfo } from 'client/components/lender-match/loan-info.jsx'
import renderer from 'react-test-renderer';


test('LoanInfo page renders inputs', () => {
    const component = renderer.create(
        <LoanInfo />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
