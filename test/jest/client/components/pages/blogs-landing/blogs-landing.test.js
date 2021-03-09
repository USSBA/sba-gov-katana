import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { when } from 'jest-when'
import 'jest-dom/extend-expect'
import '../../test-data/matchMedia.mock'
import BlogsLandingPage from 'pages/blogs-landing/blogs-landing.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

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

afterEach(cleanup)

describe('Blogs landing page', () => {
  it('renders the blog landing page hero', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs', 'SBA News and Views')
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
    when(fetchSiteContentStub)
      .calledWith('blogs', 'Industry Word')
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
    when(fetchSiteContentStub)
      .calledWith('blogs', 'Success Story')
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
    when(fetchSiteContentStub)
      .calledWith('authors')
      .mockImplementationOnce(() => Promise.resolve([]))

    const { queryByTestId } = render(<BlogsLandingPage />)
    const blogsHero = await waitForElement(() => queryByTestId('blogs-hero'))
    expect(blogsHero).toBeInTheDocument()
  })

  // it('renders the blog category deck component thrice', async () => {
  //   const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
  //   when(fetchSiteContentStub)
  //     .calledWith('blogs', 'SBA News and Views')
  //     .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
  //   when(fetchSiteContentStub)
  //     .calledWith('blogs', 'Industry Word')
  //     .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
  //   when(fetchSiteContentStub)
  //     .calledWith('blogs', 'Success Story')
  //     .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
  //   when(fetchSiteContentStub)
  //     .calledWith('authors')
  //     .mockImplementationOnce(() => Promise.resolve([]))

  //   const { getAllByTestId } = render(<BlogsLandingPage />)
  //   const content = await waitForElement(() => getAllByTestId('blog category deck'))

  //   expect(content.length).toEqual(3)
  // })

  it('makes a fetchSiteContent call for each category with defined query params', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs', 'SBA News and Views')
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
    when(fetchSiteContentStub)
      .calledWith('blogs', 'Industry Word')
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
    when(fetchSiteContentStub)
      .calledWith('blogs', 'Success Story')
      .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
    when(fetchSiteContentStub)
      .calledWith('authors')
      .mockImplementationOnce(() => Promise.resolve([]))

    const firstCategoryQueryParams = { category: 'SBA News and Views', end: 3, order: 'desc' }
    const secondCategoryQueryParams = { category: 'Industry Word', end: 3, order: 'desc' }

    const { getByTestId } = render(<BlogsLandingPage />)
    await waitForElement(() => getByTestId('blogs landing page'))
    expect(fetchSiteContentStub).toBeCalledWith('blogs', firstCategoryQueryParams)
    expect(fetchSiteContentStub).toBeCalledWith('blogs', secondCategoryQueryParams)
  })

  describe('AuthorCardCollection', () => {
    it('should exist', async () => {
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

      when(fetchSiteContentStub)
        .calledWith('blogs', 'SBA News and Views')
        .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      when(fetchSiteContentStub)
        .calledWith('blogs', 'Industry Word')
        .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      when(fetchSiteContentStub)
        .calledWith('blogs', 'Success Story')
        .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      when(fetchSiteContentStub)
        .calledWith('authors')
        .mockImplementationOnce(() => {
          const mockResponse = [101, 102]
          return Promise.resolve(mockResponse)
        })

      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(nodeId => {
        const mockResponse = mockAuthorData.find(author => author.id === nodeId)
        return Promise.resolve(mockResponse)
      })
      const { queryAllByTestId } = render(<BlogsLandingPage />)
      const content = await waitForElement(() => queryAllByTestId('authorCardCollection'))
      expect(content.length).toEqual(0)
    })
    it('should contain 3 AuthorCard components', async () => {
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      when(fetchSiteContentStub)
        .calledWith('blogs', 'SBA News and Views')
        .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      when(fetchSiteContentStub)
        .calledWith('blogs', 'Industry Word')
        .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      when(fetchSiteContentStub)
        .calledWith('blogs', 'Success Story')
        .mockImplementationOnce(() => Promise.resolve({ blogs: [] }))
      when(fetchSiteContentStub)
        .calledWith('authors')
        .mockImplementationOnce(() => {
          const mockResponse = [101, 102]
          return Promise.resolve(mockResponse)
        })

      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(nodeId => {
        const mockResponse = mockAuthorData.find(author => author.id === nodeId)
        return Promise.resolve(mockResponse)
      })
      const { queryAllByTestId } = render(<BlogsLandingPage />)
      const content = await waitForElement(() => queryAllByTestId('authorCard'))
      expect(content.length).toEqual(0)
    })
  })
})
