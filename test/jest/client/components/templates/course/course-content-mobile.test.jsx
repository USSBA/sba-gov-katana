import React from 'react'
import renderer from 'react-test-renderer'

// mock mobile browser detection to be true
jest.mock('ismobilejs', () => ({ any: true }))
import isMobile from 'ismobilejs'

import { mount } from 'enzyme'

import CourseContent from 'templates/course/course-content'
import props from './course-test-props'

describe('<CourseContent /> on mobile', () => {
  const component = mount(<CourseContent {...props} />)

  test('on mobile user sees "not supported" message', () => {
    const result = component.find('.course-overlay h2').length
    const expected = 1

    expect(result).toEqual(expected)
  })

  test('on mobile user clicks to start the course, iframe is NOT set', () => {
    const expected = ''
    component.find('.course-overlay').simulate('click')
    const result = component.find('iframe').prop('src')

    expect(result).toEqual(expected)
  })
})
