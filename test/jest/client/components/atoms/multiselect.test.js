/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactSelect from 'react-select';
import MultiSelect from 'client/components/atoms/multiselect.jsx';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';


// Does not appear to work with React-Select
// test('MultiSelect render', () => {
//     function handleChange(){
//
//     }
//     const component = renderer.create(
//         <MultiSelect    label="Some Label"
//                         name="somename"
//                         onChange={ handleChange }
//                         getValidationState={ "success" }
//                         value={ "A,B,C"}
//                         options={ ["A","B","C","D","E","F","G","H"] }
//                         autoFocus
//                         required
//                         maxValues={ 3 }>
//         </MultiSelect>
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });



test('MultiSelect maximum values', () => {
    let lastValue = "A,B,C";
    function handleChange(newValue){
        console.log(lastValue);
        lastValue = newValue;
        console.log(lastValue);
    }
    const component = shallow(
        <MultiSelect    label="Some Label"
                        name="somename"
                        onChange={ handleChange}
                        getValidationState={ "success" }
                        value={ lastValue }
                        options={ ["A","B","C","D","E","F","G","H"] }
                        autoFocus
                        required
                        maxValues={ 3 }>
        </MultiSelect>
    );
    component.find(ReactSelect).simulate('change',["B"]);
    expect(lastValue).toEqual("B");
    component.find(ReactSelect).simulate('change',["A","B"]);
    expect(lastValue).toEqual("A,B");
    component.find(ReactSelect).simulate('change',["A","B","C"]);
    expect(lastValue).toEqual("A,B,C");
    component.find(ReactSelect).simulate('change',["A","B","C","D"]);
    expect(lastValue).toEqual("A,B,C");
});
