import React from 'react'
import { connect } from 'react-redux'
import { assign, camelCase, chain, includes, pickBy, startCase, isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'

import styles from './global-search.scss'
import { ApplyButton, MultiSelect } from 'atoms'
import * as ContentActions from '../../../actions/content.js'
import { logPageEvent } from '../../../services/analytics.js'
import { getQueryParams } from '../../../services/utils.js'
import { logEvent } from '../../../services/analytics.js'
import { CardCollection } from 'organisms'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

export class GlobalSearch extends React.PureComponent {
  constructor(ownProps) {
    super()
    this.state = {
      searchValues: {},
      filterValues: {},
      items: [
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
            url: '/tools/learning-center-view-course/363951',
            title: ''
          },
          image: {
            url: '/sites/default/files/2018-01/2-plan_500.jpg',
            alt: 'How to Write a Business Plan'
          },
          summary:
            'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
          type: 'course',
          title: 'How to Write a Business Plan',
          transcript:
            '<p><strong>How to Write a Business Plan</strong></p>\r\n\r\n<p><strong>1 Course Introduction</strong></p>\r\n\r\n<p><strong>1.1 Course Purpose</strong><br />\r\nWelcome to the How to Write a Business Plan course.</p>\r\n\r\n<p>Produced by the SBA’s Office of Entrepreneurship Education, the How to Write a Business Plan<br />\r\ncourse expands on topics relevant to those individuals who are planning to write a business plan</p>\r\n\r\n<p>The How to Write a Business Plan course is comprised of two topics.</p>\r\n\r\n<p>The course begins and sets the tone by defining a business plan as well as appropriate audiences<br />\r\nand its importance to business success.</p>\r\n\r\n<p>The course continues by explaining in detail the contents of each section within a business plan.</p>\r\n\r\n<p>We recommend completing the Course Introduction and Topic 1: What is a Business Plan?<br />\r\nbefore proceeding to other topics.</p>\r\n\r\n<p>Click the Next button below to get started; use this button to navigate through the course Or, to<br />\r\ngo directly to a specific topic, select the desired topic from the menu to the right.</p>\r\n\r\n<p><strong>Click here to learn more. (link opens in a new window)</p>\r\n',
          id: 5880,
          updated: 1516916588,
          created: 1516892830,
          program: ['Microlending']
        },
        {
          body:
            '<p>This course is designed to provide an overview of accounting, including concepts and terminology.<br />\r\nDuration: 00:30:00</p>\r\n',
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
          type: 'course',
          title: 'Introduction to Accounting',
          transcript:
            '<p><strong>Transcript - Introduction to Accounting </strong></p>\r\n\r\n<p>Course Introduction</p>\r\n\r\n<p><strong>Welcome to the Introduction to Accounting Training for Entrepreneurs </strong></p>\r\n\r\n<p>The SBA Learning Center presents: Introduction to Accounting.</p>\r\n\r\n<p>Produced by the SBA’s Office of Entrepreneurship Education, this self-paced course will demystify accounting concepts and terminology.</p>\r\n\r\n<p>This training course takes approximately 30 minutes to complete. Additional time will be needed to review the provided resources and to complete the next step exercises at the end of the course. After you complete the course, you will have the option to receive a printed Certificate of Completion from SBA.</p>\r\n\r\n<p>Select next to get started.</p>\r\n\r\n<p><strong>Course Overview </strong></p>\r\n\r\n<p>Did you know that about fifty percent of small businesses fail in the first four years? (Source: http://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm)</p>\r\n\r\n<p>Accounting skills are essential when starting and operating a new business, so it is important that you understand basic accounting concepts and terminology to ensure you do not fall in that fifty percentile. This course introduces key concepts and principles for accounting and provides an overview of the different types of financial statements available for entrepreneurs to make [good business] decisions.</p>\r\n\r\n<p>In lesson one, we will define accounting and describe basic accounting concepts such as the importance of accounting, the uses and users of accounting, as well as types of accounting.</p>\r\n\r\n<p>Next, in lesson two, we will explain the basics of bookkeeping, the importance of keeping accurate books, the accounting life cycle, and the types of bookkeeping systems available.</p>\r\n\r\n<p>In lesson three, we will describe the differences between income and expenses.</p>\r\n\r\n<p>Then for lessons four, five, and six, we will define and describe the components for the balance sheet, the income statement, and the cash flow statement.</p>\r\n\r\n<p>Finally, in lesson seven, we will explain the importance of hiring a professional and provide tips for finding the right accounting software.</p>\r\n\r\n<p>You can quickly navigate to any of these lessons by selecting the dropdown menu. Select the lesson title to jump to the desired lesson.</p>\r\n\r\n<p>Select next to go over the course objectives.</p>\r\n\r\n<p><strong>Legal Requirements for Small Business </em>course will give you an overview of the legal requirements of small business owners.</p>\r\n\r\n<p><strong>Try a Tool. </strong></p>\r\n\r\n<p>SBA’s partner, SCORE, has created a Business Planning &amp; Financial Statements Template Gallery that may help you get started.</p>\r\n\r\n<p><strong>Find local assistance! </strong></p>\r\n\r\n<p>SBA has a broad network of skilled counselors and business development specialists that can be located using our zip-code tool.</p>\r\n',
          id: 5886,
          updated: 1516915956,
          created: 1516900929,
          program: ['SBIC']
        }
      ]
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
      names: this.props.taxonomyFilters.join(',')
    })
  }

  handleChange(event, selectStateKey) {
    this.handleQueryChange(selectStateKey, event.value)
    this.setState({})
  }

  handleQueryChange(field, value) {
    if (field !== 'searchTerm') {
      // Log Analytic Event, but not for search term
      this.fireDocumentationLookupEvent(`${field}: ${value}`)
    }
    const newQueryFieldValue = {}
    newQueryFieldValue[field] = value
    const currentQuery = this.state.searchValues
    const newQuery = assign({}, currentQuery, newQueryFieldValue)
    this.setState({ searchValues: newQuery })
  }

  fireDocumentationLookupEvent(action, value = null) {
    this.fireEvent('course-topic-lookup', action, value)
  }

  fireEvent(category, action, value) {
    logEvent({
      category: category,
      action: action,
      label: window.location.pathname,
      value: value
    })
  }

  renderMultiSelects(taxonomies) {
    const _multiselects = taxonomies.map(taxonomy => {
      let newName
      const { name } = taxonomy
      const id = `${createSlug(name)}-select`
      const stateName = camelCase(name)
      const includesAllInTaxonomy = ['All', ...taxonomy.terms]
      const options = includesAllInTaxonomy.map(entry => {
        return { label: entry, value: entry }
      })

      if (name === 'businessStage') {
        newName = 'courseTopic'
      }

      const _ms = {
        id: id,
        onChange: event => {
          this.handleChange(event, stateName)
        },
        name: id,
        label: startCase(newName || name),
        value: this.state.searchValues[name] || 'All',
        options: options
      }

      return _ms
    })

    return _multiselects.map((multiSelectProps, index) => {
      const returnNull = () => {
        return null
      }

      return (
        <div className={styles.multiSelect} key={index}>
          <MultiSelect
            {...multiSelectProps}
            onBlur={returnNull}
            onFocus={returnNull}
            validationState=""
            errorText=""
            autoFocus={false}
            multi={false}
          />
        </div>
      )
    })
  }

  onSubmit() {
    this.setState({
      filterValues: this.state.searchValues
    })
    this.filterAndRenderItems(this.state.filterValues.businessStage)
  }

  filterAndRenderItems(filterValue = 'All') {
    if ((filterValue === undefined && isEmpty(this.state.filteredValues)) || filterValue === 'All') {
      return this.state.items.map((item, index) => {
        return <div>{this.renderItem(item, index)}</div>
      })
    } else {
      return this.state.items.map((item, index) => {
        if (item.courseCategory.includes(filterValue)) {
          return this.renderItem(item, index)
        }
      })
    }
  }

  renderItem(item, index) {
    return (
      <div>
        <p key={index}>{item.title}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.props.taxonomies && (
            <div>
              {this.renderMultiSelects(this.props.taxonomies)}
              <div className={styles.applyButton}>
                <ApplyButton submit={this.onSubmit.bind(this)} />
              </div>
            </div>
          )}
        </div>
        <div>{this.filterAndRenderItems(this.state.filterValues.businessStage)}</div>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    taxonomies: reduxState.contentReducer.taxonomies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(GlobalSearch)

// filterAndRenderItems(filterValues) {
//   const filteredData = this.filterItems(filterValues)
//   return filteredData.map((item, index) => {
//     return this.renderItem(item, index)
//   })
// }

// filterAndRenderItems(filteredValues) {
//   // for(const filterValue in filteredValues) {

//   // }
//   if ((filteredValues === undefined && isEmpty(this.state.filteredValues)) || filterValue === 'All') {
//     return this.state.items.map((item, index) => {
//       return <div>{this.renderItem(item, index)}</div>
//     })
//   } else {
//     for(const filterValue in filteredValues) {
//       return this.state.items.map((item, index) => {
//         if (item.courseCategory.includes(filterValue) && this.state.items.indexOf(item.id)) {
//           return this.renderItem(item, index)
//         }
//       })
//     }
//   }
// }

//   filterItems(filterValues) {
//     const filteredData = []
// if (filterValues === undefined ||
//     Object.values(filterValues).every(value => {
//       return value === 'All'
//     })) {
//         console.log('GO')
//         this.state.items.map((item) => {
//           filteredData.push(item)
//         })
//     } else {

//       console.log('STOP')
//       this.state.items.map((item) => {
//         if (item.includes(filterValues[filterValue])) {
//           filteredData.push(item)
//         }
//       })
//       for(const filterValue in filterValues) {
//         this.state.items.map((item) => {
//           console.log('ITEM',item)
//           if (item.filterValue.includes(filterValues[filterValue])) {
//             filteredData.push(item)
//           }
//         })
//       }
//     }
//     return filteredData
//   }
