import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { NewsReleases } from 'organisms'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

import noNewsReleaseData from '../../test-data/news-releases/noNewsReleasesData.json'
import oneNewsReleaseData from '../../test-data/news-releases/oneNewsReleasesData.json'
import threeNewsReleaseData from '../../test-data/news-releases/threeNewsReleasesData.json'
import errorNewsReleaseData from '../../test-data/news-releases/errorNewsReleasesData.json'

afterEach(cleanup)

describe('News releases', () => {
  it('renders nothing when NO news releases are found', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(noNewsReleaseData))

    const { getByTestId } = render(<NewsReleases officeId={12345} />)

    expect(() => {
      getByTestId('news-cards')
    }).toThrow()
    expect(() => {
      getByTestId('news-more-button')
    }).toThrow()
  })
  it('renders only 1 news release card when only 1 news release is returned', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(oneNewsReleaseData))

    const { getByTestId } = render(<NewsReleases officeId={'12345'} />)

    const newsCards = await waitForElement(() => getByTestId('news-cards'))
    const newsButton = await waitForElement(() => getByTestId('news-more-button'))

    expect(newsCards).toBeInTheDocument()
    expect(newsButton).toBeInTheDocument()
    expect(newsButton).toHaveTextContent('View All')
  })
  it('renders the full listing when 3 news releases are found', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(threeNewsReleaseData))

    const { getByTestId } = render(<NewsReleases officeId={12345} />)

    const newsCards = await waitForElement(() => getByTestId('news-cards'))
    const newsButton = await waitForElement(() => getByTestId('news-more-button'))

    expect(newsCards).toBeInTheDocument()
    expect(newsButton).toBeInTheDocument()
    expect(newsButton).toHaveTextContent('View All')
  })
  it('renders nothing when the news release request fails', () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(errorNewsReleaseData))

    const { getByTestId } = render(<NewsReleases officeId={12345} />)

    expect(() => {
      getByTestId('news-cards')
    }).toThrow()
    expect(() => {
      getByTestId('news-more-button')
    }).toThrow()
  })
})
