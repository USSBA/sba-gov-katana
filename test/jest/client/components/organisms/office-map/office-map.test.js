import React from 'react'
import { shallow } from 'enzyme'
import OfficeMap from 'organisms/office-map/office-map.jsx'

describe('OfficeMap', () => {
  it('should instantiate google map object', () => {
    const component = shallow(<OfficeMap />)
    expect(component.find('#google-map').length).toEqual(1)
  })

  test('on pin click, should display office details state', () => {})

  test('on pin hover, pin should enlarge', () => {})

  test('on pin hover, result detail should highlight', () => {})
})
