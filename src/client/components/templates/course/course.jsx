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

  componentWillMount() {
    const { pathname } = this.props.location

    // fetch course
    this.props.actions.fetchContentIfNeeded('course', 'course', {
      pathname: 'course/how-write-business-plan'
    })
  }

  componentWillReceiveProps(nextProps) {
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
