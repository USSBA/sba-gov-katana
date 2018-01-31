import React, { PureComponent } from 'react'
import styles from './detail.scss'

class LearningCenterDetailTemplate extends PureComponent {
  render() {
    const { title } = this.props

    return (
      <div className={styles.container}>
        <h1>{title}</h1>
      </div>
    )
  }
}

LearningCenterDetailTemplate.defaultProps = {
  title: 'test'
}

const Summary = props => {
  return <div>Summary</div>
}

const Course = props => {
  return <div>Course</div>
}

const RelatedCourses = props => {
  return <div>RelatedCourses</div>
}

const RelatedArticles = props => {
  return <div>RelatedCourses</div>
}

const DownloadableItems = props => {
  return <div>DownloadableItems</div>
}

const Breadcrumb = props => {
  return <div>Breadcrumb</div>
}

export default LearningCenterDetailTemplate

export { Summary, Course, RelatedCourses, RelatedArticles, DownloadableItems, Breadcrumb }
