import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { FrontPageHero } from 'organisms'

describe('Front Page Hero', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<FrontPageHero />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('callout button renders correct event config', () => {
    const eventConfig = {
      category: 'Front-Page-Hero',
      action: 'Click: See the guide'
    }

    const component = shallow(<FrontPageHero />)
    expect(component.find('LargeInversePrimaryButton').props().eventConfig).toEqual(eventConfig)
  })
})
