import React from 'react'
import { shallow } from 'enzyme'

import HomePage from 'templates/homepage/homepage'

describe('HomePage', () => {
  test('should render HomePage', () => {
    const component = shallow(<HomePage />)
    expect(component).toMatchSnapshot()
  })
})