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
  OfficeResult
} from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

class OfficeLookupPage extends React.Component {
  componentWillMount() {
    const necessaryTaxonomies = ['officeType']
    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
      names: necessaryTaxonomies.join(',')
    })
  }

  getTaxonomy(name) {
    if (!this.props.taxonomies) {
      return { name: '', terms: [] }
    }
    const taxonomy = find(this.props.taxonomies, { name: name })
    return taxonomy
  }

  render() {
    const defaultZipCode = 20024
    const defaultSearchParams = {
      zipCode: defaultZipCode,
      pageSize: 20
    }
    const officeTaxonomy = this.getTaxonomy('officeType')

    return (
      <SearchTemplate
        searchType="offices"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={true}
      >
        <PrimarySearchBar id="office-primary-search-bar" title="Find local assistance">
          <TextInput
            id="search"
            queryParamName="term"
            className={style.search}
            label="Find"
            placeholder="Counseling, training, mentoring..."
            validationState={''}
            showSearchIcon={true}
          />

          <TextInput
            id="zip"
            queryParamName="zipCode"
            className={style.zip}
            label="Near"
            placeholder="Zip Code"
            defaultValue={defaultZipCode}
            validationState={''}
          />
        </PrimarySearchBar>
        {/*Uncomment for the secondary search bar- still needs styling*/}
        {/* <SecondarySearchBar id="office-secondary-search-bar">
          <TaxonomyMultiSelect
            queryParamName="office_type"
            taxonomy={officeTaxonomy}
            label="Resource Type:"
            multi={false}
            className={style.search}
          />
          <Toggle
            id="allOffices"
            options={[
              { name: 'All Offices', value: 'All' },
              { name: 'SBA Offices', value: 'SBA', icon: '' }
            ]}
          />
        </SecondarySearchBar> */}
        <Results id="office-results">
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
export default connect(mapReduxStateToProps, mapDispatchToProps)(OfficeLookupPage)
