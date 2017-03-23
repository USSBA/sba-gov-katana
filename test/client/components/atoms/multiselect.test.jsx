/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import MultiSelect from '../../../src/client/components/atoms/multiselect.jsx';
import renderer from 'react-test-renderer';


test('MultiSelect', () => {
    const component = renderer.create(
        <MultiSelect    label="In what industry is your business?"
                        name="industryType" 
                        onChange={ this.handleSelectChange.bind(this) } 
                        getValidationState={ this.state.validStates["industryType"] } 
                        value={ this.state.industryInfoFields.industryType }
                        options={ industryTypeOptions } 
                        autoFocus 
                        required 
                        maxValues={ 3 }>
        </MultiSelect>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
