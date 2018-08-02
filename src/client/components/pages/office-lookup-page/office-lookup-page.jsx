import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContentActions from '../../../actions/content.js'
import { find, cloneDeep, isEmpty } from 'lodash'

import styles from './office-lookup-page.scss'
import { TaxonomyMultiSelect, MultiSelect, TextInput, Toggle } from 'atoms'
import {
  GlobalSearch,
  OfficesLayout,
  PrimarySearchBar,
  SecondarySearchBar,
  Results,
  OfficeResult,
  OfficeMap
} from 'organisms'
import { NoResultsSection } from 'molecules'
import SearchTemplate from '../../templates/search/search.jsx'

class OfficeLookupPage extends React.Component {
  componentWillMount() {
    const necessaryTaxonomies = ['officeType', 'officeService']
    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
      names: necessaryTaxonomies.join(',')
    })
  }

  getTaxonomy(name) {
    if (!this.props.taxonomies) {
      return {
        name: '',
        terms: []
      }
    }
    const taxonomy = find(this.props.taxonomies, { name: name }) || { name: '', terms: [] }
    return taxonomy
  }

  // todo move to own component
  renderNoResultsView() {}

  render() {
    const defaultZipCode = 20024
    const pageSize = 5
    const defaultType = 'All'
    const defaultSearchParams = {
      address: defaultZipCode,
      pageSize,
      type: defaultType
    }
    const officeTypeTaxonomy = this.getTaxonomy('officeType')
    const officeServiceTaxonomy = this.getTaxonomy('officeService')
    const { items, isLoading } = this.props
    const searchTips = [
      'Try a different search term, like “counseling” instead of "counselor".',
      'Try searching with different ZIP code.',
      'Try filtering by a different service, resource type or distance.'
    ]

    return (
      <SearchTemplate
        searchType="offices"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={true}
        scrollToTopAfterSearch={false}
        extraClassName={styles.officeSearch}
        paginate={false}
      >
        <PrimarySearchBar id="office-primary-search-bar" title="Find local assistance">
          <TextInput
            id="search"
            queryParamName="q"
            className={styles.field + ' ' + styles.search}
            label="Find"
            placeholder="Counseling, training, mentoring..."
            validationState={''}
            showSearchIcon={true}
          />

          <TextInput
            id="zip"
            queryParamName="address"
            className={styles.field + ' ' + styles.zip}
            label="Near"
            placeholder="Zip Code"
            value={defaultZipCode}
            validationFunction={input => {
              const fiveDigitRegex = /^\d{5}$/g
              return fiveDigitRegex.test(input)
            }}
            errorText="Enter a 5-digit zip code."
          />

          <TaxonomyMultiSelect
            taxonomy={officeTypeTaxonomy}
            label="Provided By"
            queryParamName="type"
            multi={false}
            className={styles.field + ' ' + styles.search}
          />
        </PrimarySearchBar>
        {/* Commenting out for now, but perhaps the children of the secondary search bar can be reused in the primary search bar
        <SecondarySearchBar id="office-secondary-search-bar">
          <TaxonomyMultiSelect
            taxonomy={officeServiceTaxonomy}
            queryParamName="service"
            label="Service:"
            multi={false}
            className={styles.search}
          />
          <Toggle
            id="allOffices"
            queryParamName="isSbaOffice"
            options={[
              { name: 'All Offices', value: 'All' },
              { name: 'SBA Offices', value: 'true', fontAwesomeIconClassName: 'shield' }
            ]}
          />
        </SecondarySearchBar> */}
        {/*
        TODO: Uncomment this if we need a no results section
        <NoResultsSection searchTips={searchTips}/> */}
        <OfficeMap id="office-map" />
        <Results
          id="office-results"
          paginate
          scroll
          extraClassName={styles.officeResults}
          hasSearchInfoPanel
          searchTermName={'q'}
        >
          <OfficeResult />
        </Results>
      </SearchTemplate>
    )
  }
}

function mapReduxStateToProps(reduxState, props) {
  return {
    taxonomies: reduxState.contentReducer.taxonomies,
    location: props.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(OfficeLookupPage)
export { OfficeLookupPage }
