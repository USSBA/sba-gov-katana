/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { TextSection } from 'atoms'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

describe('TextSection', () => {
  test('should render a simple paragraph', () => {
    const text = '<p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render several paragraphs', () => {
    const text = '<p>test</p><p>test</p><p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render several paragraphs with an unordered list in the middle', () => {
    const text = '<p>test</p><ul><li>1</li>1<li></li></ul><p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
