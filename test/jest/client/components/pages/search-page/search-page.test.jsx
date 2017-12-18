import React from 'react'
import SearchPage from 'client/components/pages/search-page/search-page.jsx'
import renderer from 'react-test-renderer'

describe('SearchPage', () => {
  test('to match snapshot', () => {
    const component = renderer.create(<SearchPage />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
