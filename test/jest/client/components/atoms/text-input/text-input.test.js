/*global expect*/

import React from 'react'
import { TextInput } from 'atoms'
import { shallow } from 'enzyme'

test('TextInput', () => {
  let lastValue = ''
  function handleChange(newValue) {
    // console.log(lastValue);
    lastValue = newValue
  }
  function onBlur(newValue) {
    // console.log("onBlur");
  }
  function onFocus(newValue) {
    // console.log("onFocus");
  }
  const component = shallow(
    <TextInput
      id="lender-match-name"
      errorText={'Error Thing'}
      label="What is your full name?"
      name="contactFullName"
      onChange={handleChange}
      value={lastValue}
      validationState={null}
      autoFocus
      onBlur={onBlur}
      onFocus={onFocus}
    />
  )
  const event = {
    target: {
      value: 'Han Solo'
    }
  }
  component.find('input').simulate('change', event)
  expect(lastValue).toEqual('Han Solo')
})
