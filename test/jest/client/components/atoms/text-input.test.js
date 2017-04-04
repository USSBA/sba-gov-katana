/*global expect*/

import React from 'react';
import TextInput from 'client/components/atoms/text-input.jsx';
import {shallow} from 'enzyme';


test('TextInput', () => {
    let lastValue = "";
    function handleChange(newValue){
        console.log(lastValue);
        lastValue = newValue;
    }
    function onBlur(newValue){
        console.log("onBlur");
    }
    function onFocus(newValue){
        console.log("onFocus");
    }
    const component = shallow(
        <TextInput
             id="lender-match-name"
             errorText={"Error Thing"}
             label="What is your full name?"
             name="contactFullName"
             handleChange={handleChange}
             value={lastValue}
             getValidationState={null}
             autoFocus
             onBlur={onBlur}
             onFocus={onFocus}
        />
    );
    component.find("input").simulate('change',"Han Solo");
    expect(lastValue).toEqual("Han Solo");
});
