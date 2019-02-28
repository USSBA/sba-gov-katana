import React from 'react'
import { shallow } from 'enzyme'
import EventResult from '../../../../../../src/client/components/organisms/event-result/event-result.jsx'
import { Button, Link } from 'atoms'

const mockEvent = {
  title: 'Business Entrepreneurship Course',
  type: 'event',
  description: 'The two-step training program includes introduction to Entrepreneurship Two-Day Course',
  id: '1234',
  registrationUrl: 'https://www.eventbrite.com/e/entrepreneurship-small-business-track-tickets-51895259117',
  startDate: '2019-02-26T07:30:00-08:00',
  endDate: '2019-02-26T12:30:00-08:00',
  timezone: 'PST',
  cost: '0.00',
  locationType: 'In Person',
  location: {
    city: 'Camp Pendleton',
    state: 'California'
  }
}

describe('Event result', () => {
  it('renders the title within a link', () => {
    const component = shallow(<EventResult id={mockEvent.id} item={mockEvent} />)
    expect(component.find(Link).find('#event-title-1234')).toHaveLength(1)
    const componentTitle = component
      .find(Link)
      .find('#event-title-1234')
      .text()
    expect(componentTitle).toEqual('Business Entrepreneurship Course')
  })

  it('renders cost as Free when the cost is 0.00', () => {
    const component = shallow(<EventResult id={mockEvent.id} item={mockEvent} />)
    expect(component.find('#event-cost-1234')).toHaveLength(1)
    const componentCost = component.find('#event-cost-1234').text()
    expect(componentCost).toEqual('Free')
  })
})
