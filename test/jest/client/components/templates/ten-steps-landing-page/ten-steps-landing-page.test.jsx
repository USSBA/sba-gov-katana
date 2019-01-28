import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import TenStepsLandingPage from 'templates/ten-steps-page/ten-steps-landing-page.jsx'

const store1 = {
  getState: () => {
    return false
  },
  subscribe: () => {
    return false
  },
  dispatch: () => {
    return false
  }
}
describe('TenStepsLandingPage', () => {
  test('should render TenStepsLandingPage', () => {
    history.pushState({}, null, '?lang=en')

    const component = shallow(<TenStepsLandingPage store={store1} />)
    expect(component).toMatchSnapshot()
  })
})
