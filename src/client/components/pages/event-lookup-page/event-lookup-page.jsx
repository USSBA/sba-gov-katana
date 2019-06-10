import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'

import styles from './event-lookup-page.scss'
import { StyleWrapperDiv, TextInput, MultiSelect } from 'atoms'
import { EventResult, PrimarySearchBar, Results, PagingLookup } from 'organisms'
import SearchTemplate from '../../templates/search/search'

class EventLookupPage extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      shouldDisableDistance: true
    }
  }

  customSearch(searchType, searchParams) {
    return fetchSiteContent(searchType, searchParams).then(searchResults => {
      const keyword = searchParams.q

      let results = []
      let count = 0
      let hasNoResults = true
      let isLoading = false
      let isZeroState = false
      const defaultResults = []

      if (searchResults && searchResults.count) {
        results = searchResults.items
        count = searchResults.count
        hasNoResults = count === 0
        isLoading = false
        isZeroState = false
      }

      return {
        results,
        count,
        hasNoResults,
        isLoading,
        isZeroState,
        defaultResults
      }
    })
  }

  validateZipCode(input) {
    // only validate if there is an input value
    let result = true
    if (!isEmpty(input)) {
      const fiveDigitRegex = /^\d{5}$/g
      result = fiveDigitRegex.test(input)
    }

    // set state variable shouldDisableDistance in event-lookup-page to false when there is input
    this.setState({ shouldDisableDistance: !input, shouldDisableSearchButton: result })
    // this.setState({ shouldDisableSearchButton: result })

    return result
  }

  render() {
    const { shouldDisableDistance, shouldDisableSearchButton } = this.state
    const defaultSearchParams = {
      dateRange: 'all',
      distance: '200',
      pageSize: 10
    }

    return (
      <SearchTemplate
        searchType="events"
        loadDefaultResults={true}
        scrollToTopAfterSearch={false}
        extraClassName={styles.eventSearch}
        paginate={false}
        customSearch={this.customSearch}
        defaultSearchParams={defaultSearchParams}
        showStatus={true}
      >
        <PrimarySearchBar
          id="events-primary-search-bar"
          title="Find events"
          className={styles.searchBar}
          buttonActive={shouldDisableSearchButton}
        >
          <TextInput
            id="keyword-search"
            queryParamName="q"
            className={styles.search}
            label="Search"
            placeholder="Enter keyword"
            validationState={''}
            showSearchIcon={true}
            data-cy="keyword search"
          />
          <MultiSelect
            id="date-filter"
            queryParamName="dateRange"
            label="Date Range"
            autoFocus={false}
            className={styles.multiselect}
            multi={false}
            options={[
              {
                label: 'All Upcoming',
                value: 'all'
              },
              {
                label: 'Today',
                value: 'today'
              },
              {
                label: 'Tomorrow',
                value: 'tomorrow'
              },
              {
                label: 'Next 7 Days',
                value: '7days'
              },
              {
                label: 'Next 30 Days',
                value: '30days'
              }
            ]}
            dataCy="date"
          />
          <TextInput
            id="zip"
            queryParamName="address"
            className={styles.field + ' ' + styles.zip}
            label="Near"
            placeholder="Enter Zip Code"
            validationFunction={this.validateZipCode.bind(this)}
            errorText="Enter a 5-digit zip code."
            data-cy="zip"
          />
          <MultiSelect
            id="distance-filter"
            queryParamName="distance"
            label="Distance"
            autoFocus={false}
            className={styles.multiselect}
            multi={false}
            disabled={shouldDisableDistance}
            options={[
              {
                label: '200 miles',
                value: '200'
              },
              {
                label: '100 miles',
                value: '100'
              },
              {
                label: '50 miles',
                value: '50'
              },
              {
                label: '25 miles',
                value: '25'
              }
            ]}
            dataCy="distance"
          />
        </PrimarySearchBar>
        <StyleWrapperDiv className={styles.searchResults}>
          <Results
            hasSearchInfoPanel
            results
            paginate
            searchTermName={'q'}
            enableLoadingMessage={true}
            enableNoResultsMessage={false}
          >
            <EventResult />
          </Results>
        </StyleWrapperDiv>
      </SearchTemplate>
    )
  }
}

export default EventLookupPage
