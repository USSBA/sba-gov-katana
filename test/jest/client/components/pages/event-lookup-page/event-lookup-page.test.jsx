import React from 'react'
import { shallow, mount } from 'enzyme'
import EventLookupPage from 'pages/event-lookup-page/event-lookup-page.jsx'
import { TextInput } from 'atoms'

describe('EventLookupPage', () => {
  // When a user enters a zip code containing characters are not equal to 5 digits, show an error
  it('should show a zip code error when characters are not equal to 5 digits', () => {
    const component = mount(<EventLookupPage />)
    const incorrectlyFormattedZipCode = 'slkd'
    const zipInput = component.find('#zip')
    zipInput.simulate('focus')
    zipInput.simulate('change', { target: { value: incorrectlyFormattedZipCode } })
    zipInput.simulate('blur')
    const expected = 1
    const result = component.find('#zip-error')
    expect(result).toHaveLength(expected)
  })
  // When a user enters a zip code containing characters are equal to 5 digits, do not show an error
  it('should not show a zip code error when characters are equal to 5 digits', () => {
    const component = mount(<EventLookupPage />)
    const correctlyFormattedZipCode = '23938'
    const zipInput = component.find('#zip')
    zipInput.simulate('focus')
    zipInput.simulate('change', { target: { value: correctlyFormattedZipCode } })
    zipInput.simulate('blur')
    const expected = 0
    const result = component.find('#zip-error')
    expect(result).toHaveLength(expected)
  })
})
