import React from 'react'
import { shallow } from 'enzyme'
import OfficeMap from 'organisms/office-map/office-map.jsx'

describe('OfficeMap', () => {
  it('should instantiate google map object', () => {
    const component = shallow(<OfficeMap />)
    expect(component.find('#google-map').length).toEqual(1)
  })
})
