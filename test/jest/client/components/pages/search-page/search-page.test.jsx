import React from 'react'
import { SearchPage, SearchBar, ResultsList } from 'client/components/pages/search-page/search-page.jsx'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

describe('SearchPage', () => {
  test('to match snapshot', () => {
    const mockFunction = jest.fn()

    const props = {
      actions: {
        fetchContentIfNeeded: mockFunction
      }
    }

    const component = renderer.create(<SearchPage {...props} />)
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
          searchResults: [
            {
              title: 'Title',
              description: 'Description',
              url: '#'
            }
          ],
          pageNumber: 1,
          pageSize: 5
        }
        const component = mount(<ResultsList {...props} />)
        const result = component.find('Paginator').length
        const expected = 2

        expect(result).toEqual(expected)
      })
    })
  })
})
