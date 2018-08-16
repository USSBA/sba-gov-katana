import React from 'react'
import { Results } from 'organisms'
import { OfficeDetail } from 'organisms'
import { shallow, mount } from 'enzyme'

describe('Results', () => {
  let props = {
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

  /*
	test('should display office details email', () => {
		
	})

	test('should display office details website', () => {
		
	})

	test('should hide office details state', () => {
		
	})

	test('should center map', () => {
		// on result click
			// check if corresponding function has been called
	})
	*/
})
