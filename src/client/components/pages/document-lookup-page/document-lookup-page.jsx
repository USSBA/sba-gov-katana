import React from 'react'

import { PagingLookup } from 'organisms'

class DocumentLookupPage extends React.Component {
  render() {
    const documentProps = {
      title: 'Documentation Lookup',
      type: 'documents',
      taxonomyFilters: ['documentType', 'program', 'documentActivity', 'office'],
      fieldsToShowInDetails: ['Activity', 'Program', 'Summary'],
      defaultSortBy: 'Effective Date',
      sortByOptions: ['Effective Date', 'Last Updated', 'Title', 'Number']
    }
    return <PagingLookup {...documentProps} />
  }
}

export default DocumentLookupPage
