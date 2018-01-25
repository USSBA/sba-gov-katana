import React from 'react'

// import style from './document-lookup-page.scss'
import { LearningCenterCourseLookup } from 'organisms'
import { PagingLookup } from 'organisms'

class LearningCenterCoursePage extends React.Component {
  render() {
    const documentProps = {
      title: 'Learning Center',
      type: 'courses',
      taxonomyFilters: ['courseTopic'],
      fieldsToShowInDetails: ['Topic']
      // defaultSortBy: 'Effective Date',
      // sortByOptions: ['Effective Date', 'Last Updated', 'Title', 'Number']
    }
    return <LearningCenterCourseLookup {...documentProps} />
  }
}

export default LearningCenterCoursePage
