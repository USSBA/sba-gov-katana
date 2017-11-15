import React from 'react'

import style from './article-lookup-page.scss'
import { PagingLookup } from 'organisms'

class ArticleLookupPage extends React.Component {
  render() {
    let articleProps = {
      title: 'Article lookup',
      type: 'articles',
      taxonomyFilters: ['articleCategory', 'program'],
      fieldsToShowInDetails: ['Program', 'Published', 'Summary'],
      defaultSortBy: 'Authored on Date',
      sortByOptions: ['Authored on Date', 'Last Updated', 'Title']
    }
    return <PagingLookup {...articleProps} />
  }
}

export default ArticleLookupPage
