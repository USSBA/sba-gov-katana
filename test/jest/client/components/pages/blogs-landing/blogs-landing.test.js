import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import '../../test-data/matchMedia.mock'
import BlogsLandingPage from 'pages/blogs-landing/blogs-landing.jsx'

afterEach(cleanup)

describe('Blogs landing page', () => {
  it('renders the blog landing page hero', () => {
    const { getByTestId } = render(<BlogsLandingPage />)

    expect(getByTestId('blogs-hero')).toBeInTheDocument()
  })
})
