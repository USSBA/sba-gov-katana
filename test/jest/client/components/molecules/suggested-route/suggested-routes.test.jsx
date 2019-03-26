import React from 'react'
import { SuggestedRoute } from 'molecules'
import { shallow } from 'enzyme'

describe('SuggestedRoute', () => {
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
	it('should display "Events" url based on events keyword', () => {
		
	})
})