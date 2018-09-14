/* eslint-env jest */

import React from 'react'
import { Results, OfficeDetail } from 'organisms'
import { NoResultsSection, Paginator } from 'molecules'
import { shallow, mount } from 'enzyme'

describe('Results', () => {
  describe('Office Details tests', () => {
    //todo: make this more generic to not just office results and details once refactor occurs
    const props = {
      items: [
        {
          fields: {
            item: {
              geolocation: ['38.884628,-77.016292'],
              location_city: ['Washington'],
              location_name: ['SBA Headquarters'],
              location_phone_number: ['(202) 205-6780'],
              location_state: ['DC'],
              location_street_address: ['409 3rd St SW,, Suite 5300'],
              location_zipcode: ['20416'],
              office_type: ['SBA Headquarters Office'],
              summary: [
                'The Office of Human Resources Solutions (OHRS) und…man Capital services to meet the dynamic needs of'
              ],
              title: ['Office of the Chief Human Capital Officer'],
              type: ['office']
            }
          },
          exprs: {
            distance: '0.8088529979132633'
          }
        }
      ]
    }

    test('should display OfficeDetail', () => {
      const mockSelectedItem = {
        item: props.items[0].fields.item,
        distance: props.items[0].exprs.distance
      }
      const component = mount(<Results {...props} selectedItem={mockSelectedItem} />)
      expect(component.find(OfficeDetail)).toHaveLength(1)
    })

    test('should display office details distance', () => {
      const _props = {
        selectedItem: {
          item: props.items[0].fields.item,
          distance: props.items[0].exprs.distance
        },
        hideDetailState: () => {}
      }
      const component = shallow(<OfficeDetail {..._props} />)
      expect(component.find('.office-distance')).toHaveLength(1)
    })

    test('should display office details title', () => {
      const _props = {
        selectedItem: {
          item: props.items[0].fields.item,
          distance: props.items[0].exprs.distance
        },
        hideDetailState: () => {}
      }
      const component = shallow(<OfficeDetail {..._props} />)
      expect(component.find('.office-title')).toHaveLength(1)
    })

    test.skip('should display office details summary', () => {
      const _props = {
        selectedItem: {
          item: props.items[0].fields.item,
          distance: props.items[0].exprs.distance
        },
        hideDetailState: () => {}
      }
      const component = shallow(<OfficeDetail {..._props} />)
      expect(component.find('.office-summary')).toHaveLength(1)
    })
  })
  describe('No Results Section tests', () => {
    test('Displays No Results Section when enabled and no results', () => {
      const searchTips = ['tip1', 'tip2', 'tip3']
      const displaySearchTipsOnNoResults = true
      const items = []
      const component = shallow(
        <Results
          items={items}
          searchTips={searchTips}
          displaySearchTipsOnNoResults={displaySearchTipsOnNoResults}
        />
      )
      const noResultsSection = component.find(NoResultsSection).node
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
      const noResultsSection = component.find(NoResultsSection).node
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
      const paginatorNode = component.find(Paginator).node
      expect(paginatorNode).toBeUndefined()
    })

    test('Does not hide Paginator when hide feature not enabled and no results', () => {
      const hidePaginatorOnNoResults = false
      const items = []
      const component = shallow(
        <Results items={items} paginate hidePaginatorOnNoResults={hidePaginatorOnNoResults} />
      )
      const paginatorNode = component.find(Paginator).node
      expect(paginatorNode).not.toBeUndefined()
    })

    test('Does not hide Paginator when hide feature enabled and there are results', () => {
      const hidePaginatorOnNoResults = true
      const items = ['item1']
      const component = shallow(
        <Results items={items} paginate hidePaginatorOnNoResults={hidePaginatorOnNoResults} />
      )
      const paginatorNode = component.find(Paginator).node
      expect(paginatorNode).not.toBeUndefined()
    })

    test('Hides Paginator when pagination is disabled', () => {
      const items = ['item1']
      const component = shallow(<Results items={items} />)
      const paginatorNode = component.find(Paginator).node
      expect(paginatorNode).toBeUndefined()
    })
  })
})
