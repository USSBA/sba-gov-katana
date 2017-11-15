import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { FrontPageLady } from 'organisms'

describe('front page lady', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<FrontPageLady />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('callout button renders correct event config', () => {
    const eventConfig = {
      category: 'Front-Page-Lady',
      action: "Click: LET'S GO"
    }

    const component = shallow(<FrontPageLady />)
    expect(component.find('LargeInversePrimaryButton').props().eventConfig).toEqual(eventConfig)
  })
})
