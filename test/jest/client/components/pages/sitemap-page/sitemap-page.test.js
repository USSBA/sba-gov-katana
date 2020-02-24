import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import * as helpers from 'client/fetch-content-helper'
import SiteMapPage from 'client/components/pages/sitemap-page/sitemap-page'

describe.only('SiteMap', () => {
  it('fetches siteMap.json data', () => {
    helpers.fetchRestContent = jest.fn().mockImplementationOnce(() => Promise.resolve())
    const { getByTestId } = render(<SiteMapPage />)
    expect(getByTestId('sitemap')).toBeInTheDocument()
  })
})
