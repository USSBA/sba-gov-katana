import React from 'react'

import { PagingLookup } from 'organisms'
import { fetchRestContent } from '../../../fetch-content-helper'

class ArticleLookupPage extends React.Component {
  constructor() {
    super()
    this.state = {
      sbaOffices: []
    }
  }

  async componentDidMount() {
    const sbaOffices = await fetchRestContent('sbaOffices')

    this.setState({
      sbaOffices
    })
  }

  render() {
    const { sbaOffices } = this.state

    const articleProps = {
      title: 'Article Lookup',
      type: 'articles',
      taxonomyFilters: ['articleCategory', 'program'],
      sbaOffices,
      fieldsToShowInDetails: ['Program', 'Published', 'Summary'],
      defaultSortBy: 'Authored on Date',
      sortByOptions: ['Authored on Date', 'Last Updated', 'Title']
    }
    return <PagingLookup {...articleProps} />
  }
}

export default ArticleLookupPage
