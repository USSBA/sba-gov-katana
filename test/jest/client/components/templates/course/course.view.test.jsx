import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import CourseView, {
  TableOfContents,
  Description,
  Course,
  Tagcloud,
  Worksheets,
  RelatedCourses,
  RelatedArticles,
  CTA
} from 'templates/course/course.view.jsx'

const sharedProps = {
  isLoaded: true,
  title: 'How to write a business plan',
  course: {
    url: 'https://www.youtube.com/embed/owsfdh4gxyc',
    worksheets: [
      {
        description: 'How to write a business plan checklist',
        url: '#'
      }
    ]
  },
  breadcrumbs: [
    {
      url: '#',
      title: 'Learning Center'
    },
    {
      url: '#',
      title: 'Search results'
    },
    {
      url: '#',
      title: 'How to write a business plan'
    }
  ],
  readMoreSectionItem: {
    expandedCopyText: 'expanded text',
    titleText: 'title text',
    preview: 'preview text'
  },
  readMoreExpanded: true,
  onToggleStatus: () => {
    return false
  }
}

describe('<CourseView />', () => {
  describe('Breadcrumb', () => {
    test('has a breadcrumb trail', () => {
      const component = shallow(<CourseView {...sharedProps} />)
      const result = component.find('Breadcrumb').length
      const expected = 1

      expect(result).toEqual(expected)
    })
  })

  describe('<h1>Title</h1>', () => {
    test('has a title', () => {
      const component = shallow(<CourseView {...sharedProps} />)
      const result = component.find('h1').text()
      const expected = 'How to write a business plan'

      expect(result).toEqual(expected)
    })
  })

  describe('<Description />', () => {
    test('has a description with html tags', () => {
      const props = {
        description: '<p>test description</p>'
      }

      const component = shallow(<Description {...props} />)
      const result = component.find('p').prop('dangerouslySetInnerHTML')

      expect(result).toEqual({ __html: '<p>test description</p>' })
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
      const component = shallow(<CourseView {...sharedProps} />)
      const result = component.find('DownloadFlash').length
      const expected = 1

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
