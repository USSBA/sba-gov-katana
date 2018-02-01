import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import LearningCenterDetailTemplate, {
  TableOfContents,
  Summary,
  Course
} from 'templates/learning-center/detail.jsx'

describe('LearningCenterDetailTemplate', () => {
  describe('Breadcrumb', () => {
    test('has a breadcrumb trail', () => {
      const component = shallow(<LearningCenterDetailTemplate />)
      const result = component.find('Breadcrumb').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

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
    test('has a summary', () => {
      const props = {
        summary: 'test summary'
      }

      const component = shallow(<Summary {...props} />)
      const result = component.find('p').text()
      const expected = 'test summary'

      expect(result).toEqual(expected)
    })
  })

  describe('TableOfContents', () => {
    test('has a table of contents', () => {
      const props = {
        tableOfContents: [
          {
            url: '#',
            title: 'contents link'
          },
          {
            url: '#',
            title: 'contents link'
          },
          {
            url: '#',
            title: 'contents link'
          }
        ]
      }

      const component = shallow(<TableOfContents {...props} />)
      const result = component.find('li').length
      const expected = 3

      expect(result).toEqual(expected)
    })
  })

  describe('DownloadFlash', () => {
    test('has a mobile message that course is unavailable', () => {
      const component = shallow(<LearningCenterDetailTemplate />)
      const result = component.find('DownloadFlash').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

  describe('Course', () => {
    const props = {
      course: {
        url: '#',
        transcript: {
          url: '#',
          summary: 'abcde'
        }
      }
    }

    const component = shallow(<Course {...props} />)

    test('has a course with an iframe source set', () => {
      const result = component.find('iframe').prop('src')
      const expected = '#'

      expect(result).toEqual(expected)
    })

    test('has a course with a transcript summary', () => {
      const result = component.find('.transcript-box p').text()
      const expected = 'abcde'

      expect(result).toEqual(expected)
    })

    test('has a course with a transcript button', () => {
      const result = component.find('SmallSecondaryButton').length
      const expected = 1

      expect(result).toEqual(expected)
    })

    test('has a course with a transcript link', () => {
      const result = component.find('a').prop('href')
      const expected = '#'

      expect(result).toEqual(expected)
    })
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
})
