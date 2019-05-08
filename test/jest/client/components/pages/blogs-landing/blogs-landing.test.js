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

const mockAuthorData = [
  {
    bio: '<p>Pradeep serves as Chief of Staff.',
    emailAddress: {},
    fax: {},
    firstName: 'Pradeep',
    highResolutionPhoto: '/sites/default/files/2019-02/pradeep-belur_0.jpg',
    lastName: 'Belur',
    office: 18216,
    phone: {},
    picture: {
      alt: 'Pradeep Belur',
      src: '/sites/default/files/2019-02/pradeep-belur.jpg'
    },
    shortBio: {},
    title: 'Chief of Staff, Chief Operating Officer',
    type: 'person',
    url: '/person/pradeep-belur',
    name: 'Pradeep Belur',
    id: 101,
    updated: 1551447256,
    created: 1550676474,
    langCode: 'en'
  },
  {
    bio:
      '<p>Shawn Pensoneau joined the U.S. Small Business Administration (SBA) as Assistant Administrator.',
    emailAddress: {},
    fax: '202-205-6139',
    firstName: 'Shawn',
    highResolutionPhoto: '/sites/default/files/2019-02/shawn-pensoneau.jpg',
    lastName: 'Pensoneau',
    office: 15839,
    phone: '202-205-7364',
    picture: {
      alt: 'Shawn Pensoneau',
      src: '/sites/default/files/2019-02/bio-shawn-pensoneau.jpg'
    },
    shortBio: {},
    title: 'Assitant Administrator',
    type: 'person',
    url: '/person/shawn-pensoneau',
    name: 'Shawn Pensoneau',
    id: 102,
    updated: 1551199799,
    created: 1550689651,
    langCode: 'en'
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
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    // mocking both blog category calls and authors call
    fetchSiteContentStub
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      .mockImplementationOnce(() => Promise.resolve([]))
    const { getByTestId } = render(<BlogsLandingPage />)

    expect(getByTestId('blogs-hero')).toBeInTheDocument()
  })

  it('renders the blog category deck component twice', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub
      .mockImplementationOnce(fetchSiteContentStubCallback)
      .mockImplementationOnce(fetchSiteContentStubCallback)
      // mock authors call to return nothing
      .mockImplementationOnce(() => Promise.resolve([]))

    const { getAllByTestId } = render(<BlogsLandingPage />)
    const content = await waitForElement(() => getAllByTestId('blog category deck'))

    expect(content.length).toEqual(2)
  })

  it('makes a fetchSiteContent call for each category with defined query params', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    // mocking both blog category calls and authors call
    fetchSiteContentStub
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      .mockImplementationOnce(() => Promise.resolve([]))

    const firstCategoryQueryParams = { category: 'News and Views', end: 3, order: 'desc' }
    const secondCategoryQueryParams = { category: 'Industry Word', end: 3, order: 'desc' }

    render(<BlogsLandingPage />)
    expect(fetchSiteContentStub).toBeCalledWith('blogs', firstCategoryQueryParams)
    expect(fetchSiteContentStub).toBeCalledWith('blogs', secondCategoryQueryParams)
  })
  describe('AuthorCardCollection', () => {
    it('should exist', async () => {
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub
        // fetchBlogs (there are two calls made inside the component so mock both)
        .mockImplementationOnce(() => {
          return { blogs: [] }
        })
        .mockImplementationOnce(() => {
          return { blogs: [] }
        })
        // fetchAuthors
        .mockImplementationOnce(() => {
          const mockResponse = [101, 102]
          return Promise.resolve(mockResponse)
        })
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(nodeId => {
        const mockResponse = mockAuthorData.find(author => author.id === nodeId)
        return Promise.resolve(mockResponse)
      })
      const { getAllByTestId } = render(<BlogsLandingPage />)
      const content = await waitForElement(() => getAllByTestId('authorCardCollection'))
      expect(content[0]).toBeInTheDocument()
    })
    it('should contain 2 AuthorCard components', async () => {
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub
        // fetchBlogs (there are two calls made inside the component so mock both)
        .mockImplementationOnce(() => {
          return { blogs: [] }
        })
        .mockImplementationOnce(() => {
          return { blogs: [] }
        })
        // fetchAuthors
        .mockImplementationOnce(() => {
          const mockResponse = [101, 102]
          return Promise.resolve(mockResponse)
        })
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(nodeId => {
        const mockResponse = mockAuthorData.find(author => author.id === nodeId)
        return Promise.resolve(mockResponse)
      })
      const { getAllByTestId } = render(<BlogsLandingPage />)
      const content = await waitForElement(() => getAllByTestId('authorCard'))
      expect(content.length).toEqual(2)
    })
  })
})
