import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch } from 'organisms'
import { PagingLookup } from 'organisms'

class GlobalSearchPage extends React.Component {
  render() {
    const documentProps = {
      title: 'Learning Center',
      type: 'courses',
      taxonomyFilters: ['courseTopic'],
      fieldsToShowInDetails: ['Topic'],
      taxonomies: [
        {
          name: 'courseTopic',
          terms: [
            'Exploring an idea',
            'Grow your business',
            'Manage your business',
            'Plan your business',
            'Running a business',
            'SBA programs',
            'Start your business'
          ]
        }
      ]
      // defaultSortBy: 'Effective Date',
      // sortByOptions: ['Effective Date', 'Last Updated', 'Title', 'Number']
    }
    return <GlobalSearch {...documentProps} />
  }
}

export default GlobalSearchPage
