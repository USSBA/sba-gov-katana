import React from 'react'
import { shallow } from 'enzyme'
import OfficeMap from 'organisms/office-map/office-map.jsx'

describe('OfficeMap', () => {
  it.only('should instantiate google map object', () => {
    const component = shallow(<OfficeMap />)
    expect(component.find('#google-map').length).toEqual(1)
  })

  it('should not detect map on tablet breakpoint', () => {
    // unit test here
  })

  it('should not detect map on mobile breakpoint', () => {
    // unit test here
  })

  it('should center map on zipcode location search', () => {
    // unit test here
  })

  it('should update result on new search event', () => {
    // unit test here
  })
})
