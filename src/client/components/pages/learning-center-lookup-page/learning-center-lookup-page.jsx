import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch } from 'organisms'

class LearningCenterLookupPage extends React.Component {
  render() {
    const courseProps = {
      title: 'Learning Center',
      taxonomyFilters: ['businessStage'],
      type: 'courses',
      defaultSortBy: 'Title'
    }
    return <GlobalSearch {...courseProps} location={this.props.location} />
  }
}

export default LearningCenterLookupPage
