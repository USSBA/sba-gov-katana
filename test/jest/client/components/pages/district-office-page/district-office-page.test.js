/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { when, resetAllWhenMocks } from 'jest-when'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import axiosMock from 'axios'
import 'jest-dom/extend-expect'

import DistrictOfficePage from 'pages/district-office-page/district-office-page.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import eventsTestData from '../../test-data/events.json'
import newsReleaseData from '../../test-data/news-releases/oneNewsReleasesData.json'
import '../../test-data/matchMedia.mock'

const mockOfficeData = {
  title: 'State District Office'
}

afterEach(function() {
  cleanup()
  resetAllWhenMocks()
})

describe('District Office page', () => {
  it('renders the office info when it recieves data back from the api', async () => {
    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const mockOfficeResponse = {
      response: 200,
      data: {
        mockOfficeData
      }
    }
    axiosMock.get.mockResolvedValueOnce(mockOfficeResponse)

    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('events')
      .mockImplementationOnce(() => Promise.resolve(eventsTestData))
    when(fetchSiteContentStub)
      .calledWith('articles')
      .mockImplementationOnce(() => Promise.resolve(newsReleaseData))

    const { getByTestId } = render(
      <Provider store={store}>
        <DistrictOfficePage params={{ officeId: 12345 }} />
      </Provider>
    )

    const content = await waitForElement(() => getByTestId('office-content'))
    expect(content).toBeInTheDocument()
  })
  it('renders an error page when DistrictOfficePage does NOT recieve back office information from the content API', async () => {
    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const mockOfficeResponse = {
      response: 404
    }
    axiosMock.get.mockResolvedValueOnce(mockOfficeResponse)

    const { getByTestId } = render(
      <Provider store={store}>
        <DistrictOfficePage params={{ officeId: '99999' }} />
      </Provider>
    )
    const content = await waitForElement(() => getByTestId('office-error'))
    expect(content).toBeInTheDocument()
  })
})
