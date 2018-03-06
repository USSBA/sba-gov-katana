import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import CourseContent from 'templates/course/course-content'
import sharedProps from './course-test-props'

// Quiet warnings about OnTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

describe('<CourseContent />', () => {
  const component = mount(<CourseContent {...sharedProps} />)

  test('initially has a button in an overlay', () => {
    const result = component.find('.course-overlay LargePrimaryButton').length
    const expected = 1

    expect(result).toEqual(expected)
  })

  test('initially has a course without an iframe set', () => {
    const result = component.find('iframe').prop('src')
    const expected = ''

    expect(result).toEqual(expected)
  })

  test('when user clicks to start the course, iframe is set', () => {
    const expected = 'https://www.youtube.com/embed/owsfdh4gxyc'
    component.find('.course-overlay').simulate('click')
    const result = component.find('iframe').prop('src')

    expect(result).toEqual(expected)
  })

  test('has a course ReadMore component', () => {
    const result = component.find('ReadMore').length
    const expected = 1

    expect(result).toEqual(expected)
  })
})
