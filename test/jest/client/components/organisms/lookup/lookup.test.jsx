import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Lookup, SbicLookup, SuretyLookup } from 'organisms'
import * as helper from 'client/fetch-content-helper'

describe('Lookup', () => {
	var mockFetchSiteContent
	beforeEach(() => {
		mockFetchSiteContent = jest.spyOn(helper, 'fetchSiteContent')
		mockFetchSiteContent.mockReturnValue('')
	})
	afterEach(() => {
		mockFetchSiteContent.mockRestore()
	})
	test('should render SbicLookup', () => {
		const props = {
			type: 'contacts',
			subtype: 'SBIC'
		}
		const component = shallow(<Lookup {...props} />)
		expect(component.find(SbicLookup)).toHaveLength(1)
	})
	test('should render SuretyLookup', () => {
		const props = {
			type: 'contacts',
			subtype: 'Surety bond company'
		}
		const component = shallow(<Lookup {...props} />)
		expect(component.find(SuretyLookup)).toHaveLength(1)
	})
})