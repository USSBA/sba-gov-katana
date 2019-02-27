import React from 'react'
import { browserHistory } from 'react-router'
import { omit, isEmpty, cloneDeep, merge } from 'lodash'
import { parse, stringify } from 'querystring'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { Paginator } from 'molecules'
import PropTypes from 'prop-types'
import styles from './search.scss'

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
      defaultResults: []
    }
  }

  calculateMaxPageNumber(pageSize = this.state.searchParams.pageSize, count = this.state.count) {
    const maxPageNumber = Math.max(1, Math.ceil(count / pageSize))
    return maxPageNumber
  }

  calculatePageNumber(pageSize = this.state.searchParams.pageSize, start = this.state.searchParams.start) {
    const maxPageNumber = this.calculateMaxPageNumber()
    let pageNumber = Math.floor(start / pageSize) + 1
    //make sure page is in bounds
    pageNumber = Math.min(pageNumber, maxPageNumber)
    pageNumber = Math.max(pageNumber, 1)

    return pageNumber
  }

  calculateStartIndex(pageNumber, pageSize = this.state.searchParams.pageSize, count = this.state.count) {
    const calculatedPageNumber = Math.min(this.calculateMaxPageNumber(pageSize, count), pageNumber)
    let startIndex = (calculatedPageNumber - 1) * pageSize
    //make sure start is not less than 0 or greater than the total number of results
    startIndex = Math.max(0, startIndex)
    return startIndex
  }

  generateQueryMap(urlSearchString = document.location.search) {
    const queryParams = parse(urlSearchString.substring(1))
    // delete any pageSize property so the user can't affect how results are displayed
    delete queryParams.pageSize
    // calculate the actual  start value from the pageNumber parameter
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
    const newSearchParams = merge(this.state.defaultSearchParams, this.props.defaultSearchParams || {}, this.generateQueryMap())
    this.setState({ searchParams: newSearchParams })
    if (this.props.loadDefaultResults === true || urlSearchString.length) {
      this.doSearch(this.props.searchType, newSearchParams)
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   const { items: results, isLoading, defaultResults } = nextProps

  //   const newState = {
  //     defaultResults,
  //     results,
  //     isLoading
  //   }

  //   this.setState(newState)
  // }

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
    for (const paramName in searchParams) {
      if (searchParams.hasOwnProperty(paramName)) {
        let value = searchParams[paramName]
        if (value || value === 0) {
          //item.value to handle objects returned from multiselects
          value = value.value || value
          if (value !== 'All') {
            filteredSearchParams[paramName] = value
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

  doSearch(searchType, searchParams) {
    const _this = this
    let search = () =>
      fetchSiteContent(searchType, filteredSearchParams)
        .then(searchResults => {
          let results = []
          let count = 0
          let hasNoResults
          let isLoading = _this.state.isLoading
          let isZeroState = _this.state.isZeroState
          let defaultResults = []
          if (searchResults) {
            results = searchResults.hit
            count = searchResults.found
            defaultResults = searchResults.suggestedResults ? searchResults.suggestedResults.hit : []
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
        .then(output => {
          _this.setState(output)
        })

    // override search if a custom search exists
    if (this.props.customSearch) {
      search = () =>
        this.props.customSearch(searchType, filteredSearchParams).then(output => {
          _this.setState(output)
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
    const { children, extraClassName, paginate, showStatus, loadingText, noResultsHeading, noResultsBody } = this.props

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
        {!isLoading && !hasNoResults &&(
          <div>
            {this.renderLoadingView()}
            {paginate && this.renderPaginator()}
          </div>
        )}
        {showStatus && <div>
          {isLoading && (
            <div className={styles.resultsStatusMessage}>
              <p className={styles.loading}>{loadingText}</p>
            </div>
          )}
          {!isLoading && hasNoResults && (
            <div id="no-results" className={styles.resultsStatusMessage} data-cy="no-results">
              <h3>{noResultsHeading}</h3>
              <p>{noResultsBody}</p>
              <p><a onClick={ () => {
                this.onReset()
              }}>Clear all search filters</a></p>
            </div>
          )}
        </div>}

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
  noResultsBody: PropTypes.string
}

SearchTemplate.defaultProps = {
  defaultSearchParams: {},
  loadDefaultResults: false,
  scrollToTopAfterSearch: true,
  extraClassName: null,
  paginate: true,
  onHandleEvent: () => {},
  showStatus: true,
  loadingText: "loading...",
  noResultsHeading: "Sorry, we couldn't find anything matching that query.",
  noResultsBody: "Try using a different search term."
}

export default SearchTemplate
