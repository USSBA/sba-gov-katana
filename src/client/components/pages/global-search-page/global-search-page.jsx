import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch } from 'organisms'

class GlobalSearchPage extends React.Component {
  render() {
    const documentProps = {
      title: 'Learning Center',
      taxonomyFilters: ['businessStage']
    }
    return <GlobalSearch {...documentProps} />
  }
}

export default GlobalSearchPage
