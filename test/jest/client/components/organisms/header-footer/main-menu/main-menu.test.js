/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { MainMenu, SubMenu } from 'organisms'

const data = [
  {
    link: 'http://www.testlink.org',
    linkTitle: 'My Test Link',
    children: []
  },
  {
    link: 'http://www.testlink2.org',
    linkTitle: 'My Test Link 2',
    children: []
  },
  {
    link: 'http://www.testlink3.org',
    linkTitle: 'My Test Link 3',
    children: []
  }
]
const datum = [
  {
    link: 'http://www.testlink.org',
    linkTitle: 'My Test Link',
    children: []
  }
]
const emptyData = []

describe('Main Menu Organism', () => {
  test('renders Submenus based when passed a data property with multiple entries', () => {
    const component = shallow(<MainMenu data={data} />)
    const submenus = component.find(SubMenu)
    expect(submenus.length).toEqual(data.length)
  })

  test('submenus receive data property', () => {
    const component = shallow(<MainMenu data={datum} />)
    const submenus = component.find(SubMenu)
    expect(submenus.length).toEqual(datum.length)
    expect(submenus.prop('data')).toEqual(datum[0])
  })

  test('there are no errors when data is empty', () => {
    const component = shallow(<MainMenu data={emptyData} />)
    const submenus = component.find(SubMenu)
    expect(submenus.length).toEqual(emptyData.length)
  })
})
