import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContentActions from '../../../actions/content.js'
import { find, cloneDeep, isEmpty } from 'lodash'

import styles from './office-lookup-page.scss'
import { TaxonomyMultiSelect, StyleWrapperDiv, TextInput } from 'atoms'
import { PrimarySearchBar, Results, OfficeResult, OfficeMap } from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

class OfficeLookupPage extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedItem: {},
      newCenter: {},
      shouldCenterMap: false,
      hoveredMarkerId: ''
    }
  }

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

  setSelectedItem(selectedItem) {
    const newState = {
      selectedItem,
      newCenter: {}
    }

    if (!isEmpty(selectedItem) && !isEmpty(selectedItem.item.geolocation)) {
      const [lat, lng] = selectedItem.item.geolocation[0].split(',')
      newState.newCenter = {
        lat: Number(lat),
        lng: Number(lng)
      }
    }

    this.setState(newState)
  }

  centerMap(shouldCenterMap) {
    this.setState({ shouldCenterMap })
  }

  setHoveredMarkerId(hoveredMarkerId) {
    this.setState({ hoveredMarkerId })
  }

  render() {
    const { selectedItem, newCenter, shouldCenterMap, hoveredMarkerId } = this.state
    const defaultZipCode = 20024
    const pageSize = 5
    const defaultType = 'All'
    const defaultSearchParams = {
      //address: defaultZipCode,
      pageSize,
      type: defaultType
    }
    const officeTypeTaxonomy = this.getTaxonomy('officeType')
    const officeServiceTaxonomy = this.getTaxonomy('officeService')
    const searchTips = [
      'Try using different search term.',
      'Search near a different ZIP code.',
      'Contact your closest SBA office.'
    ]

    return (
      <SearchTemplate
        searchType="offices"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={true}
        scrollToTopAfterSearch={false}
        extraClassName={styles.officeSearch}
        paginate={false}
        onHandleEvent={this.centerMap.bind(this, false)}
      >
        <PrimarySearchBar
          id="office-primary-search-bar"
          title="Find local assistance"
          className={styles.searchBar}
        >
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
            //value={defaultZipCode}
            validationFunction={input => {
              // only validate if there is an input value
              let result = true
              if (!isEmpty(input)) {
                const fiveDigitRegex = /^\d{5}$/g
                result = fiveDigitRegex.test(input)
              }
              return result
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
         */}
        <OfficeMap
          id="office-map"
          onMarkerClick={item => {
            this.centerMap(true)
            this.setSelectedItem(item)
          }}
          selectedItem={selectedItem}
          newCenter={newCenter}
          onDragEnd={() => {
            this.centerMap(true)
          }}
          shouldCenterMap={shouldCenterMap}
          onMarkerHover={id => {
            this.setHoveredMarkerId(id)
          }}
          hoveredMarkerId={hoveredMarkerId}
        />
        <StyleWrapperDiv className={styles.officeResults}>
          <Results
            id="office-results"
            paginate
            scroll
            hasSearchInfoPanel
            searchTermName={'q'}
            onClick={item => {
              this.centerMap(true)
              this.setSelectedItem(item)
            }}
            selectedItem={selectedItem}
            hoveredMarkerId={hoveredMarkerId}
            onResultHover={id => {
              this.setHoveredMarkerId(id)
            }}
            searchTips={searchTips}
            displaySearchTipsOnNoResults
          >
            <OfficeResult />
          </Results>
        </StyleWrapperDiv>
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
