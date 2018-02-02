import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import CourseView, {
  TableOfContents,
  Summary,
  Course,
  Tagcloud,
  Worksheets,
  RelatedCourses,
  RelatedArticles,
  CTA
} from 'templates/course/course.view.jsx'

describe('<CourseView />', () => {
  describe('Breadcrumb', () => {
    test('has a breadcrumb trail', () => {
      const component = shallow(<CourseView />)
      const result = component.find('Breadcrumb').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

  describe('<h1>Title</h1>', () => {
    test('has a title', () => {
      const props = {
        title: 'How to write a business plan'
      }

      const component = shallow(<CourseView {...props} />)
      const result = component.find('h1').text()
      const expected = 'How to write a business plan'

      expect(result).toEqual(expected)
    })
  })

  describe('<Summary />', () => {
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

  describe('<TableOfContents />', () => {
    test('has a table of contents', () => {
      const component = shallow(<TableOfContents />)
      const result = component.find('li').length
      const expected = 2

      expect(result).toEqual(expected)
    })
  })

  describe('<DownloadFlash />', () => {
    test('has a mobile message that course is unavailable', () => {
      const component = shallow(<CourseView />)
      const result = component.find('DownloadFlash').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

  describe('<Course />', () => {
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

  describe('<Tagcloud />', () => {
    test('has a tag cloud', () => {
      const props = {
        tags: [
          {
            description: 'tag a',
            url: '#'
          },
          {
            description: 'tag b',
            url: '#'
          },
          {
            description: 'tag c',
            url: '#'
          }
        ]
      }

      const component = shallow(<Tagcloud {...props} />)
      const result = component.find('a').length
      const expected = 3

      expect(result).toEqual(expected)
    })
  })

  describe('<Worksheets />', () => {
    test('has a collection of worksheet links', () => {
      const props = {
        course: {
          worksheets: [
            {
              description: 'How to write a business plan checklist',
              url: '#'
            },
            {
              description: 'Balance sheet template',
              url: '#'
            }
          ]
        }
      }

      const component = shallow(<Worksheets {...props} />)
      const result = component.find('li').length
      const expected = 2

      expect(result).toEqual(expected)
    })
  })

  describe('<RelatedCourses />', () => {
    const props = {
      relatedCourses: [
        {
          type: 'card',
          image: {
            url: 'https://www.sba.gov/sites/default/files/2017-05/Loans_Counseling_and_Education_0.jpg',
            alt: 'Intro to accounting'
          },
          link: {},
          subtitleText:
            'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
          titleText: 'Intro to accounting'
        }
      ]
    }

    test('has related courses', () => {
      const component = shallow(<RelatedCourses {...props} />)
      const result = component.find('CardCollection').length
      const expected = 1

      expect(result).toEqual(expected)
    })

    test('has "See All Courses" button', () => {
      const component = shallow(<RelatedCourses {...props} />)
      const result = component.find('LargeSecondaryButton').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

  describe('<RelatedArticles />', () => {
    test('has related articles', () => {
      const props = {
        relatedArticles: [
          {
            type: 'card',
            link: {
              url: '#',
              title: 'Read More'
            },
            subtitleText:
              'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
            titleText: 'Write your business plan'
          },
          {
            type: 'card',
            link: {
              url: '#',
              title: 'Read More'
            },
            subtitleText:
              'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
            titleText: 'Calculate your startup costs'
          }
        ]
      }

      const component = mount(<RelatedArticles {...props} />)
      const result = component.find('Card').length
      const expected = 2

      expect(result).toEqual(expected)
    })
  })

  describe('<CTA />', () => {
    test('has a call to action component', () => {
      const component = shallow(<CTA />)
      const result = component.find('CallToAction').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })
})
