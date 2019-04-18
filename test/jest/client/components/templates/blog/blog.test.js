import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Blog from 'client/components/templates/blog/blog.jsx'

describe('Blog', () => {
	describe('AuthorCard', () => {
	    it('should exist', () => {
	    	const { getByTestId } = render(<Blog />)
	      	const content = getByTestId('authorCard')
		  	expect(content).toBeInTheDocument()
	    })
	})
})