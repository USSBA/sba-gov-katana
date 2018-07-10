/* eslint-env jest */
import React from 'react' // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme'

import { SearchBar } from 'molecules'
import { Link, TextInput } from 'atoms'

describe('SearchBar', () => {
  test('should render the happy path', () => {
    const component = shallow(<SearchBar />)
    expect(component).toMatchSnapshot()
  })

  test('should expand and then submit search', () => {
    const component = shallow(<SearchBar />)
    let mockSearcher = jest.fn()
    SearchBar.prototype.executeSearch = mockSearcher
    component.find(Link).simulate('click', { preventDefault: _ => true })
    expect(component.state('expanded')).toEqual(true)
    component
      .find(TextInput)
      .simulate('change', { target: { value: 'business' }, preventDefault: _ => true })
    expect(component.state('searchValue')).toEqual('business')
    component.find('i#search-button').simulate('click', { preventDefault: _ => true })
    expect(mockSearcher.mock.calls.length).toBe(1)
    expect(mockSearcher.mock.calls[0][0]).toBe('/mysearch?q=business')
  })
})
