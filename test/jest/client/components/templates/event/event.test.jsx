import React from 'react'
import { shallow } from 'enzyme'
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
    const recurringType = 'Recurs daily'
    const recurring = 'Yes'
    const expected = 'Reoccurs daily'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact,
        recurringType: recurringType,
        recurring: recurring
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-recurring')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render event location in details box', () => {
    const expected =
      'Fayetteville State University1200 Murchison Road, Fayetteville, North Carolina 28301View on Map'
    const props = {
      eventData: {
        title: title,
        location: location,
        contact: contact
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('p#event-details-location')
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
})
