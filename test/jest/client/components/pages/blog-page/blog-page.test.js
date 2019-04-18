/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import 'jest-dom/extend-expect'
import BlogPage from 'pages/blog-page/blog-page.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

const mockBlogData = {
  author: null,
  blogBody: {},
  blogTags: 'International',
  office: {},
  summary: 'Some stuff',
  type: 'blog',
  title: 'Fearless',
  id: 1,
  updated: 1554483661,
  created: 1554414745,
  langCode: 'en',
  url: '/blog/18343'
}

afterEach(cleanup)

describe('Blog page', () => {
  it('renders blog content when BlogPage receives data back from the api', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockImplementation(() => Promise.resolve(mockBlogData))

    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )

    expect(fetchRestContentStub).toHaveBeenCalledTimes(1)

    const content = await waitForElement(() => getByTestId('blog-content'))
    expect(content).toBeInTheDocument()

    fetchRestContentStub.mockRestore()
  })

  it('renders error page when BlogPage receives null data back from the api', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockImplementation(() => Promise.resolve(null))

    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )

    expect(fetchRestContentStub).toHaveBeenCalledTimes(1)

    const content = await waitForElement(() => getByTestId('blog-error'))
    expect(content).toBeInTheDocument()

    fetchRestContentStub.mockRestore()
  })

  it('renders loader when BlogPage is waiting for an api response', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')

    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )

    expect(fetchRestContentStub).toHaveBeenCalledTimes(1)
    expect(getByTestId('blog-loader')).toBeInTheDocument()
  })
  describe('AuthorCard', () => {
      it('should exist', async () => {

        const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
        fetchRestContentStub.mockImplementation(() => Promise.resolve(mockBlogData))

        const initialState = undefined
        const enhancer = applyMiddleware(thunk)
        const store = createStore(reducers, initialState, enhancer)

        const { getByTestId } = render(
          <Provider store={store}>
            <BlogPage id="1" />
          </Provider>
        )
        
        const content = await waitForElement(() => getByTestId('authorCard'))
        expect(content).toBeInTheDocument()
      })
  })
})
