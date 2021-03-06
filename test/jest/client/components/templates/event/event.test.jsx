import React from 'react'
import { shallow, mount } from 'enzyme'
import Event from 'templates/event/event.jsx'

const title = 'This is a title'
const startDate = '2019-03-05T00:00:00-08:00'
const endDate = '2019-03-05T00:00:00-08:00'
const location = {
  name: 'Fayetteville State University',
  address: '1200 Murchison Road',
  address_additional: '',
  city: 'Fayetteville',
  zipcode: '28301',
  state: 'North Carolina',
  latitude: '35.042389',
  longitude: '-78.841240'
}
const contact = {
  name: 'Sarah Espinosa',
  email: 'sarah@gmail.com',
  phone: '443-403-0291'
}

describe('Event Template', () => {
  test('should render an event title', () => {
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('h1')
    const expected = 1
    expect(result).toHaveLength(expected)
    expect(result.text()).toBe(title)
  })
  test('should render an event description', () => {
    const description = 'This is a description'
    const props = {
      eventData: {
        title: title,
        description: description,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-description')
    const expected = 1
    expect(result).toHaveLength(expected)
    expect(result.text()).toBe(description)
  })

  test('should render an event date', () => {
    const expected = 'Tuesday, March 5'
    const props = {
      eventData: {
        title: title,
        startDate: startDate,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-header-date')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render an event date in details box', () => {
    const expected = 'Tuesday, March 5, 2019'
    const props = {
      eventData: {
        title: title,
        startDate: startDate,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-date')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render if an event is recurring in details box', () => {
    const recurringType = 'Daily'
    const expected = 'Recurs daily'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact,
        recurringType: recurringType
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-recurring')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render event location in details box when event is In Person', () => {
    const expected = 'Fayetteville State University1200 Murchison RoadFayetteville, North Carolina 28301'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact,
        locationType: 'In Person'
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-location')
    expect(result).toHaveLength(1)
    expect(result.text()).toContain(expected)
  })

  test('should render event location as Online in details box when event is Online', () => {
    const expected = 'Online'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact,
        locationType: 'Online'
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-location')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render event contact name in details box', () => {
    const expected = 'Sarah Espinosa'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-organizer')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  it('renders cost, in details box, as Free when the cost is 0', () => {
    const expected = 'Free'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact,
        cost: '0'
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-cost')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  it('renders cost, in details box, as value when cost is greater than 0.00', () => {
    const expected = '$40'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact,
        cost: '40'
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-cost')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render a breadcrumb', () => {
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const breadcrumb = component.find('.breadcrumb')
    const expected = 1
    expect(breadcrumb).toHaveLength(expected)
  })
  test('should render Find Events in the breadcrumb', () => {
    const eventTitle = 'example title'
    const findEventsBreadcrumb = 'Find Events'
    const props = {
      eventData: {
        title: eventTitle,
        location: location,
        contact: contact
      }
    }
    const component = mount(<Event {...props} />)
    const breadcrumb = component.find('a#breadcrumb-level0')
    expect(breadcrumb.text()).toBe(findEventsBreadcrumb)
  })
  test('should render the event title in the breadcrumb', () => {
    const eventTitle = 'example title'
    const props = {
      eventData: {
        title: eventTitle,
        location: location,
        contact: contact
      }
    }
    const component = mount(<Event {...props} />)
    const breadcrumbTitle = component.find('a#breadcrumb-current')
    expect(breadcrumbTitle.text()).toBe(eventTitle)
  })
  test('should render the canceled event message', () => {
    const eventTitle = 'example title'
    const props = {
      eventData: {
        title: eventTitle,
        location,
        contact,
        status: 'Canceled'
      }
    }
    const component = mount(<Event {...props} />)
    const canceledMessage = component.find('#canceled-message')
    expect(canceledMessage.text()).toBe('This event is canceled.')
  })
})
