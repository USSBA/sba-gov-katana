import React from 'react'
import { reduce } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import naics from "./naics";
import styles from './developer-tester.scss'
import { CoursesLayout } from 'organisms'

const courses = [
  {
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
  },
  {
    body:
      '<p>As a small business owner, do you know what your federal, state and local legal obligations are? This course will give you an overview of the legal requirements of small business owners.<br />\r\nDuration: 00:30:01</p>\r\n',
    courseCategory: ['Plan your business'],
    courseMaterials: [
      {
        url: '/sites/default/files/2018-01/Legal_Requirements_Checklist_1.pdf',
        description: 'Legal Requirements Checklist'
      }
    ],
    courseType: 'Flash',
    courseUrl: {
      url: '/tools/learning-center-view-course/1482148',
      title: ''
    },
    image: {
      url: '/sites/default/files/2018-01/9-license2_500.jpg',
      alt: 'Legal Requirements for Small Business'
    },
    summary: ' An overview of legal requirements for small businesses and how they can impact you.',
    transcript: '<p><em>TRANSCRIPT - Legal Requirements for Small Business </em></p>',
    type: 'course',
    title: 'Legal Requirements for Small Business',
    id: 5882,
    updated: 1517602302,
    created: 1516897029
  },
  {
    body:
      '<p>This self-paced training exercise is an introduction to financing options for your business.Topics include; determining your financial needs, loans, grants, venture capital, angel investors, crowd funding and other financial options available to small businesses.<br />\r\nDuration: 00:30:01</p>\r\n',
    courseCategory: ['Plan your business'],
    courseMaterials: [
      {
        url: '/sites/default/files/2018-01/Worksheet_Financing_Options.pdf',
        description: 'Financing Options Worksheet'
      }
    ],
    courseType: 'Flash',
    courseUrl: {
      url: '/tools/learning-center-view-course/863441',
      title: ''
    },
    image: {
      url: '/sites/default/files/2018-01/shutterstock_648969952_500.jpg',
      alt: 'Financing Options for Small Businesses'
    },
    summary: 'An introduction to financing options for your small business.',
    transcript: '<p><strong>Transscript – Financing Options for Small Businesses</strong></p>',
    type: 'course',
    title: 'Financing Options for Small Businesses',
    id: 5884,
    updated: 1517602262,
    created: 1516898917
  },
  {
    body:
      '<p>This course is designed to provide an overview of accounting, including concepts and terminology.<br />\r\nDuration: 00:30:01</p>\r\n',
    courseCategory: ['Manage your business'],
    courseMaterials: [
      {
        url: '/sites/default/files/2018-01/SBA_Keyboard_Shortcuts_6_2.pdf',
        description: 'SBA Keyboard Shortcuts'
      },
      {
        url: '/sites/default/files/2018-01/cash_flow_statement.xlt',
        description: 'Cash Flow Statement'
      },
      {
        url: '/sites/default/files/2018-01/income_statement.xlt',
        description: 'Income Statement'
      },
      {
        url: '/sites/default/files/2018-01/balance_sheet.xlt',
        description: 'Balance Sheet'
      },
      {
        url: '/sites/default/files/2018-01/accounting_worksheet.pdf',
        description: 'Accounting Worksheet'
      }
    ],
    courseType: 'HTML5',
    courseUrl: {
      url: '/tools/learning-center-view-course/364071',
      title: ''
    },
    image: {
      url: '/sites/default/files/2018-01/shutterstock_560877814_500.jpg',
      alt: 'Introduction to Accounting'
    },
    summary: 'An overview of accounting concepts and terminology.',
    transcript: '<p><strong>Transcript - Introduction to Accounting </strong>',
    type: 'course',
    title: 'Introduction to Accounting',
    id: 5886,
    updated: 1517602282,
    created: 1516900929
  },
  {
    body:
      '<p>This course provides a basic overview of marketing for small business owners who are looking to reach a broader customer base and expand their markets. Learn what marketing is and why it is vital to growth. The course covers how to conduct market research and developing marketing strategies while providing marketing resources for small business owners.<br />\r\nDuration: 00:30:01</p>\r\n',
    courseCategory: ['Manage your business'],
    courseMaterials: [
      {
        url: '/sites/default/files/2018-01/SBA_Keyboard_Shortcuts_6_1.pdf',
        description: 'SBA Keyboard Shortcuts'
      },
      {
        url: '/sites/default/files/2018-01/Marketing101_Worksheet.pdf',
        description: 'Marketing 101 Worksheet'
      },
      {
        url: '/sites/default/files/2018-01/Marketing101_CheckList_Final_20160725.pdf',
        description: 'Marketing 101 Checklist'
      }
    ],
    courseType: 'Flash',
    courseUrl: {
      url: '/tools/learning-center-view-course/364081',
      title: ''
    },
    image: {
      url: '/sites/default/files/2018-01/shutterstock_665356801_500.jpg',
      alt: 'Marketing 101: A Guide to Winning Customers'
    },
    summary:
      'An overview of marketing for small business owners who are looking to reach a broader customer base and expand their markets.',
    transcript: '<p><strong>&nbsp;</strong><strong>TRANSCRIPT – Marketing 101 </strong></p>',
    type: 'course',
    title: 'Marketing 101: A Guide to Winning Customers',
    id: 5888,
    updated: 1517602237,
    created: 1516901819
  }
]

export class DeveloperTester extends React.Component {
  render() {
    const manyCourses = _.concat(courses, courses, courses)
    return (
      <div>
        <div className={styles.container}>
          <hr />
          <p>The content is the five courses in the system right now repeated three times</p>
          <CoursesLayout
            items={manyCourses}
            onReset={_ => {
              window.alert('You hit reset')
            }}
          />
        </div>
        <div className={styles.container}>
          <hr />
          <p>The version below was given no items</p>
          <CoursesLayout
            items={[]}
            onReset={_ => {
              window.alert('You hit reset')
            }}
          />
        </div>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(DeveloperTester)
