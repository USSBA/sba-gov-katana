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
    const result = component.find('p')
    const expected = 1
    expect(result).toHaveLength(expected)
    expect(result.text()).toBe(description)
  })
  test('should render a registration button', () => {
    const props = {
      eventData: {
        registrationUrl: 'my-url'
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('.register-button')
    const expected = 1
    expect(result).toHaveLength(expected)
  })
  test('should not render a registration button with an empty string', () => {
    const props = {
      eventData: {
        registrationUrl: ''
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('.register-button')
    const expected = 0
    expect(result).toHaveLength(expected)
  })
  test('should not render a registration button with no registrationUrl value', () => {
    const props = {
      eventData: {}
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('.register-button')
    const expected = 0
    expect(result).toHaveLength(expected)
  })
})
