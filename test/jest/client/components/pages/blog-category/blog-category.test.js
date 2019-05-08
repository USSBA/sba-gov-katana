/*eslint-disable no-undefined*/

import React from 'react'
import BlogCategoryPage from 'pages/blog-category/blog-category-page.jsx'
import { render, cleanup, waitForElement, fireEvent } from 'react-testing-library'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import 'jest-dom/extend-expect'
import '../../test-data/matchMedia.mock'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import { blogQueryResponse } from './blog-category-response-faker.js'
import axiosMock from 'axios'

const validBlogCategories = [
  {
    name: 'news-and-views',
    title: 'SBA News and Views',
    subtitle: "Insights and updates from SBA's small business experts",
    queryTerm: 'News and Views'
  },
  {
    name: 'industry-word',
    title: 'Industry Word',
    subtitle: 'Commentary and advice from leaders in the small business industry',
    queryTerm: 'Industry Word'
  }
]

afterEach(cleanup)

describe('Blog Category Page', () => {
  describe('when visiting a valid blog category type', () => {
    validBlogCategories.forEach(function(blogCategory) {
      it('will show the correct header for ' + blogCategory.title, async () => {
        const initialState = undefined
        const enhancer = applyMiddleware(thunk)
        const store = createStore(reducers, initialState, enhancer)

        const { getByTestId } = render(
          <Provider store={store}>
            <BlogCategoryPage params={{ category: blogCategory.name }} />
          </Provider>
        )
        const title = await waitForElement(() => getByTestId('blog-category-title'))
        expect(title).toHaveTextContent(blogCategory.title)
        const subtitle = await waitForElement(() => getByTestId('blog-category-subtitle'))
        expect(subtitle).toHaveTextContent(blogCategory.subtitle)
      })
      it('will get the blog posts for ' + blogCategory.title, async () => {
        const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
        // fetchSiteContentStub.mockImplementation(fetchSiteContentStubCallback)

        const mockBlogResponse = {
          response: 200,
          data: {
            total: 20,
            blogs: blogQueryResponse(12)
          }
        }
        axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

        const initialState = undefined
        const enhancer = applyMiddleware(thunk)
        const store = createStore(reducers, initialState, enhancer)

        const { getByTestId } = render(
          <Provider store={store}>
            <BlogCategoryPage params={{ category: blogCategory.name }} />
          </Provider>
        )

        const firstQueryParams = {
          category: blogCategory.queryTerm,
          start: 0,
          end: 12
        }

        const blogPosts = await waitForElement(() => getByTestId('blog-card-collections'))
        const topPaginator = await waitForElement(() => getByTestId('blog-top-paginator'))
        const bottomPaginator = await waitForElement(() => getByTestId('blog-bottom-paginator'))
        expect(blogPosts).toBeInTheDocument()
        expect(topPaginator).toBeInTheDocument()
        expect(bottomPaginator).toBeInTheDocument()
        expect(fetchSiteContentStub).toBeCalledWith('blogs', firstQueryParams)
      })
      it(
        'will properly paginate the and make the appropriate requests for ' + blogCategory.title,
        async () => {
          const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')

          const mockFirstBlogResponse = {
            response: 200,
            data: {
              total: 20,
              blogs: blogQueryResponse(12)
            }
          }
          const mockSecondBlogResponse = {
            response: 200,
            data: {
              total: 20,
              blogs: blogQueryResponse(8)
            }
          }
          axiosMock.get.mockResolvedValueOnce(mockFirstBlogResponse)

          const initialState = undefined
          const enhancer = applyMiddleware(thunk)
          const store = createStore(reducers, initialState, enhancer)

          const { getByTestId } = render(
            <Provider store={store}>
              <BlogCategoryPage params={{ category: blogCategory.name }} />
            </Provider>
          )

          const firstQueryParams = {
            category: blogCategory.queryTerm,
            start: 0,
            end: 12
          }
          const secondQueryParams = {
            category: blogCategory.queryTerm,
            start: 12,
            end: 24
          }

          await waitForElement(() => getByTestId('blog-card-collections'))
          // const topPaginator = await waitForElement(() => getByTestId('blog-top-paginator'))
          // const bottomPaginator = await waitForElement(() => getByTestId('blog-bottom-paginator'))

          expect(fetchSiteContentStub).toBeCalledWith('blogs', firstQueryParams)

          // axiosMock.get.mockResolvedValueOnce(mockSecondBlogResponse)
          // expect(fetchSiteContentStub).toBeCalledWith('blogs', secondQueryParams)
        }
      )
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
