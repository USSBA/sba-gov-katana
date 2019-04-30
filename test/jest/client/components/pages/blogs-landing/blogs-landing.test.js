import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import '../../test-data/matchMedia.mock'
import BlogsLandingPage from 'pages/blogs-landing/blogs-landing.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

const mockNewsAndViewsData = [
  {
    blogCategory: 'News and Views',
    created: 1554897112,
    id: 10,
    title: 'SBA celebrates National Veterans Small Business Week',
    summary: 'We approach Veterans Day and National Veterans Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-national-veterans-small-business-week'
  },
  {
    blogCategory: 'News and Views',
    created: 1554897112,
    id: 11,
    title: 'SBA celebrates Memorial Day',
    summary: 'We approach Memorial Day and National Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-memorial-day'
  }
]
const mockIndustryWordData = [
  {
    blogCategory: 'Industry Word',
    created: 1554897112,
    id: 12,
    title: 'SBA celebrates National Veterans Small Business Week',
    summary: 'We approach Veterans Day and National Veterans Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-national-veterans-small-business-week'
  },
  {
    blogCategory: 'Industry Word',
    created: 1554897112,
    id: 13,
    title: 'SBA celebrates Memorial Day',
    summary: 'We approach Memorial Day and National Small Business Week.',
    type: 'blog',
    url: '/blog/sba-celebrates-memorial-day'
  }
]

const fetchSiteContentStubCallback = (node, { category }) => {
  const result = { total: 0, blogs: [] }
  if (category === 'News and Views') {
    result.blogs = mockNewsAndViewsData
  } else if (category === 'Industry Word') {
    result.blogs = mockIndustryWordData
  }
  return result
}

afterEach(cleanup)

describe('Blogs landing page', () => {
  it('renders the blog landing page hero', () => {
    const { getByTestId } = render(<BlogsLandingPage />)

    expect(getByTestId('blogs-hero')).toBeInTheDocument()
  })

  it('renders the blog category deck component twice', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementation(fetchSiteContentStubCallback)

    const { getAllByTestId } = render(<BlogsLandingPage />)
    const content = await waitForElement(() => getAllByTestId('blog category deck'))

    expect(content.length).toEqual(2)
  })

  it('makes a fetchSiteContent call for each category with defined query params', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

    const firstCategoryQueryParams = { category: 'News and Views', end: 3, order: 'desc' }
    const secondCategoryQueryParams = { category: 'Industry Word', end: 3, order: 'desc' }

    render(<BlogsLandingPage />)
    expect(fetchSiteContentStub).toBeCalledWith('blogs', firstCategoryQueryParams)
    expect(fetchSiteContentStub).toBeCalledWith('blogs', secondCategoryQueryParams)
  })
})
