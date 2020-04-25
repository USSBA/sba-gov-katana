import React from 'react'
import { isEmpty } from 'lodash'

import styles from './lender-lookup-page.scss'
import { StyleWrapperDiv, TextInput, MultiSelect } from 'atoms'
import { PrimarySearchBar, Results, LenderDetail, LenderResult, OfficeMap } from 'organisms'
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
    const pageSize = 20
    const defaultSearchParams = {
      pageSize
    }

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
        <PrimarySearchBar
          id="lender-primary-search-bar"
          title="Find Eligible Paycheck Protection Program Lenders"
          subtext="Notice: The SBA will resume accepting Paycheck Protection Program applications from participating lenders on Monday, April 27, 2020 at 10:30am EDT."
          className={styles.searchBar}
        >
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
          {/* TC-3 Uncomment when adding back in tax question */}
          {/* <MultiSelect
            id="has-filed-2019-taxes"
            queryParamName="hasFiled2019Taxes"
            label="Have you filed your 2019 Taxes?"
            autoFocus={false}
            className={styles.multiselect}
            multi={false}
            options={[
              {
                label: 'Yes',
                value: true
              },
              {
                label: 'No',
                value: false
              }
            ]}
            dataCy="has-filed-2019-taxes"
          /> */}
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
            onClick={item => {
              this.centerMap(true)
              this.setSelectedItem(item)
            }}
            selectedItem={selectedItem}
            hoveredMarkerId={hoveredMarkerId}
            onResultHover={id => {
              this.setHoveredMarkerId(id)
            }}
            customDetailResultsView={this.customDetailResultsView.bind(this)}
            extraContainerStyles={styles.centerContainer}
            extraResultContainerStyles={styles.resultContainer}
            setWhiteBackground
          >
            <LenderResult />
          </Results>
        </StyleWrapperDiv>
        <div className={styles.noticeWithLink}>
          {`If you notice incorrect bank information, please contact your `}
          <a href="https://www.sba.gov/tools/local-assistance/districtoffices">SBA District Office</a>
        </div>
      </SearchTemplate>
    )
  }
}

export default LenderLookupPage
