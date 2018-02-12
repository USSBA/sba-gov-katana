import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import CourseContent from 'templates/course/course-content'

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

describe('<CourseContent />', () => {
  const component = shallow(<CourseContent {...sharedProps} />)

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

  test('when user clicks starts course, iframe is set', () => {
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
