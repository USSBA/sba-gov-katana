import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch } from 'organisms'

class LearningCenterLookupPage extends React.Component {
  render() {
    const courseProps = {
      title: 'Learning Center',
      taxonomyFilters: ['businessStage'],
      type: 'courses'
    }
    return (
      <GlobalSearch {...courseProps} location={this.props.location}>
        <CoursesLayout />
      </GlobalSearch>
    )
  }
}

export default LearningCenterLookupPage
