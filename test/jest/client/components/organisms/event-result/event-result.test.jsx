import React from 'react'
import { shallow } from 'enzyme'
import EventResult from '../../../../../../src/client/components/organisms/event-result/event-result.jsx'
import { Link } from 'atoms'

const mockEvent = JSON.stringify({
  title: 'Business Entrepreneurship Course',
  type: 'event',
  description: 'The two-step training program includes introduction to Entrepreneurship Two-Day Course',
  id: '1234',
  registrationUrl: 'https://www.eventbrite.com',
  startDate: '2019-02-26T07:30:00-08:00',
  endDate: '2019-02-26T12:30:00-08:00',
  timezone: 'PST',
  cost: '0.00',
  locationType: 'In Person',
  location: {
    city: 'Camp Pendleton',
    state: 'California'
  }
})

describe('Event result', () => {
  it('renders the title within a link', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.title = 'Tested title'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find(Link).find('.event-title')).toHaveLength(1)
    const componentTitle = component
      .find(Link)
      .find('.event-title')
      .text()
    expect(componentTitle).toEqual('Tested title')
  })

  it('renders cost as Free when the cost is 0.00', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.cost = '0.00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-cost')).toHaveLength(1)
    const componentCost = component.find('.event-cost').text()
    expect(componentCost).toEqual('Free')
  })

  it('renders cost as value when cost is greater than 0.00', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.cost = '40.00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-cost')).toHaveLength(1)
    const componentCost = component.find('.event-cost').text()
    expect(componentCost).toEqual('$40.00')
  })

  it('displays the start date in the correct format', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.startDate = '2019-02-26T07:30:00-08:00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-date')).toHaveLength(1)
    const componentDate = component.find('.event-date').text()
    expect(componentDate).toEqual('Tuesday, February 26')
  })

  it('includes the timezone after the displayed time', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.timezone = 'PST'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-time')).toHaveLength(1)
    const componentTime = component.find('.event-time').text()
    expect(componentTime).toEqual('7:30 am–12:30 pm PST') //USE A TO INCLUDE?????????????????????
  })

  it('does not render the time suffix if start and end time suffixes are identical', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.startDate = '2019-02-27T12:00:00-08:00'
    customMockEvent.endDate = '2019-02-27T14:00:00-08:00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-time')).toHaveLength(1)
    const componentTime = component.find('.event-time').text()
    expect(componentTime).toEqual('12–2 pm PST')
  })

  it('renders a whole number for start and end time when there are no minutes', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.startDate = '2019-02-27T12:00:00-08:00'
    customMockEvent.endDate = '2019-02-27T14:00:00-08:00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-time')).toHaveLength(1)
    const componentTime = component.find('.event-time').text()
    expect(componentTime).toEqual('12–2 pm PST')
  })

  it('renders a city, state location when the locationType is "In Person"', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.locationType = 'In Person'
    customMockEvent.location = {
      city: 'Camp Pendleton',
      state: 'California'
    }

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-location')).toHaveLength(1)
    const componentLocation = component.find('.event-location').text()
    expect(componentLocation).toEqual('Camp Pendleton, California')
  })

  it('renders "Online event" when locationType is "Online"', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.locationType = 'Online'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-location')).toHaveLength(1)
    const componentLocation = component.find('.event-location').text()
    expect(componentLocation).toEqual('Online event')
  })
})
