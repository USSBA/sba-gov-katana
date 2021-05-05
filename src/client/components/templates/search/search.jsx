/* eslint-disable class-methods-use-this */
/* eslint-disable complexity */
import PropTypes from 'prop-types'
import React from 'react'
import geo2zip from 'geo2zip'
import { browserHistory } from 'react-router'
import { omit, isEmpty, cloneDeep, merge } from 'lodash'
import { parse, stringify } from 'querystring'

import styles from './search.scss'
import { fetchSiteContent, fetchApiDistrictOfficeName } from '../../../fetch-content-helper'
import { Paginator } from 'molecules'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

/* NOTE: THIS IS SUPPOSED TO BE A GENERIC SEARCH TEMPLATE. PLEASE DO NOT PUT PAGE SPECIFIC LOGIC IN HERE. */

class SearchTemplate extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      searchParams: {
        pageSize: 5,
        start: 0
      },
      defaultSearchParams: {
        pageSize: 5,
        start: 0
      },
      submittedSearchParams: {},
      results: [],
      hasNoResults: false,
      isLoading: false,
      isZeroState: true,
      defaultResults: [],
      districtOffice: ''
    }
  }

  insertDistrictOffice(searchResults, districtOfficeDetails) {
    searchResults.results.forEach((obj, index) => {
      //Remove any other district offices found
      if (obj.fields.office_type[0] === 'SBA District Office') {
        searchResults.results.splice(index, 1)
      }
    })

    //Add district office to the top of the list
    if (searchResults.results) {
      searchResults.results.unshift(districtOfficeDetails)
    }
    return searchResults
  }

  calculateMaxPageNumber(pageSize = this.state.searchParams.pageSize, count = this.state.count) {
    const maxPageNumber = Math.max(1, Math.ceil(count / pageSize))
    return maxPageNumber
  }

  calculatePageNumber(pageSize = this.state.searchParams.pageSize, start = this.state.searchParams.start) {
    const maxPageNumber = this.calculateMaxPageNumber()
    let pageNumber = Math.floor(start / pageSize) + 1
    // make sure page is in bounds
    pageNumber = Math.min(pageNumber, maxPageNumber)
    pageNumber = Math.max(pageNumber, 1)

    return pageNumber
  }

  calculateStartIndex(pageNumber, pageSize = this.state.searchParams.pageSize, count = this.state.count) {
    const calculatedPageNumber = Math.min(this.calculateMaxPageNumber(pageSize, count), pageNumber)
    let startIndex = (calculatedPageNumber - 1) * pageSize
    // make sure start is not less than 0 or greater than the total number of results
    startIndex = Math.max(0, startIndex)
    return startIndex
  }

  generateQueryMap(urlSearchString = document.location.search) {
    const queryParams = parse(urlSearchString.substring(1))
    // delete any pageSize property so the user can't affect how results are displayed
    delete queryParams.pageSize
    // calculate the actual start value from the pageNumber parameter
    let { pageNumber } = queryParams
    const {
      searchParams: { pageSize }
    } = this.state
    pageNumber = isNaN(parseInt(pageNumber, 10)) ? 1 : parseInt(pageNumber, 10)
    // not using the calculate startIndex function here because we won't know the count yet
    queryParams.start = Math.max(0, (pageNumber - 1) * pageSize)
    return queryParams
  }

  componentWillMount() {
    const urlSearchString = document.location.search
    const newSearchParams = merge(
      this.state.defaultSearchParams,
      this.props.defaultSearchParams || {},
      this.generateQueryMap()
    )

    this.setState({ searchParams: newSearchParams })
    if (this.props.loadDefaultResults === true || urlSearchString.length) {
      this.doSearch(this.props.searchType, newSearchParams)
    }
  }

  onChange(propName, value, options = {}, callback) {
    const { scrollToTopAfterSearch } = this.props
    const _options = merge(
      {
        shouldTriggerSearch: false,
        shouldResetPageNumber: false
      },
      options
    )

    this.setState(
      prevState => {
        const searchParamsClone = cloneDeep(prevState.searchParams)
        searchParamsClone[propName] = value
        return { searchParams: searchParamsClone }
      },
      () => {
        if (_options.shouldTriggerSearch === true) {
          this.onSearch(options)
        }
        if (!isEmpty(window) && scrollToTopAfterSearch) {
          window.scrollTo(0, 0)
        }
        if (callback) {
          /* eslint-disable-next-line callback-return */
          callback()
        }
      }
    )
  }

  filterSearchParamsForUrl(searchParams) {
    const paramsToIgnore = ['pageSize', 'start']
    const { start, pageSize } = searchParams
    const filteredSearchParams = omit(searchParams, paramsToIgnore)
    filteredSearchParams.pageNumber = Math.max(1, Math.floor(start / pageSize) + 1)

    return filteredSearchParams
  }

  filterSearchParams(searchParams) {
    const filteredSearchParams = {}
    const paramsWithZip = searchParams
    if (!paramsWithZip.address && paramsWithZip.mapCenter) {
      this.geoToZip(paramsWithZip.mapCenter).then(zip => {
        paramsWithZip.address = zip
        delete paramsWithZip.mapCenter
      })
    }
    for (const paramName in paramsWithZip) {
      if (searchParams.hasOwnProperty(paramName)) {
        let value = searchParams[paramName]
        if (value || value === 0) {
          //item.value to handle objects returned from multiselects
          value = value.value || value
          if (value !== 'All' && value !== 'All Visible') {
            filteredSearchParams[paramName] = value
          }
          if (value === 'All Visible') {
            filteredSearchParams.type = this.props.allVisibleOffices.join(',')
          }
        }
      }
    }
    return filteredSearchParams
  }

  onSearch(options = {}, searchParams = this.state.searchParams) {
    const _options = merge(
      {
        shouldResetPageNumber: true
      },
      options
    )

    const { searchType } = this.props

    const data = {}
    if (_options.shouldResetPageNumber === true) {
      searchParams.start = 0 //eslint-disable-line no-param-reassign
      data.searchParams = searchParams
    }
    this.setState(data, () => {
      this.doSearch(searchType, searchParams)
    })
  }

  noResult = {
    results: [],
    count: 0,
    isLoading: false,
    isZeroState: false,
    defaultResults: []
  }

  async geoToZip(mapCenter) {
    const [lat, long] = mapCenter.split(/,/)
    const zip = await geo2zip({
      latitude: lat,
      longitude: long
    })
    return zip[0]
  }

  getDistrictOffice(searchType, result, zip) {
    fetchApiDistrictOfficeName(zip, () => {
      this.setState(this.noResult)
      this.props.updateNoResultsType && this.props.updateNoResultsType('invalidZipcode')
    }).then(districtOffice => {
      const filteredDistOfficeSearchParams = {
        address: zip,
        officeId: districtOffice.nodeId,
        pageNumber: '1',
        pageSize: 1,
        start: 0
      }

      fetchSiteContent(searchType, filteredDistOfficeSearchParams).then(distOfficeSearchResults => {
        let distOfficeResults = []
        if (distOfficeSearchResults) {
          distOfficeResults = distOfficeSearchResults.hit
        }
        const formatResult = distOfficeResults[0]
          ? this.insertDistrictOffice(result, distOfficeResults[0])
          : result

        const distanceInMiles = 500
        // remove results farther than `distanceInMiles` from specified location
        formatResult.results = formatResult.results.filter(office => {
          // if the API doesn't return distance, return those offices anyway
          if (!office.exprs) {
            return true
          } else {
            // if the API returns distance, filter out office that are too far away
            return office.exprs.distance < distanceInMiles
          }
        })

        this.setState(formatResult, () => {
          // fix pagination when results more than `distanceInMiles` get removed
          const { results, searchParams } = this.state
          if (results.length < searchParams.pageSize) {
            const newCount = (this.calculatePageNumber() - 1) * searchParams.pageSize + results.length
            this.setState({ count: newCount })
          }
          if (!this.props.updateNoResultsType) {
            return
          }
          if (results.length === 1) {
            this.props.updateNoResultsType('noOfficeResults')
          }
        })
      })
    })
  }

  doSearch(searchType, searchParams) {
    let search = () =>
      fetchSiteContent(searchType, filteredSearchParams)
        .then(searchResults => {
          let results = []
          let count = 0
          let hasNoResults
          let isLoading = this.state.isLoading
          let isZeroState = this.state.isZeroState
          let defaultResults = []
          if (searchResults) {
            results = searchResults.hit
            count = searchResults.found
            defaultResults = searchResults.suggestedResults ? searchResults.suggestedResults.hit : []
            hasNoResults = count === 0
            isLoading = false
            isZeroState = false
          } else {
            isZeroState = false
            isLoading = false
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
        .then(output => {
          if (searchType === 'offices' && output.count > 0) {
            if (searchParams.address || searchParams.mapCenter) {
              // If its a district office lookup, Look for the assigned district office at place it at the top of the search.
              if (searchParams.mapCenter && !searchParams.address) {
                this.geoToZip(searchParams.mapCenter).then(zip => {
                  this.getDistrictOffice(searchType, output, zip)
                })
              } else {
                this.getDistrictOffice(searchType, output, searchParams.address)
              }
            }
          } else {
            this.setState(output)
          }
        })

    // override search if a custom search exists
    if (this.props.customSearch) {
      search = () =>
        this.props.customSearch(searchType, filteredSearchParams).then(output => {
          this.setState(output)
        })
    }

    //push search to history
    const filteredSearchParams = this.filterSearchParams(searchParams)
    const urlParams = this.filterSearchParamsForUrl(filteredSearchParams)
    browserHistory.push({
      pathname: document.location.pathname,
      search: `?${stringify(urlParams)}`
    })
    this.setState(
      {
        isLoading: true,
        submittedSearchParams: filteredSearchParams
      },
      search
    )
  }

  renderPaginator() {
    const {
      results,
      count,
      searchParams: { pageSize }
    } = this.state
    const pageNumber = this.calculatePageNumber()

    let result = <div />
    //only render paginator if there are results
    if (!isEmpty(results)) {
      result = (
        <div className={styles.paginator}>
          <Paginator
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={count}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      )
    }
    return result
  }

  renderLoadingView() {
    const { isLoading } = this.state
    let result = <div />
    //only render if there is loading
    if (isLoading) {
      result = (
        <div className="loading-view">
          <div className={styles.container} />
        </div>
      )
    }
    return result
  }

  handleBack() {
    const pageNumber = this.calculatePageNumber()
    const start = this.calculateStartIndex(pageNumber - 1)

    // uses onchange to update search param and perform new search
    this.onChange(
      'start',
      start,
      {
        shouldTriggerSearch: true,
        shouldResetPageNumber: false
      },
      this.props.onHandleEvent
    )
  }

  handleForward() {
    const pageNumber = this.calculatePageNumber()
    const start = this.calculateStartIndex(pageNumber + 1)

    // uses onchange to update search param and perform new search
    this.onChange(
      'start',
      start,
      {
        shouldTriggerSearch: true,
        shouldResetPageNumber: false
      },
      this.props.onHandleEvent
    )
  }

  handleSearch() {
    this.props.onHandleEvent()
    this.onSearch()
  }

  onReset() {
    const searchParams = merge(this.state.defaultSearchParams, this.props.defaultSearchParams)
    this.onSearch({}, searchParams)
  }

  render() {
    const {
      results,
      searchParams: { pageSize },
      isZeroState,
      count,
      defaultResults,
      hasNoResults,
      isLoading
    } = this.state
    const {
      children,
      extraClassName,
      paginate,
      showStatus,
      loadingText,
      noResultsHeading,
      noResultsBody
    } = this.props

    const childrenWithProps = React.Children.map(children, child => {
      if (child.props.hideOnZeroState && isZeroState) {
        return null
      }
      return React.cloneElement(child, {
        items: results,
        onSearch: this.handleSearch.bind(this),
        onFieldChange: this.onChange.bind(this),
        fieldValues: this.state.searchParams,
        submittedFieldValues: this.state.submittedSearchParams,
        isLoading: this.state.isLoading,
        onForward: this.handleForward.bind(this),
        onBack: this.handleBack.bind(this),
        pageNumber: this.calculatePageNumber(),
        pageSize,
        total: count,
        defaultResults: defaultResults
      })
    })

    const divProps = {}
    if (extraClassName) {
      divProps.className = extraClassName
    }

    return (
      <div {...divProps}>
        <div>{childrenWithProps}</div>
        {!isLoading && !hasNoResults && (
          <div>
            {this.renderLoadingView()}
            {paginate && this.renderPaginator()}
          </div>
        )}
        {showStatus && (
          <div>
            {isLoading && (
              <div className={styles.resultsStatusMessage}>
                <p className={styles.loading}>{loadingText}</p>
              </div>
            )}
            {!isLoading && hasNoResults && (
              <div id="no-results" className={styles.resultsStatusMessage} data-cy="no-results">
                <h3>{noResultsHeading}</h3>
                <p>{noResultsBody}</p>
                <p>
                  <a
                    onClick={() => {
                      this.onReset()
                    }}
                  >
                    Clear all filters
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

SearchTemplate.propTypes = {
  paginate: PropTypes.bool,
  searchType: PropTypes.string.isRequired,
  searchTitle: PropTypes.string,
  scrollToTopAfterSearch: PropTypes.bool,
  customSearch: PropTypes.func,
  showStatus: PropTypes.bool,
  loadingText: PropTypes.string,
  noResultsHeading: PropTypes.string,
  noResultsBody: PropTypes.string,

  // callback called during each event handler
  onHandleEvent: PropTypes.func
}

SearchTemplate.defaultProps = {
  defaultSearchParams: {},
  loadDefaultResults: false,
  scrollToTopAfterSearch: true,
  extraClassName: null,
  paginate: true,
  onHandleEvent: () => {},
  showStatus: true,
  loadingText: 'Loading...',
  noResultsHeading: "Sorry, we didn't find any results that matched your search.",
  noResultsBody: 'Try changing your search terms, adjusting your zip code, or tweaking your filters.'
}

export default SearchTemplate
