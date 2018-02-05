import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CourseView from './course.view.jsx'
import * as ContentActions from '../../../actions/content.js'
import * as NavigationActions from '../../../actions/navigation.js'

class Course extends PureComponent {
  constructor() {
    super()

    this.state = {
      title: 'My Course Title'
    }
  }

  getCourseData() {
    /*const { pathname } = this.props.location

    console.log('A', pathname)
    // fetch course
    this.props.actions.fetchContentIfNeeded('course', 'course', {
      pathname
    })*/
    /*

    const data = [
      {
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
          //"url": "/tools/learning-center-view-course/363951",
          url: 'https://www.sba.gov/media/training/howtowriteabusinessplan_02022017/story.html',
          title: ''
        },
        image: {
          url: '/sites/default/files/2018-01/2-plan_500.jpg',
          alt: 'How to Write a Business Plan'
        },
        summary:
          'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
        transcript:
          '<p><strong>How to Write a Business Plan</strong></p>\r\n\r\n<p><strong>1 Course Introduction</strong></p>\r\n\r\n<p><strong>1.1 Course Purpose</strong><br />\r\nWelcome to the How to Write a Business Plan course.</p>\r\n\r\n<p>Produced by the SBA’s Office of Entrepreneurship Education, the How to Write a Business Plan<br />\r\ncourse expands on topics relevant to those individuals who are planning to write a business plan</p>\r\n\r\n<p>The How to Write a Business Plan course is comprised of two topics.</p>\r\n\r\n<p>The course begins and sets the tone by defining a business plan as well as appropriate audiences<br />\r\nand its importance to business success.</p>\r\n\r\n<p>The course continues by explaining in detail the contents of each section within a business plan.</p>\r\n\r\n<p>We recommend completing the Course Introduction and Topic 1: What is a Business Plan?<br />\r\nbefore proceeding to other topics.</p>\r\n\r\n<p>Click the Next button below to get started; use this button to navigate through the course Or, to<br />\r\ngo directly to a specific topic, select the desired topic from the menu to the right.</p>\r\n\r\n<p><strong>Click here to learn more. (link opens in a new window)</p>\r\n',
        type: 'course',
        title: 'How to Write a Business Plan',
        id: 5880,
        updated: 1516916588,
        created: 1516892830
      } /*,{
			"body": "<p>This course is designed to provide an overview of accounting, including concepts and terminology.<br />\r\nDuration: 00:30:00</p>\r\n",
			"courseCategory": [
				"Manage your business"
			],
			"courseMaterials": [{
				"url": "/sites/default/files/2018-01/SBA_Keyboard_Shortcuts_6_2.pdf",
				"description": "SBA Keyboard Shortcuts"
			},{
				"url": "/sites/default/files/2018-01/cash_flow_statement.xlt",
				"description": "Cash Flow Statement"
			},{
				"url": "/sites/default/files/2018-01/income_statement.xlt",
				"description": "Income Statement"
			},{
				"url": "/sites/default/files/2018-01/balance_sheet.xlt",
				"description": "Balance Sheet"
			},{
				"url": "/sites/default/files/2018-01/accounting_worksheet.pdf",
				"description": "Accounting Worksheet"
			}],
			"courseType": "HTML5",
			"courseUrl": {
				"url": "/tools/learning-center-view-course/364071",
				"title": ""
			},
			"image": {
				"url": "/sites/default/files/2018-01/shutterstock_560877814_500.jpg",
				"alt": "Introduction to Accounting"
			},
			"summary": "An overview of accounting concepts and terminology.",
			"transcript": "<p><strong>Transcript - Introduction to Accounting </strong></p>\r\n\r\n<p>Course Introduction</p>\r\n\r\n<p><strong>Welcome to the Introduction to Accounting Training for Entrepreneurs </strong></p>\r\n\r\n<p>The SBA Learning Center presents: Introduction to Accounting.</p>\r\n\r\n<p>Produced by the SBA’s Office of Entrepreneurship Education, this self-paced course will demystify accounting concepts and terminology.</p>\r\n\r\n<p>This training course takes approximately 30 minutes to complete. Additional time will be needed to review the provided resources and to complete the next step exercises at the end of the course. After you complete the course, you will have the option to receive a printed Certificate of Completion from SBA.</p>\r\n\r\n<p>Select next to get started.</p>\r\n\r\n<p><strong>Course Overview </strong></p>\r\n\r\n<p>Did you know that about fifty percent of small businesses fail in the first four years? (Source: http://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm)</p>\r\n\r\n<p>Accounting skills are essential when starting and operating a new business, so it is important that you understand basic accounting concepts and terminology to ensure you do not fall in that fifty percentile. This course introduces key concepts and principles for accounting and provides an overview of the different types of financial statements available for entrepreneurs to make [good business] decisions.</p>\r\n\r\n<p>In lesson one, we will define accounting and describe basic accounting concepts such as the importance of accounting, the uses and users of accounting, as well as types of accounting.</p>\r\n\r\n<p>Next, in lesson two, we will explain the basics of bookkeeping, the importance of keeping accurate books, the accounting life cycle, and the types of bookkeeping systems available.</p>\r\n\r\n<p>In lesson three, we will describe the differences between income and expenses.</p>\r\n\r\n<p>Then for lessons four, five, and six, we will define and describe the components for the balance sheet, the income statement, and the cash flow statement.</p>\r\n\r\n<p>Finally, in lesson seven, we will explain the importance of hiring a professional and provide tips for finding the right accounting software.</p>\r\n\r\n<p>You can quickly navigate to any of these lessons by selecting the dropdown menu. Select the lesson title to jump to the desired lesson.</p>\r\n\r\n<p>Select next to go over the course objectives.</p>\r\n\r\n<p><strong>Legal Requirements for Small Business </em>course will give you an overview of the legal requirements of small business owners.</p>\r\n\r\n<p><strong>Try a Tool. </strong></p>\r\n\r\n<p>SBA’s partner, SCORE, has created a Business Planning &amp; Financial Statements Template Gallery that may help you get started.</p>\r\n\r\n<p><strong>Find local assistance! </strong></p>\r\n\r\n<p>SBA has a broad network of skilled counselors and business development specialists that can be located using our zip-code tool.</p>\r\n",
			"type": "course",
			"title": "Introduction to Accounting",
			"id": 5886,
			"updated": 1516915956,
			"created": 1516900929
		}*/
    //]
    //return data
  }

  componentWillMount() {
    const { first } = this.props.params

    console.log('A', first)
    // fetch course
    this.props.actions.fetchContentIfNeeded('course', 'course', {
      pathname: first
    })
  }

  componentWillReceiveProps(nextProps) {
    //console.log('B', nextProps.course)

    const data = nextProps.course

    const props = {
      title: data.title,
      summary: data.summary,
      course: {
        url: data.courseUrl.url //'https://www.sba.gov/media/training/howtowriteabusinessplan_02022017/story.html'
      }
    }

    // add breadcrumbs
    props.breadcrumbs = [
      {
        url: '/learning-center',
        title: 'Learning Center'
      },
      {
        url: '/course/',
        title: 'Search results'
      },
      {
        url: this.location,
        title: data.title
      }
    ]

    // set tags
    props.tags = data.courseCategory.map(category => {
      return {
        description: category,
        url: '/course/?topic=' + encodeURI(category)
      }
    })

    // add worksheets
    props.course.worksheets = data.courseMaterials.slice()

    // add readMoreSectionItem object for "View Transcripts" area
    props.readMoreSectionItem = {
      expandedCopyText: data.transcript,
      titleText: 'Course Transcript',
      preview: data.body
    }

    this.setState(props)
  }

  render() {
    return (
      <div>
        <CourseView {...this.state} />
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  const { course } = reduxState.contentReducer

  const data = {
    course
  }

  return data
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch),
    navigation: bindActionCreators(NavigationActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Course)
