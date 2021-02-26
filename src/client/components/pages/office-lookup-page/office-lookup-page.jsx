import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { find, isEmpty } from 'lodash'
import styles from './office-lookup-page.scss'
import { TaxonomyMultiSelect, StyleWrapperDiv, TextInput } from 'atoms'
import {
  PrimarySearchBar,
  Results,
  OfficeDetail,
  OfficeResult,
  OfficeMap,
  DefaultOfficeResult
} from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

class OfficeLookupPage extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      selectedItem: {},
      newCenter: {},
      shouldCenterMap: false,
      hoveredMarkerId: '',
      taxonomies: null,
      isValidZip: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.taxonomies
  }

  componentWillMount() {
    const necessaryTaxonomies = ['officeType', 'officeService']
    fetchSiteContent('taxonomys', {
      names: necessaryTaxonomies.join(',')
    }).then(results => {
      this.setState({ taxonomies: results })
    })
  }

  getTaxonomy(name) {
    if (!this.state.taxonomies) {
      return {
        name: '',
        terms: []
      }
    }
    const taxonomy = find(this.state.taxonomies, { name: name }) || { name: '', terms: [] }
    return taxonomy
  }

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

  customDetailResultsView(resultsClassName, hideDetailState) {
    const { selectedItem } = this.state
    return (
      <div className={resultsClassName}>
        <OfficeDetail selectedItem={selectedItem} hideDetailState={hideDetailState} />
      </div>
    )
  }

  render() {
    const { selectedItem, newCenter, shouldCenterMap, hoveredMarkerId } = this.state
    const pageSize = 20
    const defaultType = 'All'
    const defaultSearchParams = {
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
        loadDefaultResults={false}
        scrollToTopAfterSearch={false}
        extraClassName={styles.officeSearch}
        paginate={false}
        showStatus={false}
        onHandleEvent={this.centerMap.bind(this, false)}
      >
        <PrimarySearchBar
          id="office-primary-search-bar"
          title="Find local assistance"
          className={styles.searchBar}
          isValid={this.state.isValidZip}
        >
          <TextInput
            id="zip"
            queryParamName="address"
            className={styles.field + ' ' + styles.zip}
            label="Buisness Zip Code"
            validationFunction={input => {
              // only validate if there is an input value
              let isValidZip = true
              if (!isEmpty(input)) {
                const fiveDigitRegex = /^\d{5}$/g
                isValidZip = fiveDigitRegex.test(input)
                this.setState({ isValidZip })
              }
              return isValidZip
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
        <StyleWrapperDiv className={styles.officeResults} hideOnZeroState={true}>
          <Results
            id="office-results"
            paginate={true}
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
            displayDefaultResultOnNoResults
            defaultResultObject={<DefaultOfficeResult />}
            customDetailResultsView={this.customDetailResultsView.bind(this)}
            extraContainerStyles={styles.centerContainer}
            extraResultContainerStyles={styles.resultContainer}
            setWhiteBackground
          >
            <OfficeResult />
          </Results>
        </StyleWrapperDiv>
      </SearchTemplate>
    )
  }
}

export default OfficeLookupPage
