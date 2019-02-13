import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'

import styles from './event-lookup-page.scss'
import { StyleWrapperDiv, TextInput, MultiSelect } from 'atoms'
import { PrimarySearchBar, Results, PagingLookup } from 'organisms'
import SearchTemplate from '../../templates/search/search'
//import MultiSelectBox from '../../atoms/multiselect/multiselect'

class EventLookupPage extends React.PureComponent {
  customSearch(searchType, searchParams) {
    return fetchSiteContent(searchType, searchParams).then(searchResults => {
      let keyword = searchParams.q

      let results = []
      let count = 0
      let hasNoResults = true
      let isLoading = false
      let isZeroState = false
      let defaultResults = []

      if (searchResults) {
        let keywordMatcher = RegExp(keyword, 'i')
        results = searchResults.filter(eventRecord => {
          return (
            keywordMatcher.test(eventRecord.description.text) || keywordMatcher.test(eventRecord.name.text)
          )
        })
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
    const multiName = 'Events Page'
    const multi = false
    const options = [
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
        label: 'Next 30 days',
        value: '30days'
      }
    ]

    return (
      <SearchTemplate
        searchType="events"
        loadDefaultResults={false}
        scrollToTopAfterSearch={false}
        extraClassName={styles.eventSearch}
        paginate={false}
        customSearch={this.customSearch}
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

          <div className={styles.multiSelect} />
=======
>>>>>>> modified filter values
          <MultiSelect
            id="Event Range Filter"
            queryParamName="dateRange"
            label="Date Range"
            autoFocus={false}
            className={styles.field + ' ' + styles.search}
            name={multiName}
            multi={multi}
            options={options}
            value="All Upcoming"
            placeholder="Select Range..."
          />
<<<<<<< HEAD
          <div />
>>>>>>> added event date multiselect
=======
>>>>>>> modified filter values
        </PrimarySearchBar>
      </SearchTemplate>
    )
  }
}

export default EventLookupPage
