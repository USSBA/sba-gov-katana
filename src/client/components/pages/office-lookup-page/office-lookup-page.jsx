import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContentActions from '../../../actions/content.js'
import { find, cloneDeep, isEmpty } from 'lodash'

import style from './office-lookup-page.scss'
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

  render() {
    const defaultZipCode = 20024
    const pageSize = 5
    const defaultSearchParams = {
      address: defaultZipCode,
      pageSize
    }
    const officeTypeTaxonomy = this.getTaxonomy('officeType')
    const officeServiceTaxonomy = this.getTaxonomy('officeService')
    return (
      <SearchTemplate
        searchType="offices"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={true}
      >
        <PrimarySearchBar id="office-primary-search-bar" title="Find local assistance">
          <TextInput
            id="search"
            queryParamName="q"
            className={style.search}
            label="Find"
            placeholder="Counseling, training, mentoring..."
            validationState={''}
            showSearchIcon={true}
          />

          <TextInput
            id="zip"
            queryParamName="address"
            className={style.zip}
            label="Near"
            placeholder="Zip Code"
            defaultValue={defaultZipCode}
            validationState={''}
          />
        </PrimarySearchBar>
        {/* Commenting out for now, but perhaps the children of the secondary search bar can be reused in the primary search bar
        <SecondarySearchBar id="office-secondary-search-bar">
          <TaxonomyMultiSelect
            taxonomy={officeServiceTaxonomy}
            queryParamName="service"
            label="Service:"
            multi={false}
            className={style.search}
          />
          <TaxonomyMultiSelect
            taxonomy={officeTypeTaxonomy}
            label="Resource Type:"
            queryParamName="type"
            multi={false}
            className={style.search}
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
        <OfficeMap id="office-map" />
        {/*<Results id="office-results">
          <OfficeResult />
        </Results>*/}
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(OfficeLookupPage)
export { OfficeLookupPage }
