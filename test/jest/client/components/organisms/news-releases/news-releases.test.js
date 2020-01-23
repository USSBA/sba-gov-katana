import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { NewsReleases } from 'organisms'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import { remapArticlesToBetterSchema } from '../../../../../../src/client/components/organisms/news-releases/news-releases.jsx'

import noNewsReleaseData from '../../test-data/news-releases/noNewsReleasesData.json'
import oneNewsReleaseData from '../../test-data/news-releases/oneNewsReleasesData.json'
import threeNewsReleaseData from '../../test-data/news-releases/threeNewsReleasesData.json'
import errorNewsReleaseData from '../../test-data/news-releases/errorNewsReleasesData.json'

let fetchSiteContentStub

beforeEach(function() {
  fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
})

afterEach(function() {
  fetchSiteContentStub.mockReset()
  cleanup()
})

afterAll(function() {
  fetchSiteContentStub.mockRestore()
})

describe('News releases', () => {
  it('renders nothing when NO news releases are found', async () => {
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(noNewsReleaseData))

    const { queryByTestId } = render(<NewsReleases officeId={12345} />)

    expect(queryByTestId('news-cards')).toBeNull()
    expect(queryByTestId('news-more-button')).toBeNull()
  })
  it('renders only 1 news release card when only 1 news release is returned', async () => {
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(oneNewsReleaseData))

    const { getByTestId } = render(<NewsReleases officeId={12345} />)

    const newsCards = await waitForElement(() => getByTestId('news-cards'))
    const newsButton = await waitForElement(() => getByTestId('news-more-button'))

    expect(newsCards).toBeInTheDocument()
    expect(newsButton).toBeInTheDocument()
    expect(newsButton).toHaveTextContent('View All')
  })
  it('renders the full listing when 3 news releases are found', async () => {
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(threeNewsReleaseData))

    const { getByTestId, getAllByTestId } = render(<NewsReleases officeId={12345} />)

    const newsCardsSection = await waitForElement(() => getByTestId('news-cards'))
    const newsCards = await waitForElement(() => getAllByTestId('detail-card'))
    const newsButton = await waitForElement(() => getByTestId('news-more-button'))

    expect(newsCardsSection).toBeInTheDocument()
    expect(newsCards).toHaveLength(3)
    expect(newsButton).toBeInTheDocument()
    expect(newsButton).toHaveTextContent('View All')
  })
  it('renders nothing when the news release request fails', () => {
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(errorNewsReleaseData))

    const { queryByTestId } = render(<NewsReleases officeId={12345} />)

    expect(queryByTestId('news-cards')).toBeNull()
    expect(queryByTestId('news-more-button')).toBeNull()
  })
  it('includes officeId, national, and region query parameters in the fetch call when they exist as props', async () => {
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(oneNewsReleaseData))

    const officeId = 12345
    const officeRegion = 'Region I'

    const expectedQueryParams = {
      relatedOffice: officeId,
      office: officeId,
      articleCategory: 'Press release',
      national: true,
      region: officeRegion,
      sortBy: 'Last Updated',
      start: 0,
      end: 3
    }

    const { getByTestId } = render(
      <NewsReleases officeId={officeId} national={true} region={officeRegion} />
    )
    await waitForElement(() => getByTestId('news-cards'))

    expect(fetchSiteContentStub).toHaveBeenCalledWith('articles', expectedQueryParams)
  })
  it('does NOT include officeId, national, or region query parameters in the fetch call when they do NOT exist as props', async () => {
    fetchSiteContentStub.mockImplementationOnce(() => Promise.resolve(oneNewsReleaseData))

    const expectedQueryParams = {
      articleCategory: 'Press release',
      sortBy: 'Last Updated',
      start: 0,
      end: 3
    }

    const { getByTestId } = render(<NewsReleases />)
    await waitForElement(() => getByTestId('news-cards'))

    expect(fetchSiteContentStub).toHaveBeenCalledWith('articles', expectedQueryParams)
  })
})
