import React from 'react'
import { SearchPage, SearchBar, ResultsList } from 'client/components/pages/search-page/search-page.jsx'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
// Quiet warnings about OnTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
import { CloudWatchLogs } from 'aws-sdk'
injectTapEventPlugin()

const mockFunction = jest.fn()
const props = {
  actions: {
    fetchContentIfNeeded: mockFunction
  }
}

describe('SearchPage', () => {
  test('to match snapshot', () => {
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

    describe('Button', () => {
      it('has one submit button', () => {
        const component = mount(<SearchBar />)
        const result = component.find('Button').length
        const expected = 1

        expect(result).toEqual(expected)
      })

      it('the submit button has a label of "Search"', () => {
        const component = mount(<SearchBar />)
        const result = component.find('Button').text()
        const expected = 'Search'

        expect(result).toEqual(expected)
      })
    })
  })

  describe('Results', () => {
    it('should display results when searchResults does not equal 0', () => {
      const component = shallow(<SearchPage {...props} />)

      component.setState({
        searchTerm: 'my search term',
        searchResults: [
          {
            id: '78',
            title: 'Write your business plan'
          }
        ]
      })

      const result = component.find('ResultsList').length
      const expected = 1
      expect(result).toEqual(expected)
    })
  })

  describe('ResultsList', () => {
    describe('Paginator', () => {
      it('has two paginator instances', () => {
        const customProps = {
          searchResults: [
            {
              title: 'Title',
              description: 'Description',
              url: '#'
            }
          ],
          pageNumber: 1,
          pageSize: 5,
          itemCount: 1
        }
        const component = mount(<ResultsList {...customProps} />)
        const result = component.find('Paginator').length
        const expected = 1

        expect(result).toEqual(expected)
      })
    })
  })

  describe('SuggestedRoute', () => {
    it('should display SuggestedRouteCard when there is a search term', () => {
      const component = shallow(<SearchPage {...props} />)
      component.setState({
        searchTerm: 'my search term'
      })

      const result = component.find('SuggestedRouteCard').length
      const expected = 1
      expect(result).toEqual(expected)
    })
    it('should not display SuggestedRouteCard when there is no search term', () => {
      const component = shallow(<SearchPage {...props} />)
      component.setState({
        searchTerm: ''
      })
      const result = component.find('SuggestedRouteCard').length
      const expected = 0
      expect(result).toEqual(expected)
    })
  })

  describe('NoResults', () => {
    it('should display no results message when there are  0 searchResults', () => {
      const component = shallow(<SearchPage {...props} />)

      component.setState({
        searchTerm: 'my search term',
        searchResults: []
      })

      const result = component.find('.results-message')
      const expected = "Sorry, we couldn't find anything matching that query."
      expect(result.text()).toEqual(expected)
    })
  })

  describe('LoadingState', () => {
    it('should display loading message when results have not yet been found', () => {
      const component = shallow(<SearchPage {...props} />)

      component.setState({
        searchTerm: 'my search term'
      })

      const result = component.find('.results-message')
      const expected = 'loading...'
      expect(result.text()).toEqual(expected)
    })
  })
})
