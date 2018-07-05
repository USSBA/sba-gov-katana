import React from 'react'
import { shallow } from 'enzyme'
import { SearchTemplate } from '../../../../../../src/client/components/templates/search/search.jsx'

describe('Search Template', () => {
  it('updates query parameter values when onchange is called', () => {
    const queryParamName = 'myQueryParam'
    const userEnteredText = 'user entered text'
    const searchBar = shallow(<SearchTemplate searchType="none" />)
    expect(searchBar.state('searchParams')[queryParamName]).toBeUndefined()
    searchBar.instance().onChange(queryParamName, userEnteredText)
    expect(searchBar.state('searchParams')[queryParamName]).toEqual(userEnteredText)
  })
})
