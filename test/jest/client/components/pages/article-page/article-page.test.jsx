import React from 'react'
import { shallow } from 'enzyme'
import { ArticlePage } from 'pages/article-page/article-page'

describe('ArticlePage', () => {
  test('should render an error page when no data is given', () => {
    const props = {
      actions: {
        fetchContentIfNeeded: jest.fn()
      },
      location: {
        pathname: ''
      }
    }
    const component = shallow(<ArticlePage {...props} />)
    const result = component.find('ErrorPage').length
    const expected = 1
    expect(result).toEqual(expected)
  })
})
