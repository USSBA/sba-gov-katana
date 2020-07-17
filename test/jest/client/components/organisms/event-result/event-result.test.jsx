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
  cost: '0',
  locationType: 'In Person',
  location: {
    city: 'Camp Pendleton',
    state: 'California'
  }
})

describe('Event result', () => {
  it('renders the title within a link', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.title = 'Business Entrepreneurship Course'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find(Link).find('.event-title')).toHaveLength(1)
    const componentTitle = component
      .find(Link)
      .find('.event-title')
      .text()
    expect(componentTitle).toEqual('Business Entrepreneurship Course')
  })

  it('renders cost as Free when the cost is 0', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.cost = '0'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-cost')).toHaveLength(1)
    const componentCost = component.find('.event-cost').text()
    expect(componentCost).toEqual('Free')
  })

  it('renders cost as value when cost is greater than 0', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.cost = '40'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-cost')).toHaveLength(1)
    const componentCost = component.find('.event-cost').text()
    expect(componentCost).toEqual('$40')
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
    expect(componentTime.includes('PST')).toBe(true)
  })

  it('does not render the time suffix if start and end time suffixes are identical', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.startDate = '2019-02-27T12:00:00-08:00'
    customMockEvent.endDate = '2019-02-27T14:00:00-08:00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    const componentTime = component.find('.event-time').text()

    // This regex matching will go through the whole sting of componentTime and push all matches of 'pm'
    // into an array. We want this array to only have one entry since pm should only render once.
    const timeMatch = componentTime.match(/pm/g) || []
    expect(timeMatch.length).toEqual(1)
  })

  it('renders a whole number for start and end time when there are no minutes', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.startDate = '2019-02-27T12:00:00-08:00'
    customMockEvent.endDate = '2019-02-27T14:00:00-08:00'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.event-time')).toHaveLength(1)
    const componentTime = component.find('.event-time').text()

    // This regex matching will go through the whole sting of componentTime and push all matches of ':00'
    // into an array. We want this array to be empty since :00 should not render for times on the exact hour
    const timeMatch = componentTime.match(/:00/g) || []
    expect(timeMatch.length).toEqual(0)
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

  it('renders register button when there is a registration url', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.registrationUrl = 'https://www.eventbrite.com'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('Button')).toHaveLength(1)
    const buttonText = component
      .find('Button')
      .render()
      .text()
    expect(buttonText).toMatch(/register/i)
  })

  // TODO: Modify or remove this test in the future in the case that
  // we no longer display "Open event" text in place of a registration button
  it('does not render "Open event" text when there is a registration url', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.registrationUrl = 'https://www.eventbrite.com'

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    const doesHaveOpenEventText = component.find('.event-registration').contains('Open event')
    expect(doesHaveOpenEventText).toBe(false)
  })

  it('renders "Open event" when there is no registration url', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.registrationUrl = null

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    const componentRegistrationText = component.find('.event-registration').text()
    expect(componentRegistrationText).toEqual('Open event')
  })

  it('renders "Open event" when the registration url is an empty string', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.registrationUrl = ''

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    const componentRegistrationText = component.find('.event-registration').text()
    expect(componentRegistrationText).toEqual('Open event')
  })

  it('does not render a register button when there is no registration url', () => {
    const customMockEvent = JSON.parse(mockEvent)
    customMockEvent.registrationUrl = null

    const component = shallow(<EventResult id={'result'} item={customMockEvent} />)
    expect(component.find('.register-button')).toHaveLength(0)
  })
})
