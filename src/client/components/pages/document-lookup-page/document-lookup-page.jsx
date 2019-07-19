import React from 'react'

import { fetchSiteContent, fetchRestContent } from '../../../fetch-content-helper'
import { PagingLookup } from 'organisms'

class DocumentLookupPage extends React.Component {
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

    const documentProps = {
      title: 'Documentation Lookup',
      type: 'documents',

      taxonomyFilters: ['documentType', 'program', 'documentActivity'],
      sbaOffices,
      fieldsToShowInDetails: ['Activity', 'Program', 'Summary'],
      defaultSortBy: 'Effective Date',
      sortByOptions: ['Effective Date', 'Last Updated', 'Title', 'Number']
    }
    return <PagingLookup {...documentProps} />
  }
}

export default DocumentLookupPage
