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
})
