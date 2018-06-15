import React from 'react'
import jest from 'jest'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { GoogleTranslate } from 'molecules'

describe('Google Translate link', () => {
  test('to render correctly', () => {
    const component = <GoogleTranslate />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('to expand on click event', () => {
    const component = shallow(<GoogleTranslate />)
    expect(component.state().isExpanded).toEqual(false)
    component.find('UtilityLink').simulate('click', { preventDefault: () => {} })
    expect(component.state().isExpanded).toEqual(true)
  })
})
