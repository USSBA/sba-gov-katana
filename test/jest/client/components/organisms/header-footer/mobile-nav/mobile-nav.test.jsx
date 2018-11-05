/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react'
/*eslint-enable no-unused-vars*/
import ReactSelect from 'react-select'
import { MobileNav } from 'organisms'
import { mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

jest.mock('client/services/utils')
import { getLanguageOverride } from 'client/services/utils'
getLanguageOverride.mockImplementation(() => 'en')

test('Mobile Navigation has the correct structure', () => {
  const component = renderer.create(<MobileNav />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Mobile Navigation shows the For Partners link', () => {
  const component = mount(<MobileNav />)
  const menuItems = component.find('.mobile-nav-menu-item')
  expect(menuItems.length).toBe(4)
  const anchors = menuItems.find('a')
  expect(anchors.at(0).text()).toBe('SBA en Español')
  expect(anchors.at(1).text()).toBe('For Partners')
  expect(anchors.at(2).text()).toBe('SBA Near You')
  expect(anchors.at(3).text()).toBe('Small Business Events')
})

// TODO add test here for to render more than just an empty menu
