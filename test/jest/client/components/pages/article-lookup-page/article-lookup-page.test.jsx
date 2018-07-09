import React from 'react'
import { shallow } from 'enzyme'
import ArticleLookupPage from 'pages/article-lookup-page/article-lookup-page'
import { PagingLookup } from 'organisms'

describe('ArticleLookupPage', () => {
  test('should render a page lookup', () => {
    // an article lookup page is just renders a paging lookup and nothing more
    const component = shallow(<ArticleLookupPage />)
    const result = component.find(PagingLookup).length
    const expected = 1
    expect(result).toEqual(expected)
  })
})
