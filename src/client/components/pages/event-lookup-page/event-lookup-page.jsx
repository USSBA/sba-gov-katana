import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'

import styles from './event-lookup-page.scss'
import { StyleWrapperDiv, TextInput, MultiSelect } from 'atoms'
import { EventResult, PrimarySearchBar, Results, PagingLookup } from 'organisms'
import SearchTemplate from '../../templates/search/search'
import clientConfig from '../../../services/client-config.js'
import moment from 'moment'

const getDateRange = (baseTime, range) => {
  function calculateStartDate(startDay) {
    let date
    if (startDay === 'tomorrow') {
      date = moment(baseTime)
        .add(1, 'd')
        .startOf('day')
        .format()
    } else {
      date = moment(baseTime).format()
    }
    return date
  }

  function calculateEndDate(dayOffset) {
    return moment(baseTime)
      .add(dayOffset, 'd')
      .endOf('day')
      .format()
  }

  let result

  if (clientConfig.useD8EventsBackend) {
    //TODO cleanup when we switch to D8 backend
    switch (range) {
      case 'all':
        result = calculateStartDate('today')
        break
      case 'today':
        result = calculateStartDate('today') + ',' + calculateEndDate(0)
        break
      case 'tomorrow':
        result = calculateStartDate('tomorrow') + ',' + calculateEndDate(1)
        break
      case '7days':
        result = calculateStartDate('today') + ',' + calculateEndDate(6)
        break
      case '30days':
        result = calculateStartDate('today') + ',' + calculateEndDate(29)
        break
    }
  } else {
    switch (range) {
      case 'all':
        result = 'all'
        break
      case 'today':
        result = 'today'
        break
      case 'tomorrow':
        result = 'tomorrow'
        break
      case '7days':
        result = '7days'
        break
      case '30days':
        result = '30days'
        break
    }
  }
  return result
}

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

    return result
  }

  render() {
    const { shouldDisableDistance, shouldDisableSearchButton } = this.state
    const baseTime = moment().utc()
    const defaultDateRange = clientConfig.useD8EventsBackend ? baseTime.format() : 'all' //TODO cleanup when we switch to D8 backend
    const defaultSearchParams = {
      dateRange: defaultDateRange,
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
                value: getDateRange(baseTime, 'all')
              },
              {
                label: 'Today',
                value: getDateRange(baseTime, 'today')
              },
              {
                label: 'Tomorrow',
                value: getDateRange(baseTime, 'tomorrow')
              },
              {
                label: 'Next 7 Days',
                value: getDateRange(baseTime, '7days')
              },
              {
                label: 'Next 30 Days',
                value: getDateRange(baseTime, '30days')
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
export { getDateRange }
