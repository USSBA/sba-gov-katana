import React from 'react'
import SearchPage, { SearchBar, ResultsList } from 'client/components/pages/search-page/search-page.jsx'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

describe('SearchPage', () => {
  test('to match snapshot', () => {
    const component = renderer.create(<SearchPage />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('SearchBar', () => {
    describe('TextInput', () => {
      it('has one input field', () => {
        const component = mount(<SearchBar />)
        const result = component.find('TextInput').length
        const expected = 1

        expect(result).toEqual(expected)
      })
    })

    describe('SmallPrimaryButton', () => {
      it('has one submit button', () => {
        const component = mount(<SearchBar />)
        const result = component.find('SmallPrimaryButton').length
        const expected = 1

        expect(result).toEqual(expected)
      })

      it('the submit button has a label of "Search"', () => {
        const component = mount(<SearchBar />)
        const result = component.find('SmallPrimaryButton').props().text
        const expected = 'Search'

        expect(result).toEqual(expected)
      })
    })
  })

  describe('ResultsList', () => {
    describe('Paginator', () => {
      it('has two paginator instances', () => {
        const props = {
          paginator: {
            start: 0,
            end: 10
          },
          paginatorTotal: 98,
          list: [
            {
              title: 'Title',
              description:
                'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
              url: 'https://sba.gov/lorem-ipsum/'
            }
          ]
        }
        const component = mount(<ResultsList {...props} />)
        const result = component.find('Paginator').length
        const expected = 2

        expect(result).toEqual(expected)
      })
    })
  })
})
