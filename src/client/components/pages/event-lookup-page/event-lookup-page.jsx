import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { isEmpty, sortBy } from 'lodash'
import moment from 'moment-timezone'

import styles from './event-lookup-page.scss'
import { StyleWrapperDiv, TextInput, MultiSelect } from 'atoms'
import { PrimarySearchBar, Results, PagingLookup } from 'organisms'
import SearchTemplate from '../../templates/search/search'
//import MultiSelectBox from '../../atoms/multiselect/multiselect'

class EventLookupPage extends React.PureComponent {
  customSearch(searchType, searchParams) {

    return fetchSiteContent(searchType, searchParams).then(searchResults => {
      const keyword = searchParams.q

      let results = []
      let count = 0
      let hasNoResults = true
      let isLoading = false
      let isZeroState = false
      const defaultResults = []

      if (searchResults) {

        const shouldLog = true

        if (shouldLog) {
          console.log('unsorted: ', searchResults)
        }

        // sort by date
        let resultsSortedByDate = sortBy(searchResults, item => {
          let normalizedDateTime = new moment(item.start_date)
          normalizedDateTime = normalizedDateTime.clone().tz('America/New_York').format()
          return normalizedDateTime
        })

        if (shouldLog) {
          console.log('sorted by date: ', resultsSortedByDate)
        }

        // for any results with the same date and time, sort alphabetically
        const sortEventsWithSameDateAlphabetically = (a, b) => {
          let result = 0
          if (a.start_date === b.start_date) {
            if (a.name > b.name) {
              result = 1
            } else if (a.name < b.name) {
              result = -1
            }
          }
          return result
        }

        results = resultsSortedByDate.slice().sort(sortEventsWithSameDateAlphabetically)

        if (shouldLog) {
          console.log('sorted by date AND alphabetically: ', results)
        }

        count = results.length
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

  render() {
    const defaultSearchParams = {
      dateRange: 'all',
      distance: '200'
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
      >
        <PrimarySearchBar id="events-primary-search-bar" title="Find events" className={styles.searchBar}>
          <TextInput
            id="keyword-search"
            queryParamName="q"
            className={styles.field + ' ' + styles.search}
            label="Search"
            placeholder="Enter keyword"
            validationState={''}
            showSearchIcon={true}
            data-cy="keyword search"
          />
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
            data-cy="zip"
          />
          <MultiSelect
            id="date-filter"
            queryParamName="dateRange"
            label="Date Range"
            autoFocus={false}
            className={styles.field + ' ' + styles.multiSelect}
            name="Event's Page"
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
          <MultiSelect
            id="distance-filter"
            queryParamName="distance"
            label="Distance"
            autoFocus={false}
            className={styles.field + ' ' + styles.multiSelect}
            name="Event's Page"
            multi={false}
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
      </SearchTemplate>
    )
  }
}

export default EventLookupPage
