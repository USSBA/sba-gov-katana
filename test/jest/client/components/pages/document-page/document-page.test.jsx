/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import 'jest-dom/extend-expect'

import DocumentPage from 'pages/document-page/document-page'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

describe('DocumentPage', () => {
  let fetchRestContentStub
  let store

  beforeEach(function() {
    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    store = createStore(reducers, initialState, enhancer)

    fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
  })

  afterEach(function() {
    fetchRestContentStub.mockReset()
    cleanup()
  })

  afterAll(function() {
    fetchRestContentStub.mockRestore()
  })

  test('should render an a document article when a document is given', async () => {
    fetchRestContentStub.mockReturnValue({
      id: 1,
      type: 'document',
      programs: []
    })

    const { queryByTestId } = render(
      <Provider store={store}>
        <DocumentPage />
      </Provider>
    )
    const documentArticleComponent = await waitForElement(() => queryByTestId('document-article-template'))

    expect(documentArticleComponent).toBeInTheDocument()
  })

  test('should render an error page when no data is given', async () => {
    fetchRestContentStub.mockReturnValue(null)

    const { queryByTestId } = render(
      <Provider store={store}>
        <DocumentPage />
      </Provider>
    )
    const errorPageComponent = await waitForElement(() => queryByTestId('error-page'))

    expect(errorPageComponent).toBeInTheDocument()
  })
})

/*eslint-enable no-undefined*/
