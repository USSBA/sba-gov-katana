import React from 'react'
import { shallow } from 'enzyme'
import Event from 'templates/event/event.jsx'

describe('Event Template', () => {
  test('should render an event title', () => {
    const title = 'This is a title'
    const props = {
      eventData: {
        title: title
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('h1')
    const expected = 1
    expect(result).toHaveLength(expected)
    expect(result.text()).toBe(title)
  })

  test('should render an event description', () => {
    const title = 'This is a title'
    const description = 'This is a description'
    const props = {
      eventData: {
        title,
        description
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-description')
    const expected = 1
    expect(result).toHaveLength(expected)
    expect(result.text()).toBe(description)
  })

  test('should render an event date', () => {
    const startDate = '2019-03-05T00:00:00-08:00'
    const expected = 'Tuesday, March 5'
    const props = {
      eventData: {
        startDate: startDate
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-header-date')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })

  test('should render an event date in details box', () => {
    const startDate = '2019-03-05T00:00:00-08:00'
    const expected = 'Tuesday, March 5, 2019'
    const props = {
      eventData: {
        startDate: startDate
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('#event-details-date')
    expect(result).toHaveLength(1)
    expect(result.text()).toBe(expected)
  })
})
