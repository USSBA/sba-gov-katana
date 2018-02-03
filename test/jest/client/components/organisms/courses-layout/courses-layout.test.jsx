import React from 'react'
import renderer from 'react-test-renderer'

import { CoursesLayout } from 'organisms'

describe('CoursesLayout', () => {
  test('should render the first page properly', () => {
    const mockCourse = {
      body:
        '<p>This course explains the importance of business planning, defines and describes the components of a business plan, and provides access to sample plans and resources that can help you develop a very good business plan.<br />\r\nDuration: 00:30:01</p>\r\n',
      courseCategory: ['Plan your business'],
      courseMaterials: [
        {
          url: '/sites/default/files/2018-01/CHECKLIST_-_How_to_Write_a_Business_Plan.pdf',
          description: 'Checklist - How to Write a Business Plan'
        },
        {
          url: '/sites/default/files/2018-01/SBA_Keyboard_Shortcuts_6_13.pdf',
          description: 'SBA Keyboard Shortcuts'
        },
        {
          url: '/sites/default/files/2018-01/BalanceSheet.xlsx',
          description: 'Balance Sheet Template'
        },
        {
          url: '/sites/default/files/2018-01/Income_Statement_for_BPlan_Course.xlsx',
          description: 'Income Statement Template'
        },
        {
          url: '/sites/default/files/2018-01/Cash_Flow_Statement.xlsx',
          description: 'Cash Flow Statement Template'
        }
      ],
      courseType: 'Flash',
      courseUrl: {
        url: '/tools/learning-center-view-course/363951',
        title: ''
      },
      image: {
        url: '/sites/default/files/2018-01/2-plan_500.jpg',
        alt: 'How to Write a Business Plan'
      },
      summary:
        'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
      transcript: '<p><strong>How to Write a Business Plan</strong>',
      type: 'course',
      title: 'How to Write a Business Plan',
      id: 5880,
      updated: 1517602209,
      created: 1516892830
    }
    const mockCourses = Array.apply(null, Array(25)).map(function(x, i) {
      return mockCourse
    })
    const component = renderer.create(<CoursesLayout items={mockCourses} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
