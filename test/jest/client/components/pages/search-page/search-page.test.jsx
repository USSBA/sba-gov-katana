import React from 'react'
import SearchPage from 'client/components/pages/search-page/search-page.jsx'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

describe('SearchPage', () => {
  test('to match snapshot', () => {
    const component = renderer.create(<SearchPage />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('TextInput', () => {
    it('has one input field', () => {
      const component = mount(<SearchPage />)
      const result = component.find('TextInput').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

  describe('SmallInverseSecondaryButton', () => {
    it('has one submit button', () => {
      const component = mount(<SearchPage />)
      const result = component.find('SmallInverseSecondaryButton').length
      const expected = 1

      expect(result).toEqual(expected)
    })

    it('the submit button has a label of "Search"', () => {
      const component = mount(<SearchPage />)
      const result = component.find('SmallInverseSecondaryButton').props().text
      const expected = 'Search'

      expect(result).toEqual(expected)
    })
  })
})
