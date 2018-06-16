/*global expect*/

import React from 'react'
import { TextInput } from 'atoms'
import { shallow } from 'enzyme'

test('TextInput', () => {
  let lastValue = ''
  function handleChange(event) {
    // console.log(lastValue);
    lastValue = event.target.value
  }
  function onBlur(event) {
    // console.log("onBlur");
  }
  function onFocus(event) {
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
  component.find('input').simulate('change', { target: { value: 'Han Solo' } })
  expect(lastValue).toEqual('Han Solo')
})
