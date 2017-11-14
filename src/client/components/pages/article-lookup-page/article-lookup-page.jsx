import React from 'react'
import { PagingLookup } from 'molecules'
import style from './article-lookup-page.scss'

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
