import React from 'react'
import { RootPage } from 'client/components/pages/root-page.jsx'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import * as clientConfig from 'client/services/client-config'

describe('RootPage', () => {
  describe('404 Page', () => {
    test('shows the 404 page', () => {
      clientConfig.getConfig = jest.fn().mockImplementation(_ => 404)
      let params = { first: 'Does', second: 'Not', third: 'Matter', fourth: 'One', fifth: 'Bit' }
      let actions = { fetchContentIfNeeded: jest.fn() }
      const component = shallow(<RootPage actions={actions} params={params} />)
      const result = component.find('ErrorPage').length
      const expected = 1
      expect(result).toEqual(expected)
    })
  })
})
