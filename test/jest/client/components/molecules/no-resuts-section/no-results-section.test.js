/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { NoResultsSection } from 'molecules'

describe('NoResultsSection molecule', () => {
  test('displays search Tips when there are several in the list', () => {
    const searchTips = ['tip1', 'tip2', 'tip3']
    const component = shallow(<NoResultsSection searchTips={searchTips} />)
    const listText = component.find('li').map(node => {
      return node.text()
    })
    expect(listText).toEqual(searchTips)
  })

  test('displays search Tips when there is one in the list', () => {
    const searchTips = ['tip1']
    const component = shallow(<NoResultsSection searchTips={searchTips} />)
    const listText = component.find('li').map(node => {
      return node.text()
    })
    expect(listText).toEqual(searchTips)
  })

  test('displays search Tips when there are search tips and the results are not loading', () => {
    const searchTips = ['tip1', 'tip2', 'tip3']
    const isLoading = false
    const component = shallow(<NoResultsSection isLoading={isLoading} searchTips={searchTips} />)
    const listText = component.find('li').map(node => {
      return node.text()
    })
    expect(listText).toEqual(searchTips)
  })

  test('displays nothing when search tips are undefined', () => {
    const component = shallow(<NoResultsSection />)
    const listNode = component.find('ul')
    expect(listNode.exists()).toEqual(false)
  })

  test('displays nothing when there are 0 search tips', () => {
    const searchTips = []
    const component = shallow(<NoResultsSection searchTips={searchTips} />)
    const listNode = component.find('ul')
    expect(listNode.exists()).toEqual(false)
  })

  test('displays nothing when there are search tips and result items', () => {
    const items = ['item1', 'item2']
    const searchTips = ['tip1', 'tip2', 'tip3']
    const component = shallow(<NoResultsSection items={items} searchTips={searchTips} />)
    const listNode = component.find('ul')
    expect(listNode.exists()).toEqual(false)
  })

  test('displays nothing when there are search tips and the search is loading', () => {
    const isLoading = true
    const searchTips = ['tip1', 'tip2', 'tip3']
    const component = shallow(<NoResultsSection isLoading={isLoading} searchTips={searchTips} />)
    const listNode = component.find('ul')
    expect(listNode.exists()).toEqual(false)
  })
})
