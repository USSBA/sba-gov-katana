import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import * as clientConfig from 'client/services/client-config'
import * as helpers from 'client/fetch-content-helper'
import { RootPage } from 'client/components/pages/root-page'

describe('RootPage', () => {
  describe('404 Page', () => {
    test('shows the 404 page', () => {
      clientConfig.getConfig = jest.fn().mockImplementation(
        _ =>
          // eslint-disable-next-line no-magic-numbers
          404
      )
      helpers.fetchSiteContent = jest.fn().mockImplementation(() => Promise.resolve())

      const params = { first: 'Does', second: 'Not', third: 'Matter', fourth: 'One', fifth: 'Bit' }
      const component = shallow(<RootPage params={params} />)
      component.setState({ siteMap: [] })
      const result = component.find('ErrorPage').length
      const expected = 1
      expect(result).toEqual(expected)
    })
  })
})
