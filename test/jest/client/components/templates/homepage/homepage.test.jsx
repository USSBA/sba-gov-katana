import React from 'react'
import { shallow } from 'enzyme'
import clone from 'lodash'

import HomePage from 'templates/homepage/homepage'

const testProps = {
  location: {
    pathname: '/'
  }
}

describe('HomePage', () => {
  test('should render HomePage', () => {
    const props = clone(testProps)
    const component = shallow(<HomePage {...testProps} />)
    expect(component).toMatchSnapshot()
  })
})
