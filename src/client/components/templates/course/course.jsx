import React, { PureComponent } from 'react'
import { isEmpty } from 'lodash'
import CourseView from './course.view.jsx'
import { fetchSiteContent } from '../../../fetch-content-helper'

class Course extends PureComponent {
  constructor() {
    super()

    this.state = {
      title: 'My Course Title'
    }
  }

  componentWillMount() {
    let pathname = this.props.location.pathname

    if (pathname.slice(-1) === '/') {
      pathname = pathname.slice(0, pathname.length - 1)
    }

    // fetch course
    fetchSiteContent('course', {
      pathname
    }).then(result => this.mapCourseData.bind(this, result)())
  }

  mapCourseData(courseData) {
    if (!isEmpty(courseData)) {
      const data = courseData

      const props = {
        title: data.title,
        summary: data.summary,
        description: data.body,
        course: {
          url: data.courseUrl.url //'https://www.sba.gov/media/training/howtowriteabusinessplan_02022017/story.html'
        },
        isLoaded: data.isFound
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
          url: data.location,
          title: data.title
        }
      ]
      // set tags
      props.tags = data.courseCategory.map
        ? data.courseCategory.map(category => ({
            description: category,
            url: '/course/?topic=' + encodeURI(category)
          }))
        : []

      // add worksheets
      props.course.worksheets = data.courseMaterials.slice ? data.courseMaterials.slice() : []

      // add readMoreSectionItem object for "View Transcripts" area
      props.readMoreSectionItem = {
        expandedCopyText: data.transcript,
        titleText: 'Course Transcript',
        preview: data.body
      }

      // disable relatedCourses and relatedArticles
      props.relatedCourses = []
      props.relatedArticles = []
      this.setState(props)
    }
  }

  render() {
    return (
      <div>
        <CourseView {...this.state} />
      </div>
    )
  }
}
export default Course
