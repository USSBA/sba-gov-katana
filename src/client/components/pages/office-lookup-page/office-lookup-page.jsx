import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch } from 'organisms'

class OfficeLookupPage extends React.Component {
  render() {
    const officeProps = {
      title: 'Office Lookup', //TODO: find out what the real title is
      taxonomyFilters: ['officeType'],
      type: 'offices'
    }
    return <GlobalSearch {...officeProps} location={this.props.location} />
  }
}

export default OfficeLookupPage
