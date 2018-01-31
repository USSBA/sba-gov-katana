import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import LearningCenterDetailTemplate from 'templates/learning-center/detail.jsx'

describe('LearningCenterDetailTemplate', () => {
  describe('Title', () => {
    test('has a title', () => {
      const props = {
        title: 'How to write a business plan'
      }

      const component = shallow(<LearningCenterDetailTemplate {...props} />)
      const result = component.find('h1').text()
      const expected = 'How to write a business plan'

      expect(result).toEqual(expected)
    })
  })

  describe('Summary', () => {
    test('has a summary', () => {})
  })

  describe('Course', () => {
    test('has a course link', () => {})
  })

  describe('DownloadableItems', () => {
    test('has a download link', () => {})
  })

  describe('RelatedCourses', () => {
    test('has related courses', () => {})
  })

  describe('RelatedArticles', () => {
    test('has related articles', () => {})
  })

  describe('Breadcrumb', () => {
    test('has a breadcrumb trail', () => {})
  })

  describe('Mobile', () => {
    test('has a mobile message that course is unavailable', () => {})
  })
})
