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
    const description = 'This is a description'
    const props = {
      eventData: {
        description: description
      }
    }
    const component = shallow(<Event {...props} />)
    const result = component.find('p')
    const expected = 1
    expect(result).toHaveLength(expected)
    expect(result.text()).toBe(description)
  })
  test('should render a registration button', () => {
    const component = shallow(<Event />)
    const result = component.find('.register-button')
    const expected = 1
    expect(result).toHaveLength(expected)
  })
})
