import React from 'react'
import { shallow } from 'enzyme'
import OfficeMap from 'organisms/office-map/office-map.jsx'

describe('OfficeMap', () => {
  const mockProps = {
    id: 'office-map',
    zip: '20001',
    onFieldChange: jest.fn()
  }

  it('should instantiate google map object', () => {
    const component = shallow(<OfficeMap />)
    expect(component.find('#google-map').length).toEqual(1)
  })

  it('should call onFieldChange when zip is different', () => {
    let zip = '21146'
    const component = shallow(<OfficeMap {...mockProps} />)
    zip = '21104'
    component.setProps({ zip })
    expect(mockProps.onFieldChange).toHaveBeenCalledTimes(1)
    expect(mockProps.onFieldChange).toHaveBeenCalledWith('address', '21104', {
      shouldResetPageNumber: true,
      shouldTriggerSearch: true
    })
  })

  /*test('on pin click, should display office details state', () => {})

  test('on pin hover, pin should enlarge', () => {})

  test('on pin hover, result detail should highlight', () => {})*/
})
