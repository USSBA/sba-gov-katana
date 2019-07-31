import React from 'react'
import { mount } from 'enzyme'

import EventLookupPage, { getDateRange } from 'pages/event-lookup-page/event-lookup-page.jsx'
import { MultiSelect } from 'atoms'
import moment from 'moment'

describe('EventLookupPage', () => {
  // When a user enters a zip code containing characters are not equal to 5 digits, show an error
  it('should show a zip code error when characters are not equal to 5 digits', () => {
    const component = mount(<EventLookupPage />)
    const incorrectlyFormattedZipCode = 'slkd'
    const zipInput = component.find('input#zip')
    zipInput.simulate('focus')
    zipInput.simulate('change', { target: { value: incorrectlyFormattedZipCode } })
    zipInput.simulate('blur')
    // console.log(zipInput.debug())
    // console.log(zipInput.find('input').get(0).value)
    const expected = 1
    const result = component.find('#zip-error')
    component.update()
    // console.log(zipInput.debug())
    expect(result).toHaveLength(expected)
  })

  // When a user enters a zip code containing characters are equal to 5 digits, do not show an error
  it('should not show a zip code error when characters are equal to 5 digits', () => {
    const component = mount(<EventLookupPage />)
    const correctlyFormattedZipCode = '23938'
    const zipInput = component.find('input#zip')
    zipInput.simulate('focus')
    zipInput.simulate('change', { target: { value: correctlyFormattedZipCode } })
    zipInput.simulate('blur')
    const expected = 0
    const result = component.find('#zip-error')
    expect(result).toHaveLength(expected)
  })

  it('should disable the distance dropdown when zip code input is empty', () => {
    const component = mount(<EventLookupPage />)
    const zipCode = ''
    const zipInput = component.find('input#zip')
    zipInput.simulate('focus')
    zipInput.simulate('change', { target: { value: zipCode } })
    zipInput.simulate('blur')

    // distance is the second MultiSelect component on the page
    const distanceComponent = component.find(MultiSelect).get(1)
    expect(distanceComponent.props.disabled).toBe(true)
  })

  it('should NOT disable the distance dropdown when zip code input is NOT empty', () => {
    const component = mount(<EventLookupPage />)
    const zipCode = '23938'
    const zipInput = component.find('input#zip')
    zipInput.simulate('focus')
    zipInput.simulate('change', { target: { value: zipCode } })
    zipInput.simulate('blur')

    // distance is the second MultiSelect component on the page
    const distanceComponent = component.find(MultiSelect).get(1)
    expect(distanceComponent.props.disabled).toBe(false)
  })

  describe('getDateRange function', () => {
    it('should return the formatted start date for the all option', () => {
      const baseTime = moment('2019-07-31T18:18:36Z').utc()
      const result = getDateRange(baseTime, 'all')
      const expectedResult = '2019-07-31T18:18:36Z'
      expect(result).toBe(expectedResult)
    })

    it('should return the formatted date range for the today option', () => {
      const baseTime = moment('2019-07-31T18:18:36Z').utc()
      const result = getDateRange(baseTime, 'today')
      const expectedResult = '2019-07-31T18:18:36Z,2019-07-31T23:59:59Z'
      expect(result).toBe(expectedResult)
    })

    it('should return the formatted date range for the tomorrow option', () => {
      const baseTime = moment('2019-07-31T18:18:36Z').utc()
      const result = getDateRange(baseTime, 'tomorrow')
      const expectedResult = '2019-08-01T00:00:00Z,2019-08-01T23:59:59Z'
      expect(result).toBe(expectedResult)
    })

    it('should return the formatted date range for the next 7 days option', () => {
      const baseTime = moment('2019-07-31T18:18:36Z').utc()
      const result = getDateRange(baseTime, '7days')
      const expectedResult = '2019-07-31T18:18:36Z,2019-08-06T23:59:59Z'
      expect(result).toBe(expectedResult)
    })

    it('should return the formatted date range for the next 30 days option', () => {
      const baseTime = moment('2019-07-31T18:18:36Z').utc()
      const result = getDateRange(baseTime, '30days')
      const expectedResult = '2019-07-31T18:18:36Z,2019-08-29T23:59:59Z'
      expect(result).toBe(expectedResult)
    })
  })
})
