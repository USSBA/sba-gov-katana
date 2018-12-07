import React from 'react'
var sinon = require('sinon')
import { shallow } from 'enzyme'
import * as helper from 'client/fetch-content-helper'
import Course from 'templates/course/course'
let exampleCourse = {
  body:
    '<p>This course explains the importance of business planning, defines and describes the components of a business plan, and provides access to sample plans and resources that can help you develop a very good business plan.<br />\r\nDuration: 00:30:00</p>\r\n',
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
    url: '/media/training/howtowriteabusinessplan_02022017/story.html',
    title: ''
  },
  image: {
    url: '/sites/default/files/2018-01/2-plan_500.jpg',
    alt: 'How to Write a Business Plan',
    width: 500,
    height: 340
  },
  summary:
    'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
  transcript: 'Some Transcript',
  type: 'course',
  title: 'How to Write a Business Plan',
  id: 5880,
  updated: 1519147473,
  created: 1516892830,
  url: '/course/how-write-business-plan',
  isFound: true
}

describe('Course', () => {
  let fetchSiteContentStub
  beforeAll(done => {
    fetchSiteContentStub = sinon.stub(helper, 'fetchSiteContent')
    done()
  })

  afterAll(done => {
    fetchSiteContentStub.restore()
    done()
  })

  beforeEach(done => {
    history.pushState({}, null, '?lang=en')
    fetchSiteContentStub.reset()
    done()
  })

  test('rendering of the CourseContent', () => {
    fetchSiteContentStub.returns(Promise.resolve(exampleCourse))
    const component = shallow(<Course location={{ pathname: '/test/course' }} />)
    expect(component).toMatchSnapshot()
  })
})
