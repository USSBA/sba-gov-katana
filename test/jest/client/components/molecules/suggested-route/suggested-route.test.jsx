import React from 'react'
import { SuggestedRoute } from 'molecules'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import * as helper from 'client/fetch-content-helper.js'

const mockRoutesData = [{
	"title": "Events",
	"description": "this is the description",
	"url": "/events/find/",
	"keywords": [
		"event",
		"events"
	]
}]

describe('SuggestedRoute', () => {
	let stubFetchSiteContent
	beforeAll(() => {
		stubFetchSiteContent = sinon.stub(helper, 'fetchSiteContent')
		stubFetchSiteContent.returns(Promise.resolve(mockRoutesData))
	})
	afterAll(() => {
		stubFetchSiteContent.restore()
	})
	it('should have a "title" state property', () => {
		const expected = true
		const result = shallow(<SuggestedRoute />).state().hasOwnProperty('title')
		expect(result).toBe(expected)
	})
	it('should have a "description" state property', () => {
		const expected = true
		const result = shallow(<SuggestedRoute />).state().hasOwnProperty('description')
		expect(result).toBe(expected)
	})
	it('should have a "url" state property', () => {
		const expected = true
		const result = shallow(<SuggestedRoute />).state().hasOwnProperty('url')
		expect(result).toBe(expected)
	})
	it('should display suggested route object based on search term', () => {
		const searchTerm = 'business event'
		const expected = 'object'
		const result = typeof SuggestedRoute.prototype.getRouteBySearchTerm(searchTerm, mockRoutesData)
		expect(result).toBe(expected)
	})
	it('should not display suggested object based on search term', () => {
		const searchTerm = 'business'
		const expected = undefined
		const result = SuggestedRoute.prototype.getRouteBySearchTerm(searchTerm, mockRoutesData)
		expect(result).toBe(expected)
	})
	it('should not display suggested object since there is no search term', () => {
		const searchTerm = ''
		const expected = undefined
		const result = SuggestedRoute.prototype.getRouteBySearchTerm(searchTerm, mockRoutesData)
		expect(result).toBe(expected)
	})
	it('should have "tabIndex" html attribute', done => {
		const searchTerm = 'event'
		const expected = true
		const component = shallow(<SuggestedRoute searchTerm={searchTerm} />)
		setImmediate(() => {
	        try {
				const result = component.find('[data-cy="suggested route"]').props().hasOwnProperty('tabIndex')
				expect(result).toBe(expected)
	        	done()
	        } catch (e) {
				done()
				return fail(e)
	        }
		})
	})
	it.only('should have button', done => {
		const searchTerm = 'event'
		const expected = 1
		const component = shallow(<SuggestedRoute searchTerm={searchTerm} />)
		setImmediate(() => {
	        try {
				const result = component.find('Button').length
				expect(result).toBe(expected)
	        	done()
	        } catch (e) {
	          done()
	          return fail(e)
	        }
	   	})
	})
})