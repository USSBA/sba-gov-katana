import React from 'react'
import { render, cleanup, configure } from 'react-testing-library'
import BlogPage from 'pages/blog-page/blog-page.jsx'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Blog page', () => {
  it('loads and displays a 404 error on invalid id by default', async () => {
    configure({ testIdAttribute: 'data-cy' })
    // eslint-disable-next-line no-undefined
    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)
    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )
    expect(getByTestId('error-page-title')).toHaveTextContent('404')
  })
})
