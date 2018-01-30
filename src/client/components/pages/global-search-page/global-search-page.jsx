import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch } from 'organisms'

class GlobalSearchPage extends React.Component {
  render() {
    const courseProps = {
      title: 'Learning Center',
      taxonomyFilters: ['businessStage']
    }
    return <GlobalSearch {...courseProps} />
  }
}

export default GlobalSearchPage
