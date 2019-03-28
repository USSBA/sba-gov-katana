/* eslint-env jest */
import React from 'react'
import { SuggestedRouteCard } from 'molecules'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import * as helper from 'client/fetch-content-helper.js'

const mockRoutesData = [{
	"route": "/events/find/",
	"cardMessage": "Looking for an event in your area?",
	"buttonLabel": "Find An Event",
	"keywords": [
		"event",
		"events"
	]
}]

describe('SuggestedRouteCard', () => {
	let stubFetchSiteContent
	beforeAll(() => {
		stubFetchSiteContent = sinon.stub(helper, 'fetchSiteContent')
		stubFetchSiteContent.returns(Promise.resolve(mockRoutesData))
	})
	afterAll(() => {
		stubFetchSiteContent.restore()
	})
	describe('state.route', () => {
		it('should exist', () => {
			const expected = true
			const result = shallow(<SuggestedRouteCard />).state().hasOwnProperty('route')
			expect(result).toBe(expected)
		})
		it('should have "type" of "string"', () => {
			const expected = "string"
			const result = typeof shallow(<SuggestedRouteCard />).state().route
			expect(result).toBe(expected)
		})
	})
	describe('state.cardMessage', () => {
		it('should exist', () => {
			const expected = true
			const result = shallow(<SuggestedRouteCard />).state().hasOwnProperty('cardMessage')
			expect(result).toBe(expected)
		})
		it('should have "type" of "string"', () => {
			const expected = "string"
			const result = typeof shallow(<SuggestedRouteCard />).state().cardMessage
			expect(result).toBe(expected)
		})
	})
	describe('state.buttonLabel', () => {
		it('should exist', () => {
			const expected = true
			const result = shallow(<SuggestedRouteCard />).state().hasOwnProperty('buttonLabel')
			expect(result).toBe(expected)
		})
		it('should have "type" of "string"', () => {
			const expected = "string"
			const result = typeof shallow(<SuggestedRouteCard />).state().buttonLabel
			expect(result).toBe(expected)
		})
	})
	describe('getRouteBySearchTerm(searchTerm, routes)', () => {
		it('should display suggested route object based on search term', () => {
		const searchTerm = 'business event'
		const expected = 'object'
		const result = typeof SuggestedRouteCard.prototype.getRouteBySearchTerm(searchTerm, mockRoutesData)
		expect(result).toBe(expected)
		})
		it('should not display suggested object based on search term', () => {
			const searchTerm = 'business'
			const expected = undefined
			const result = SuggestedRouteCard.prototype.getRouteBySearchTerm(searchTerm, mockRoutesData)
			expect(result).toBe(expected)
		})
		it('should not display suggested object since there is no search term', () => {
			const searchTerm = ''
			const expected = undefined
			const result = SuggestedRouteCard.prototype.getRouteBySearchTerm(searchTerm, mockRoutesData)
			expect(result).toBe(expected)
		})

	})
	describe('render()', () => {
		it('should have "tabIndex" html attribute', done => {
			const searchTerm = 'event'
			const expected = true
			const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
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
		describe('h3', () => {
			it('should exist', done => {
				const searchTerm = 'event'
				const expected = 1
				const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
				setImmediate(() => {
			        try {
						const result = component.find('h3').length
						expect(result).toBe(expected)
			        	done()
			        } catch (e) {
						done()
						return fail(e)
			        }
				})
			})
			it('should have text that matches route "cardMessage"', done => {
				const searchTerm = 'event'
				const expected = mockRoutesData[0].cardMessage
				const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
				setImmediate(() => {
			        try {
						const result = component.find('h3').text()
						expect(result).toBe(expected)
			        	done()
			        } catch (e) {
						done()
						return fail(e)
			        }
				})
			})
			it('should have "tabIndex" html attribute', done => {
				const searchTerm = 'event'
				const expected = true
				const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
				setImmediate(() => {
			        try {
						const result = component.find('h3').props().hasOwnProperty('tabIndex')
						expect(result).toBe(expected)
			        	done()
			        } catch (e) {
						done()
						return fail(e)
			        }
				})
			})
			describe.skip('a', () => {
				it('should exist', done => {
					const searchTerm = 'event'
					const expected = 1
					const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
					setImmediate(() => {
				        try {
							const result = component.find('h3 a').length
							expect(result).toBe(expected)
				        	done()
				        } catch (e) {
							done()
							return fail(e)
				        }
					})
				})
				it('should have text that matches route "cardMessage"', done => {
					const searchTerm = 'event'
					const expected = mockRoutesData[0].cardMessage
					const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
					setImmediate(() => {
				        try {
							const result = component.find('h3 a').text()
							expect(result).toBe(expected)
				        	done()
				        } catch (e) {
							done()
							return fail(e)
				        }
					})
				})
			})
		})
		describe('Button', () => {
			it('should exist with proper search term', done => {
				const searchTerm = 'event'
				const expected = 1
				const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
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
			it('should have "url" prop that matches "route" value', done => {
				const searchTerm = 'event'
				const expected = mockRoutesData[0].route
				const component = shallow(<SuggestedRouteCard searchTerm={searchTerm} />)
				setImmediate(() => {
			        try {
						const result = component.find('Button').props().url
						expect(result).toBe(expected)
			        	done()
			        } catch (e) {
			          done()
			          return fail(e)
			        }
			   	})
			})
		})
	})
})