import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import StandalonePageTemplate from 'templates/standalone-page/standalone-page.jsx'
import { when, resetAllWhenMocks } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'

const mockData = {
  "paragraphs": [{
          "blurb": "The SBA provides low-interest disaster loans to help small businesses recover from declared disasters.",
          "buttonAction": {
              "id": 3629,
              "type": "link",
              "link": {
                  "url": "https://disasterloan.sba.gov/ela/",
                  "title": "Get disaster assistance"
              }
          },
          "headline": "Get help after disaster strikes.",
          "image": {
              "url": "/sites/default/files/2017-05/disaster.jpg",
              "alt": "Rescue team at a disaster site.",
              "width": 720,
              "height": 480
          },
          "type": "callToAction",
          "title": "Disaster assistance CTA",
          "id": 25369,
          "updated": 1505740255,
          "created": 1495137006,
          "langCode": "en",
          "style": "Large"
      },
      {
          "id": 25371,
          "type": "cardCollection",
          "cards": [{
              "id": 25370,
              "type": "card",
              "image": {
                  "url": "/sites/default/files/2019-12/woman-business.jpg",
                  "alt": "person on laptop",
                  "width": 1080,
                  "height": 720
              },
              "link": {
                  "title": "Test link text"
              },
              "subtitleText": "Test card subtitle",
              "titleText": "Test card title"
          }]
      },
      {
          "id": 25372,
          "type": "image",
          "captionText": "people at a table",
          "image": {
              "url": "/sites/default/files/2019-12/vince-vaughn.jpg",
              "alt": "serious business",
              "width": 1771,
              "height": 1511
          }
      },
      {
          "id": 25376,
          "type": "lookup",
          "contactCategory": "Contracting area director",
          "display": "Table",
          "sectionHeaderText": "Test contact lookup title"
      },
      {
          "id": 25377,
          "type": "newsletterForm",
          "title": "Sign up for SBA email updates"
      },
      {
          "id": 25378,
          "type": "ohaWestlawForm",
          "formsTitle": "OHA Decisions"
      },
      {
          "id": 25380,
          "type": "quickLinks",
          "typeOfLinks": [{
              "id": 25379,
              "type": "articleLookup",
              "articleCategory": [
                  null
              ],
              "articleProgram": [
                  null
              ],
              "sectionHeaderText": "Test article quick links"
          }]
      },
      {
          "id": 25381,
          "type": "readMore",
          "expandedCopyText": "Test read more section expanded copy text",
          "preview": "Test read more section preview text",
          "titleText": "Test read more section title"
      },
      {
          "id": 25382,
          "type": "searchBox",
          "sectionHeaderText": "Test document search box title",
          "subtitleText": "Test document search box subtitle "
      },
      {
          "id": 25383,
          "type": "sectionHeader",
          "text": "Test section header text"
      },
      {
          "id": 25384,
          "type": "subsectionHeader",
          "text": "Test subsection header text"
      },
      {
          "id": 25385,
          "type": "textSection",
          "text": "<p>Test text section. Here's some text.</p>\r\n"
      }
  ],
  "summary": "summary test for standalone page",
  "type": "standalonePage",
  "title": "Standalone page test (all paragraphs) Updated",
  "id": 21720,
  "updated": 1576683408,
  "created": 1576256331,
  "langCode": "en",
  "url": "/page/standalone-page-test-all-paragraphs-updated"
}

afterEach(cleanup)

jest.mock('atoms/link/link.jsx', () => {
  return {
    __esModule: true,
    default: () => <div />
  }
})

jest.mock('molecules/quick-links/quick-links.jsx', () => {
  return {
    __esModule: true,
    default: () => <div />
  }
})

describe('StandalonePageTemplate', () => {
  let store

  beforeAll(() => {
    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    store = createStore(reducers, initialState, enhancer)
  })
  it('should render content', async () => {
    const props = {
      id: 21720
    }

    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    when(fetchRestContentStub)
      .calledWith(21720)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockData)
      })
    const { getByTestId } = render(
      <Provider store={store}>
        <StandalonePageTemplate {...props} />
      </Provider>
    )
    const content = await waitForElement(() => getByTestId('standalone-page-titlesection'))
    expect(content).toBeInTheDocument()
  })
})
