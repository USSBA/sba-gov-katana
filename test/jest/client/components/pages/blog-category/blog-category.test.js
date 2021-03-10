/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement, fireEvent, within } from 'react-testing-library'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import 'jest-dom/extend-expect'
import { when } from 'jest-when'
import axiosMock from 'axios'

import BlogCategoryPage from 'pages/blog-category/blog-category-page.jsx'
import '../../test-data/matchMedia.mock'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import { blogQueryResponse } from './blog-category-response-faker.js'
import { wait } from '@testing-library/dom'
import { Iot } from 'aws-sdk'

const validBlogCategories = [
  {
    name: 'news-and-views',
    title: 'SBA News and Views posts',
    subtitle: "Insights and updates from SBA's small business experts",
    queryTerm: 'SBA News and Views'
  },
  {
    name: 'industry-word',
    title: 'Industry Word posts',
    subtitle: 'Commentary and advice from leaders in the small business industry',
    queryTerm: 'Industry Word'
  },
  {
    name: 'success-stories',
    title: 'Success Story posts',
    subtitle: 'Success stories from small business owners across the country',
    queryTerm: 'Success Story'
  }
]

afterEach(cleanup)

describe('Blog Category Page', () => {
  describe('when visiting a valid blog category type', () => {
    validBlogCategories.forEach(function(blogCategory, index) {
      it('will show the correct header for ' + blogCategory.title, done => {
        setImmediate(async () => {
          const { getByTestId } = render(<BlogCategoryPage params={{ category: blogCategory.name }} />)
          const title = await waitForElement(() => getByTestId('blog-category-title'))
          expect(title).toHaveTextContent(blogCategory.title)
          const subtitle = await waitForElement(() => getByTestId('blog-category-subtitle'))
          expect(subtitle).toHaveTextContent(blogCategory.subtitle)
          done()
        })
      })

      it('will get the blog posts for ' + blogCategory.title, done => {
        const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

        const mockBlogResponse = {
          response: 200,
          data: {
            total: 20,
            blogs: blogQueryResponse(12)
          }
        }

        axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

        console.log(mockBlogResponse.data)
        const { getByTestId, findAllByTestId } = render(
          <BlogCategoryPage params={{ category: blogCategory.name }} />
        )

        const firstQueryParams = {
          category: blogCategory.queryTerm,
          start: 0,
          end: 12
        }

        setImmediate(async () => {
          const blogPosts = await waitForElement(() => getByTestId('blog-card-collections'))
          const blogCards = await waitForElement(() => findAllByTestId('card'))
          const topPaginator = await waitForElement(() => getByTestId('blog-top-paginator'))
          const bottomPaginator = await waitForElement(() => getByTestId('blog-bottom-paginator'))
          expect(blogPosts).toBeInTheDocument()
          expect(blogCards).toHaveLength(12)
          expect(topPaginator).toBeInTheDocument()
          expect(bottomPaginator).toBeInTheDocument()
          expect(fetchSiteContentStub).toBeCalledWith('blogs', firstQueryParams)
          done()
        })
      })
    })
  })

  it('displays a featured image on the blog card when it exists', done => {
    const blogCategory = 'success-stories'
    const mockBlogWithFeaturedImage = {
      title: 'Some Title',
      featuredImage: {
        url: '/foo',
        alt: 'foo text'
      }
    }
    const mockBlogsResponse = {
      total: 1,
      blogs: [mockBlogWithFeaturedImage]
    }

    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs')
      .mockImplementationOnce(() => mockBlogsResponse)

    const { getByTestId } = render(<BlogCategoryPage params={{ category: blogCategory }} />)

    setImmediate(async () => {
      const blogCard = await waitForElement(() => getByTestId('card'))
      const cardImage = within(blogCard).getByTestId('card image')
      expect(cardImage).toHaveAttribute('alt', mockBlogWithFeaturedImage.featuredImage.alt)
      expect(cardImage).toHaveAttribute('src', mockBlogWithFeaturedImage.featuredImage.url)
      done()
    })

    fetchSiteContentStub.mockRestore()
  })

  describe('when visiting a blog category type for an office', () => {
    it('will make the fetch call for the office json', async () => {
      const blogCategoryPageParams = {
        category: 'success-stories',
        officeId: 1234
      }
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      const { getByTestId } = render(<BlogCategoryPage params={blogCategoryPageParams} />)
      await waitForElement(() => getByTestId('blog-category-page'))
      expect(fetchRestContentStub).toHaveBeenCalledWith(blogCategoryPageParams.officeId)
    })

    it('will make the fetch call for the blogs json using the given category and office id', async () => {
      const blogCategoryPageParams = {
        category: 'success-stories',
        officeId: 1234
      }
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      const { getByTestId } = render(<BlogCategoryPage params={blogCategoryPageParams} />)
      await waitForElement(() => getByTestId('blog-category-page'))

      const expectedFetchParams = {
        category: 'Success Story',
        end: 12,
        office: blogCategoryPageParams.officeId,
        start: 0
      }
      expect(fetchSiteContentStub).toHaveBeenCalledWith('blogs', expectedFetchParams)
    })

    it('will NOT include the office key to make the fetch call for blogs when there is NO office', async () => {
      const blogCategoryPageParamsWithoutOffice = {
        category: 'success-stories'
      }
      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      const { getByTestId } = render(<BlogCategoryPage params={blogCategoryPageParamsWithoutOffice} />)
      await waitForElement(() => getByTestId('blog-category-page'))

      const expectedFetchParamsWithoutOfficeKey = {
        category: 'Success Story',
        end: 12,
        start: 0
      }
      expect(fetchSiteContentStub).toHaveBeenCalledWith('blogs', expectedFetchParamsWithoutOfficeKey)
    })

    it('will display the custom subtitle for that office', async () => {
      const blogCategoryPageParams = {
        category: 'success-stories',
        officeId: 1234
      }
      const mockOfficeResponse = {
        id: 1234,
        title: 'Fearless HQ',
        type: 'office'
      }

      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      when(fetchRestContentStub)
        .calledWith(blogCategoryPageParams.officeId)
        .mockImplementationOnce(() => mockOfficeResponse)

      const { getByTestId } = render(<BlogCategoryPage params={blogCategoryPageParams} />)
      const subtitle = await waitForElement(() => getByTestId('blog-category-subtitle'))

      const expectedSubtitleText = `Success stories from small business owners out of the ${mockOfficeResponse.title}.`
      expect(subtitle).toHaveTextContent(expectedSubtitleText)
    })
  })

  describe('when visiting an invalid blog category type', () => {
    it('will render the error page', async () => {
      const initialState = undefined
      const enhancer = applyMiddleware(thunk)
      const store = createStore(reducers, initialState, enhancer)

      const { getByTestId } = render(
        <Provider store={store}>
          <BlogCategoryPage params={{ category: 'not-a-category' }} />
        </Provider>
      )
      const content = await waitForElement(() => getByTestId('error-page'))
      expect(content).toBeInTheDocument()
    })
  })
})
