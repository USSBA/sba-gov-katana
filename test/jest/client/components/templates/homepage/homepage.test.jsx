import React from 'react'
import { shallow } from 'enzyme'

import HomePage from 'templates/homepage/homepage'

const testProps = {
  location: {
    pathname: '/'
  }
}

describe('HomePage', () => {
  test('should render HomePage', () => {
    const component = shallow(<HomePage {...testProps} />)
    expect(component).toMatchSnapshot()
  })
})
