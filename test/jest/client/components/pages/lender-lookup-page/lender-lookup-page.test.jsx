import React from 'react'
import { shallow, mount } from 'enzyme'

import LenderLookupPage from 'pages/lender-lookup-page/lender-lookup-page.jsx'

describe('LenderLookupPage', () => {
  describe('views', () => {
    it('renders information section', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('.infoSection')).toHaveLength(1)
      expect(wrapper.find('.leftColumn')).toHaveLength(1)
      expect(wrapper.find('Card')).toHaveLength(1)
    })

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
      expect(wrapper.find('TextInput')).toHaveLength(2)
    })

    it('renders OfficeMap', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('OfficeMapApp')).toHaveLength(1)
    })

    it('renders Results container element', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('Results')).toHaveLength(1)
    })

    it('renders LenderDetail inside Results', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('Results').find('LenderDetail')).toHaveLength(1)
    })

    it('renders a notice with link to SBA District Office', () => {
      const wrapper = shallow(<LenderLookupPage />)
      expect(wrapper.find('.noticeWithLink')).toHaveLength(1)
      expect(
        wrapper.find('[href="https://www.sba.gov/tools/local-assistance/districtoffices"]')
      ).toHaveLength(1)
    })

    it('renders CTA for additional relief options', () => {
      const wrapper = shallow(<LenderLookupPage />)
      const cta = wrapper.find('CallToAction')
      expect(cta).toHaveLength(1)
      expect(cta.prop('headline')).toEqual('Looking for another funding option?')
    })
  })

  describe('actions', () => {
    describe('TextInput for zipcode', () => {
      it('receives address as queryParamName prop', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const queryParamName = wrapper.find('#zip').prop('queryParamName')
        expect(queryParamName).toEqual('address')
      })

      it('uses the correct placeholder text', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const placeholderText = wrapper.find('#zip').prop('placeholder')
        expect(placeholderText).toEqual('Zip Code')
      })

      it("doesn't allow non five digit input", () => {
        const wrapper = shallow(<LenderLookupPage />)
        const textInput = wrapper.find('#zip')
        const validationFn = textInput.prop('validationFunction')
        expect(validationFn('123')).toBe(false)
        expect(validationFn('ab123')).toBe(false)
        expect(validationFn('20002')).toBe(true)
        expect(validationFn('')).toBe(true)
      })

      it('sets isLenderNameVisible to true when zip input is valid', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const textInput = wrapper.find('#zip')
        const validationFn = textInput.prop('validationFunction')
        expect(wrapper.state('isLenderNameVisible')).toBe(false)
        validationFn('20017')
        expect(wrapper.state('isLenderNameVisible')).toBe(true)
      })

      it("doesn't set isLenderNameVisible to true when zip input is invalid or empty", () => {
        const wrapper = shallow(<LenderLookupPage />)
        const textInput = wrapper.find('#zip')
        const validationFn = textInput.prop('validationFunction')
        validationFn('2001')
        expect(wrapper.state('isLenderNameVisible')).toBe(false)
        validationFn('')
        expect(wrapper.state('isLenderNameVisible')).toBe(false)
      })
    })

    describe('TextInput for lender name', () => {
      it('is not visible on initial load', () => {
        const wrapper = shallow(<LenderLookupPage />)
        expect(wrapper.find('#lenderName').prop('isVisible')).toBe(false)
      })

      it('receives lenderName as queryParamName prop', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const queryParamName = wrapper.find('#lenderName').prop('queryParamName')
        expect(queryParamName).toEqual('lenderName')
      })

      it('uses the correct placeholder text', () => {
        const wrapper = shallow(<LenderLookupPage />)
        const placeholderText = wrapper.find('#lenderName').prop('placeholder')
        expect(placeholderText).toEqual('Search for my bank')
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
