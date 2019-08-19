import React from 'react'
import { shallow } from 'enzyme'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'

import ArticleLookupPage from 'pages/article-lookup-page/article-lookup-page'
import { PagingLookup } from 'organisms'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

afterEach(cleanup)

describe('ArticleLookupPage', () => {
  test('should render a page lookup', () => {
    // an article lookup page is just renders a paging lookup and nothing more
    const component = shallow(<ArticleLookupPage />)
    const result = component.find(PagingLookup).length
    const expected = 1
    expect(result).toEqual(expected)
  })

  it('renders the the office dropdown on the article lookup page', async () => {
    const mockTaxonomies = [
      {
        name: 'program',
        terms: ['7(a)', '8(a)', 'Contracting']
      },
      {
        name: 'articleCategory',
        terms: ['Speech', 'Press release', 'Policy notice']
      }
    ]

    const mockOffices = [
      {
        id: 100,
        title: 'Baltimore Office'
      },
      {
        id: 200,
        title: 'DC Office'
      }
    ]

    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    fetchSiteContentStub.mockImplementationOnce(() => mockTaxonomies)
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockImplementationOnce(() => mockOffices)

    const { getByText, getByTestId } = render(<ArticleLookupPage />)

    const title = await waitForElement(() => getByText('Article Lookup'))
    expect(title).toBeInTheDocument()
    const officeDropdown = await waitForElement(() => getByTestId('office'))
    expect(officeDropdown).toBeInTheDocument()
  })
})
