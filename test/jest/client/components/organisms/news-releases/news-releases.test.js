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
      mode: 'districtOffice',
      relatedOffice: officeId,
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
      mode: 'districtOffice',
      articleCategory: 'Press release',
      sortBy: 'Last Updated',
      start: 0,
      end: 3
    }

    const { getByTestId } = render(<NewsReleases />)
    await waitForElement(() => getByTestId('news-cards'))

    expect(fetchSiteContentStub).toHaveBeenCalledWith('articles', expectedQueryParams)
  })

  /* eslint-disable no-magic-numbers */
  describe('remapArticlesToBetterSchema function', () => {
    it('should remap an object when all fields are present', () => {
      const inputArticles = [
        {
          id: '20351',
          fields: {
            article_category: ['Press release'],
            office: ['6422'],
            article_programs: ['7(a)'],
            region: ['National (all regions)'],
            related_offices: ['17054'],
            summary: ['summary text'],
            title: ['CST Article 2 (single input fields)'],
            created: ['1574192414'],
            updated: ['1574192835'],
            url: ['/article/2019/nov/19/cst-article-2-single-input-fields']
          }
        }
      ]

      const expected = [
        {
          id: 20351,
          category: ['Press release'],
          office: 6422,
          programs: ['7(a)'],
          region: ['National (all regions)'],
          relatedOffices: [17054],
          summary: 'summary text',
          type: 'article',
          title: 'CST Article 2 (single input fields)',
          created: 1574192414,
          updated: 1574192835,
          url: '/article/2019/nov/19/cst-article-2-single-input-fields'
        }
      ]

      const result = remapArticlesToBetterSchema(inputArticles)
      expect(result).toStrictEqual(expected)
    })

    it('should remap an object with default values when any field is NOT present', () => {
      const inputArticles = [
        {
          id: '20351',
          fields: {}
        }
      ]

      const expected = [
        {
          id: 20351,
          category: [],
          office: {},
          programs: [],
          region: [],
          relatedOffices: [],
          summary: '',
          type: 'article',
          title: '',
          created: {},
          updated: {},
          url: ''
        }
      ]

      const result = remapArticlesToBetterSchema(inputArticles)
      expect(result).toStrictEqual(expected)
    })

    it('should remap an object with stringified numbers converted to numbers for certain fields', () => {
      const inputArticles = [
        {
          id: '20351',
          fields: {
            office: ['6422'],
            related_offices: ['17054', '23566'],
            created: ['1574192414'],
            updated: ['1574192835']
          }
        }
      ]

      const expected = [
        {
          id: 20351,
          category: [],
          office: 6422,
          programs: [],
          region: [],
          relatedOffices: [17054, 23566],
          summary: '',
          type: 'article',
          title: '',
          created: 1574192414,
          updated: 1574192835,
          url: ''
        }
      ]

      const result = remapArticlesToBetterSchema(inputArticles)
      expect(result).toStrictEqual(expected)
    })

    it('should remap an object while preserving arrays for certain fields', () => {
      const inputArticles = [
        {
          id: '20351',
          fields: {
            article_category: ['Notice', 'Press release'],
            article_programs: ['7(a)', '8(a)'],
            region: ['Region I', 'Region V'],
            related_offices: ['17054', '23566']
          }
        }
      ]

      const expected = [
        {
          id: 20351,
          category: ['Notice', 'Press release'],
          office: {},
          programs: ['7(a)', '8(a)'],
          region: ['Region I', 'Region V'],
          relatedOffices: [17054, 23566],
          summary: '',
          type: 'article',
          title: '',
          created: {},
          updated: {},
          url: ''
        }
      ]

      const result = remapArticlesToBetterSchema(inputArticles)
      expect(result).toStrictEqual(expected)
    })
  })
  /* eslint-enable no-magic-numbers */
})
