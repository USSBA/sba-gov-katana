import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { Homepage } from 'client/components/templates/homepage/homepage.jsx'
import data from './homepage-test-data.json'
import siteMap from './site-map-test-data.json'

const testProps = {
  location: {
    pathname: '/'
  },
  fetchContentIfNeeded: () => {},
  removeLoader: () => {}
}

describe('Homepage', () => {
  test('should render', () => {
    const tree = shallow(<Homepage {...testProps} />)
    tree.setState({ data, siteMap })
    expect(tree).toMatchSnapshot()
  })
})
