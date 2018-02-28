import React from 'react'

// import style from './document-lookup-page.scss'
import { GlobalSearch, OfficesLayout, PrimarySearchBar } from 'organisms'
import { SearchTemplate } from '../../templates/search/search.jsx'

class OfficeLookupPage extends React.Component {
  render() {
    const officeProps = {
      title: 'Office Lookup', //TODO: find out what the real title is
      taxonomyFilters: ['officeType'],
      type: 'offices',
      searchInputProps: {
        //ToDo: figure out correct placeholders
        placeholder: 'Search by title or number',
        id: 'office-lookup-text-input',
        errorText: 'Please enter the correct thing.',
        label: 'Search',
        validationState: ''
      }
    }
    return (
      // <GlobalSearch {...officeProps} location={this.props.location}>
      //   <OfficesLayout />
      // </GlobalSearch>
      <SearchTemplate necessaryTaxonomies={['officeType']}>
        <PrimarySearchBar title="Small Bussiness Assistance" />
      </SearchTemplate>
    )
  }
}

export default OfficeLookupPage
