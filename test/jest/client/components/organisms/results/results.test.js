/* eslint-env jest */

import React from 'react'
import { Results, OfficeDetail } from 'organisms'
import { NoResultsSection, Paginator } from 'molecules'
import { shallow } from 'enzyme'

describe('Results', () => {
  describe('Custom detail results view', () => {
    test.skip('should render custom detail component (OfficeDetail) when passed into customDetailResultsView as a prop', () => {
      const customDetailResultsView = () => <OfficeDetail />
      const items = [{}]
      const mockSelectedItem = {
        item: {
          title: ['Office of the Officer'],
          location_zipcode: ['20416']
        }
      }
      const component = shallow(
        <Results
          customDetailResultsView={customDetailResultsView}
          selectedItem={mockSelectedItem}
          items={items}
        />
      )
      expect(component.find(OfficeDetail)).toHaveLength(1)
    })
    test('should not render custom detail component (OfficeDetail) when no item is selected', () => {
      const customDetailResultsView = () => <OfficeDetail />
      const items = [{}]
      const component = shallow(<Results customDetailResultsView={customDetailResultsView} items={items} />)
      expect(component.find(OfficeDetail)).toHaveLength(0)
    })
  })

  describe('No Results Section tests', () => {
    test.skip('Displays No Results Section when enabled and no results', () => {
      const searchTips = ['tip1', 'tip2', 'tip3']
      const displaySearchTipsOnNoResults = false
      const items = []
      const component = shallow(
        <Results
          items={items}
          searchTips={searchTips}
          displaySearchTipsOnNoResults={displaySearchTipsOnNoResults}
        />
      )
      const noResultsSection = component.find(NoResultsSection).get(0)
      expect(noResultsSection).not.toBeUndefined()
    })

    test('Does not display No Results Section when not enabled and no results', () => {
      const searchTips = ['tip1', 'tip2', 'tip3']
      const displaySearchTipsOnNoResults = false
      const items = []
      const component = shallow(
        <Results
          items={items}
          searchTips={searchTips}
          displaySearchTipsOnNoResults={displaySearchTipsOnNoResults}
        />
      )
      const noResultsSection = component.find(NoResultsSection).get(0)
      expect(noResultsSection).toBeUndefined()
    })
  })

  describe('Pagination Section tests', () => {
    test('Hides Paginator when hide feature enabled and no results', () => {
      const hidePaginatorOnNoResults = true
      const items = []
      const component = shallow(
        <Results paginate items={items} hidePaginatorOnNoResults={hidePaginatorOnNoResults} />
      )
      const paginatorNode = component.find(Paginator).get(0)
      expect(paginatorNode).toBeUndefined()
    })

    test.skip('Does not hide Paginator when hide feature not enabled and no results', () => {
      const hidePaginatorOnNoResults = false
      const items = []
      const component = shallow(
        <Results items={items} paginate hidePaginatorOnNoResults={hidePaginatorOnNoResults} />
      )
      const paginatorNode = component.find(Paginator).get(0)
      expect(paginatorNode).not.toBeUndefined()
    })

    test('Does not hide Paginator when hide feature enabled and there are results', () => {
      const hidePaginatorOnNoResults = true
      const items = ['item1']
      const component = shallow(
        <Results items={items} paginate hidePaginatorOnNoResults={hidePaginatorOnNoResults} />
      )
      const paginatorNode = component.find(Paginator).get(0)
      expect(paginatorNode).not.toBeUndefined()
    })

    test('Hides Paginator when pagination is disabled', () => {
      const items = ['item1']
      const component = shallow(<Results items={items} />)
      const paginatorNode = component.find(Paginator).get(0)
      expect(paginatorNode).toBeUndefined()
    })
  })
})
