import React from 'react'
import { find, isEmpty } from 'lodash'

import styles from './lender-lookup-page.scss'
import { StyleWrapperDiv, TextInput } from 'atoms'
import {
  PrimarySearchBar,
  Results,
  LenderDetail,
  LenderResult,
  OfficeMap
  // DefaultOfficeResult
} from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

class LenderLookupPage extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      selectedItem: {},
      newCenter: {},
      shouldCenterMap: false,
      hoveredMarkerId: ''
    }
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
        <LenderDetail selectedItem={selectedItem} hideDetailState={hideDetailState} />
      </div>
    )
  }

  render() {
    const { selectedItem, newCenter, shouldCenterMap, hoveredMarkerId } = this.state
    const pageSize = 5
    // const defaultType = 'All'
    const defaultSearchParams = {
      pageSize
      // type: defaultType
    }

    const searchTips = ['Search near a different ZIP code.']

    return (
      <SearchTemplate
        searchType="lenders"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={false}
        scrollToTopAfterSearch={false}
        extraClassName={styles.lenderSearch}
        paginate={false}
        showStatus={false}
        onHandleEvent={this.centerMap.bind(this, false)}
      >
        <PrimarySearchBar id="lender-primary-search-bar" title="Find lenders" className={styles.searchBar}>
          <TextInput
            id="zip"
            queryParamName="address"
            className={styles.field + ' ' + styles.zip}
            label="Near"
            placeholder="Zip Code"
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

        <StyleWrapperDiv className={styles.lenderResults} hideOnZeroState={true}>
          <Results
            id="lender-results"
            paginate={true}
            scroll
            hasSearchInfoPanel
            // searchTermName={'q'}
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
            // displayDefaultResultOnNoResults
            // defaultResultObject={<DefaultOfficeResult />}
            customDetailResultsView={this.customDetailResultsView.bind(this)}
            extraContainerStyles={styles.centerContainer}
            extraResultContainerStyles={styles.resultContainer}
            setWhiteBackground
          >
            <LenderResult />
          </Results>
        </StyleWrapperDiv>
      </SearchTemplate>
    )
  }
}

export default LenderLookupPage
