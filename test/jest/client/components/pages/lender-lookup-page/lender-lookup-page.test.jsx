import React from 'react'
import { shallow, mount } from 'enzyme'

import LenderLookupPage from 'pages/lender-lookup-page/lender-lookup-page.jsx'
import * as clientConfig from 'client/services/client-config'
import { MultiSelect } from 'atoms'
import moment from 'moment'

describe('LenderLookupPage', () => {
  // TC-3 skipping test until we add back in tax question for find lender ppp page
  it.skip('should select the rapid lenders dropdown', () => {
    const component = mount(<LenderLookupPage />)
    const result = component.find('[data-cy="has-filed-2019-taxes"]')
    expect(result).toHaveLength(1)
  })
  describe('views', () => {
    it('renders Search Template', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('SearchTemplate')).toHaveLength(1)
    })

    it('renders PrimarySearchBar', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('PrimarySearchBar')).toHaveLength(1)
    })

    it('renders TextInput', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('TextInput')).toHaveLength(1)
    })

    it('renders OfficeMap', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('OfficeMapApp')).toHaveLength(1)
    })

    it('renders Results container element', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('Results')).toHaveLength(1)
    })
  })

  describe('actions', () => {
    describe('TextInput', () => {
      it('receives address as queryParamName prop', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const queryParamName = wrapper.find('TextInput').prop('queryParamName')
        expect(queryParamName).toEqual('address')
      })

      it('uses the correct placeholder text', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const placeholderText = wrapper.find('TextInput').prop('placeholder')
        expect(placeholderText).toEqual('Zip Code')
      })

      it("doesn't allow non five digit input", () => {
        const wrapper = shallow(<LenderLookupPage />)
        const textInput = wrapper.find('TextInput')
        const validationFn = textInput.prop('validationFunction')
        expect(validationFn('123')).toBe(false)
        expect(validationFn('ab123')).toBe(false)
        expect(validationFn('20002')).toBe(true)
        expect(validationFn('')).toBe(true)
      })
    })

    describe('OfficeMap', () => {
      it('centers map on marker click', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const officeMap = wrapper.find('OfficeMapApp')
        const onMarkerClickFn = officeMap.prop('onMarkerClick')
        expect(wrapper.state().shouldCenterMap).toBe(false)
        onMarkerClickFn()
        expect(wrapper.state().shouldCenterMap).toBe(true)
      })

      it('sets the selected item and newCenter in wrapper state', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const officeMap = wrapper.find('OfficeMapApp')
        const onMarkerClickFn = officeMap.prop('onMarkerClick')
        const location = { item: { geolocation: ['13,21'] } }
        expect(wrapper.state().selectedItem).toEqual({})
        onMarkerClickFn(location)
        expect(wrapper.state().selectedItem).toEqual(
          expect.objectContaining({
            item: location.item
          })
        )
        expect(wrapper.state().newCenter).toEqual(
          expect.objectContaining({
            lat: 13,
            lng: 21
          })
        )
      })
    })

    describe('Results', () => {
      it('centers map on item click', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const results = wrapper.find('Results')
        const onItemClickFn = results.prop('onClick')
        expect(wrapper.state().shouldCenterMap).toBe(false)
        onItemClickFn()
        expect(wrapper.state().shouldCenterMap).toBe(true)
      })

      it('sets the selected item and newCenter in wrapper state', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const results = wrapper.find('Results')
        const onItemClickFn = results.prop('onClick')
        const location = { item: { geolocation: ['13,21'] } }
        expect(wrapper.state().selectedItem).toEqual({})
        onItemClickFn(location)
        expect(wrapper.state().selectedItem).toEqual(
          expect.objectContaining({
            item: location.item
          })
        )
        expect(wrapper.state().newCenter).toEqual(
          expect.objectContaining({
            lat: 13,
            lng: 21
          })
        )
      })

      it('sets hoveredMarkerId when onMarkerHover function is called', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const results = wrapper.find('Results')
        const onHoverFn = results.prop('onResultHover')
        expect(wrapper.state().hoveredMarkerId).toEqual('')
        onHoverFn('new_id')
        expect(wrapper.state().hoveredMarkerId).toEqual('new_id')
      })
    })
  })

  it('passes the correct page size prop to SearchTemplate', () => {
    const component = shallow(<LenderLookupPage />)
    const defaultSearchParams = component.find('SearchTemplate').prop('defaultSearchParams')
    expect(defaultSearchParams).toEqual({ pageSize: 20 })
  })
})
