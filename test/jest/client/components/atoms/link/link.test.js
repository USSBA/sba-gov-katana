import React, { PropTypes } from 'react'
import { shallow } from 'enzyme'
import { Link } from 'atoms'
import { Link as ReactRouterLink } from 'react-router'

describe('Link', () => {
	const props = {
		to: '/test-url/'
	}
	const f = () => {}
	const options = {
	  context: {
	    router: {
	      createHref: f,
	      getCurrentLocation: () => ({ pathname: '' }),
	      go: f,
	      goBack: f,
	      goForward: f,
	      isActive: f,
	      push: f,
	      replace: f,
	      setRouteLeaveHook: f
	    }
	  },
	  childContextTypes: { router: PropTypes.object }
	}

	test('enable href to equal the string "javascript:;"', () => {
		const _props = Object.assign(props, {
			to: ''
		})
		const expected = 'javascript:;'
		const component = shallow(<Link {..._props} />)
		const result = component.props().href
		expect(result).toBe(expected)
	})

	test('enable anchor tag with absolute url', () => {
		const _props = Object.assign(props, {
			to: 'https://test-website.test/'
		})
		const expected = 1
		const component = shallow(<Link {..._props} />)
		const result = component.find('a').length
		expect(result).toEqual(expected)
	})

	test('enable ReactRouterLink when href is a pound sign "#"', () => {

		const _props = Object.assign(props, {
			to: '#test-anchor'
		})

		const expected = 1
		const component = shallow(<Link {..._props} />, options)
		const result = component.find(ReactRouterLink).length
		expect(result).toEqual(expected)
	})
})
