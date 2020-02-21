import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'

import * as clientConfig from 'client/services/client-config'
import * as helpers from 'client/fetch-content-helper'
import SiteMapPage from 'client/components/pages/sitemap-page/sitemap-page'

describe.only('SiteMap', () => {
  it('fetches siteMap.json data', () => {
    clientConfig.getConfig = jest.fn().mockImplementation(_ => 404)
    helpers.fetchRestContent = jest.fn().mockImplementation(() => Promise.resolve())
    const { getByTestId } = render(<SiteMapPage />)
    //expect(getByTestId('blogs-hero')).toBeInTheDocument()
  })
})
