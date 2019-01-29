import React from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { find, isEmpty } from 'lodash'

import styles from './event-lookup-page.scss'
import { TaxonomyMultiSelect, StyleWrapperDiv, TextInput } from 'atoms'
import { PrimarySearchBar } from 'organisms'
import SearchTemplate from '../../templates/search/search.jsx'

class EventLookupPage extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      taxonomies: null
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

  render() {
    const pageSize = 5
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
        searchType="events"
        defaultSearchParams={defaultSearchParams}
        loadDefaultResults={false}
        scrollToTopAfterSearch={false}
        extraClassName={styles.officeSearch}
        paginate={false}
      >
        <PrimarySearchBar
          id="office-primary-search-bar"
          title="Find events"
          className={styles.searchBar}
        >
          <TextInput
            id="search"
            queryParamName="q"
            className={styles.field + ' ' + styles.search}
            label="Find"
            placeholder="Search by keyword"
            validationState={''}
            showSearchIcon={true}
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

          <TaxonomyMultiSelect
            taxonomy={officeTypeTaxonomy}
            label="Distance"
            queryParamName="type"
            multi={false}
            className={styles.field + ' ' + styles.search}
          />
        </PrimarySearchBar>
        <StyleWrapperDiv className={styles.officeResults} hideOnZeroState={true} />
      </SearchTemplate>
    )
  }
}

export default EventLookupPage
