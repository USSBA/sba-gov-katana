import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import DistrictOfficeSubPageTemplate from 'templates/district-office-subpage/district-office-subpage.jsx'
import { when, resetAllWhenMocks } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'

const mockSubPageData = [
  {
    paragraphs: [
      {
        id: 22889,
        type: 'sectionheader',
        text: 'about us'
      },
      {
        id: 22890,
        type: 'textsection',
        text:
          "<p>welcome to the 2019-2020 edition of the u.s. small business administration’s washington metropolitan area small business resource guide, covering the district of columbia, northern virginia and suburban maryland. with an increasingly diverse and well-educated workforce, the nation's capital and surrounding areas rank among the best locations to develop a successful small business. the sba helps make the american dream of small business ownership a reality. we are the only federal agency dedicated to helping our nation’s 30 million small businesses start, grow, expand, or recover after a disaster.</p>\r\n\r\n<p>over the past year, the sba washington metropolitan area district office has empowered small businesses to:</p>\r\n\r\n<ul>\r\n\t<li>find an ally or mentor via our network of sba-funded resource partners, which includes score, small business development centers, women’s business centers, and the veterans business outreach center.</li>\r\n\t<li>access over $335 million in sba-guaranteed loans through 52 local banks, credit unions, community-based lenders, and microlenders. these qualified borrowers hired over 4,900 new employees, bought needed equipment, and built or renovated facilities.</li>\r\n\t<li>gain more than $4.6 billion in federal contracting awards. the sba offers business development and technical support to nearly 1,000 local companies enrolled in the 8(a) business development program.</li>\r\n\t<li>our region is an innovation hub, home to more than 90,000 small businesses employing over 1 million people. the washington metro area generates a gdp of $530 billion annually, placing it among the 25 top producing countries. just as the american spirit of freedom and independence is deeply tied to our local history, so are we deeply committed to ensuring entrepreneurialism continues to strengthen the economy for everyone, now and into the future. stay informed about sba events near you and get valuable washington metro area business information by following us on twitter at @sba_dcmetro. register for email updates at sba.gov/updates.</li>\r\n</ul>\r\n"
      }
    ],
    summary:
      'welcome to the 2019-2020 edition of the u.s. small business administration’s washington metropolitan area small business resource guide.',
    type: 'localresources',
    title: 'washington metropolitan area resources',
    id: 20242,
    updated: 1572629482,
    created: 1572629417,
    langcode: 'en'
  },
  {
    paragraphs: [
      {
        id: 22883,
        type: 'sectionHeader',
        text: 'The Startup Logistics'
      },
      {
        id: 22884,
        type: 'textSection',
        text: '<p>www.google.com</p>\r\n\r\n<p>www.sba.gov</p>\r\n\r\n<p>www.bixal.com</p>\r\n'
      }
    ],
    summary:
      'Need to do research on your clients and location? View consumer and business data for your area using the Census Business Builder.',
    type: 'localResources',
    title: 'How to start a business in the Washington Metropolitan Area',
    id: 20241,
    updated: 1572629390,
    created: 1572629291,
    langCode: 'en'
  },
  {
    paragraphs: [
      {
        id: 22877,
        type: 'sectionHeader',
        text: 'District of Columbia'
      },
      {
        id: 22878,
        type: 'textSection',
        text: '<p>Bank of America</p>\r\n\r\n<p>Wells Fargo</p>\r\n\r\n<p>USAA</p>\r\n\r\n<p>Chase</p>\r\n'
      }
    ],
    summary: 'The Washington area funding resources you need to know about.',
    type: 'localResources',
    title: 'Washington Metropolitan Area Funding Programs',
    id: 20240,
    updated: 1572629266,
    created: 1572629128,
    langCode: 'en'
  }
]

const mockPageConnectorData = {
  office: 6395,
  subpages: [
    {
      id: 20242,
      url: '/node/20242'
    },
    {
      id: 20241,
      url: '/node/20241'
    },
    {
      id: 20240,
      url: '/node/20240'
    }
  ],
  type: 'pageConnector',
  title: 'Washington Metropolitan Area B',
  id: 20243,
  updated: 1573247583,
  created: 1572634173,
  langCode: 'en',
  url: '//washington-metropolitan-area-b'
}

afterEach(cleanup)

jest.mock('atoms/link/link.jsx', () => {
  return {
    __esModule: true,
    default: () => <div />
  }
})

jest.mock('element-overlap', () => {
  return {
    listenForOverlap: () => {
      return {
        handleOverlap: () => false
      }
    }
  }
})

describe('DistrictOfficeSubPageTemplate', () => {
  let store

  beforeAll(() => {
    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    store = createStore(reducers, initialState, enhancer)
  })
  it('should render content', async () => {
    const params = {
      pageConnectorId: 20243
    }

    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    when(fetchRestContentStub)
      .calledWith(20243)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockPageConnectorData)
      })
    when(fetchRestContentStub)
      .calledWith(20242)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockSubPageData[0])
      })
    when(fetchRestContentStub)
      .calledWith(20241)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockSubPageData[1])
      })
    when(fetchRestContentStub)
      .calledWith(20240)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockSubPageData[2])
      })
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <DistrictOfficeSubPageTemplate params={params} />
      </Provider>
    )
    const content = await waitForElement(() => getByTestId('district-office-subpage-titlesection'))
    expect(content).toBeInTheDocument()
  })
  it('should render side navigation', async () => {
    const params = {
      pageConnectorId: 20243
    }

    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    when(fetchRestContentStub)
      .calledWith(20243)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockPageConnectorData)
      })
    when(fetchRestContentStub)
      .calledWith(20242)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockSubPageData[0])
      })
    when(fetchRestContentStub)
      .calledWith(20241)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockSubPageData[1])
      })
    when(fetchRestContentStub)
      .calledWith(20240)
      .mockImplementationOnce(() => {
        return Promise.resolve(mockSubPageData[2])
      })
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <DistrictOfficeSubPageTemplate params={params} />
      </Provider>
    )
    const content = await waitForElement(() => getByTestId('district-office-subpage-sectionnavigation'))
    expect(content).toBeInTheDocument()
  })
})
