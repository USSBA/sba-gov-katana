import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import '../../../../matchMedia.mock'
import BlogsLandingPage from 'pages/blogs-landing/blogs-landing.jsx'

afterEach(cleanup)

describe('Blogs landing page',  () => {
  it('renders the blog landing page hero', () => {
    const { getByTestId } = render(
      <BlogsLandingPage />
    )

    // window.matchMedia = jest.fn().mockImplementation(query => {
    //   return {
    //     matches: false,
    //     media: query,
    //     onchange: null,
    //     addListener: jest.fn(),
    //     removeListener: jest.fn(),
    //   };
    // });


    // const initialState = undefined
    // const enhancer = applyMiddleware(thunk)
    // const store = createStore(reducers, initialState, enhancer)

    // const content = await waitForElement(() => getByTestId('blogs-hero'))

    expect(getByTestId('blogs-hero')).toBeInTheDocument()
  })
})
