import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'

import styles from './event-lookup-page.scss'
import { StyleWrapperDiv, TextInput } from 'atoms'
import { PrimarySearchBar, Results } from 'organisms'
import SearchTemplate from '../../templates/search/search'

class EventLookupPage extends React.PureComponent {
  async customSearch(searchType, searchParams) {
    return await fetchSiteContent(searchType).then(searchResults => {
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
        </PrimarySearchBar>
      </SearchTemplate>
    )
  }
}

export default EventLookupPage