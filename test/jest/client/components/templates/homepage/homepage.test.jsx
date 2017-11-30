import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import HomePage from 'templates/homepage/homepage'
import { HappeningNow } from 'organisms/homepage/happening-now/happening-now'

describe('HomePage', () => {
  test('should render HomePage', () => {
    const component = shallow(<HomePage />)
    expect(component).toMatchSnapshot()
  })
})