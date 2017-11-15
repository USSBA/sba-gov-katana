import React from 'react'

import style from './document-lookup-page.scss'
import { PagingLookup } from 'organisms'

class DocumentLookupPage extends React.Component {
  render() {
    let documentProps = {
      title: 'Documentation Lookup',
      type: 'documents',
      taxonomyFilters: ['documentType', 'program', 'documentActivity'],
      fieldsToShowInDetails: ['Activity', 'Program', 'Summary'],
      defaultSortBy: 'Effective Date',
      sortByOptions: ['Effective Date', 'Last Updated', 'Title', 'Number']
    }
    return <PagingLookup {...documentProps} />
  }
}

export default DocumentLookupPage
