import React from 'react'
import renderer from 'react-test-renderer'

import { CoursesLayout } from 'organisms'

describe('CoursesLayout', () => {
  test('should render the first page properly', () => {
    const TOTAL = 25

    const mockCourse = {
      body: '<p>some html</p>',
      courseCategory: ['Grow your business'],
      courseMaterials: [
        {
          url: '/sites/default/files/2018-02/ANC%20Workbook%20P.pdf',
          description: 'Workbook'
        }
      ],
      courseType: 'Flash',
      courseUrl: {
        url: 'https://s3.amazonaws.com/training.sba.gov/courses/2013/anc/index.htm',
        title: ''
      },
      image: {
        url: '/sites/default/files/2018-02/shutterstock_649579099_500.jpg',
        alt: 'ANC Business Guide: 8(a) Business Development Program'
      },
      summary:
        'Overview of assistance available to Alaska Native Corporations from the 8(a) Business Development Program.',
      transcript: '<p>some html</p>',
      type: 'course',
      title: 'ANC Business Guide: 8(a) Business Development Program',
      id: 5922,
      updated: 1518720798,
      created: 1517955056,
      url: '/course/anc-business-guide-8a-business-development-program'
    }
    const mockCourses = Array.apply(null, Array(TOTAL)).map((_, i) => mockCourse)

    const component = renderer.create(<CoursesLayout items={mockCourses} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
