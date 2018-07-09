/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { Hero } from 'organisms'
import { Button } from 'atoms'
// import data from './hero-test-data.json'

// const title = 'My Basic Page'
// const summary = 'My Basic Page Summary'

describe('Hero Organism', () => {
  test('displays title in an H1 tag', () => {
    const titleText = 'My Title'
    const component = shallow(<Hero title={titleText} />)
    const titleElement = component.find('h1')
    expect(titleElement.text()).toEqual(titleText)
  })

  test('displays message in an H5 tag', () => {
    const message = 'My message'
    const component = shallow(<Hero message={message} />)
    const messageElement = component.find('h5')
    expect(messageElement.text()).toEqual(message)
  })

  test('displays a single button', () => {
    const buttonData = [
      {
        url: '/somewhere',
        btnText: 'Find Somewhere'
      }
    ]
    const component = shallow(<Hero buttons={buttonData} />)
    const button = component.find(Button)
    expect(button).toHaveLength(buttonData.length)
    expect(button.prop('url')).toEqual(buttonData[0].url)
    expect(button.childAt(0).text()).toEqual(buttonData[0].btnText)
  })

  test('displays no buttons', () => {
    const component = shallow(<Hero />)
    const button = component.find(Button)
    expect(button).toHaveLength(0)
  })

  test('displays multiple buttons', () => {
    const buttonData = [
      {
        url: '/somewhere',
        btnText: 'Find Somewhere'
      },
      {
        url: '/somewhere-else',
        btnText: 'Find Somewhere Else'
      },
      {
        url: '/nowhere',
        btnText: 'Find Nowhere'
      }
    ]
    const component = shallow(<Hero buttons={buttonData} />)
    const buttons = component.find(Button)
    expect(buttons).toHaveLength(buttonData.length)
  })
})
