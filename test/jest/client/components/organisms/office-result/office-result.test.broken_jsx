import React from 'react'
import { shallow } from 'enzyme'
import OfficeResult from 'organisms/office-result/office-result.jsx'

describe('OfficeResult', () => {
  const mockShowDetailState = jest.fn()
  const mockResultHover = jest.fn()
  const mockProps = {
    id: 'result-0',
    length: 1,
    item: {
      id: '123',
      fields: {
        title: ['title'],
        location_phone_number: ['301-111-1111'],
        exprs: {}
      }
    },
    showDetailState: mockShowDetailState,
    onResultHover: mockResultHover
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} />)
    expect(wrapper.find('a')).toHaveLength(1)
  })

  it('calls showDetailState on click', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} />)
    wrapper.find('a').simulate('click', { preventDefault: jest.fn() })
    expect(mockShowDetailState).toHaveBeenCalledWith(
      expect.objectContaining({
        item: {
          exprs: {},
          title: ['title'],
          location_phone_number: ['301-111-1111']
        }
      })
    )
  })

  it('calls onResultHover with item id onMouseOver', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} hoveredMarkerId={'4'} />)
    wrapper.find('a').prop('onMouseOver')()
    expect(mockResultHover).toHaveBeenCalledWith(mockProps.item.id)
  })

  it('calls onResultHover with item id on focus', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} hoveredMarkerId={'4'} />)
    wrapper.find('a').prop('onFocus')()
    expect(mockResultHover).toHaveBeenCalledWith(mockProps.item.id)
  })

  it('calls onResultHover with empty object on blur', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} hoveredMarkerId={mockProps.item.id} />)
    wrapper.find('a').prop('onMouseOut')()
    expect(mockResultHover).toHaveBeenCalledWith({})
  })

  it('calls onResultHover with empty object on blur', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} hoveredMarkerId={mockProps.item.id} />)
    wrapper.find('a').simulate('blur')
    expect(mockResultHover).toHaveBeenCalledWith({})
  })

  it('renders phone number component', () => {
    const wrapper = shallow(<OfficeResult {...mockProps} hoveredMarkerId={'4'} />)
    expect(wrapper.find('PhoneNumber')).toHaveLength(1)
  })
})
