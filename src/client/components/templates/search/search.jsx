import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { omit, isEmpty, cloneDeep, merge } from 'lodash'
import { parse, stringify } from 'querystring'
import { bindActionCreators } from 'redux'

import { Paginator } from 'molecules'
import * as ContentActions from '../../../actions/content.js'
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
      submittedSearchParams: {},
      results: [],
      hasNoResults: false
    }
  }

  calculateMaxPageNumber(pageSize = this.state.searchParams.pageSize, count = this.props.count) {
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

  calculateStartIndex(pageNumber, pageSize = this.state.searchParams.pageSize, count = this.props.count) {
    const calculatedPageNumber = Math.min(this.calculateMaxPageNumber(pageSize, count), pageNumber)
    let startIndex = (calculatedPageNumber - 1) * pageSize
    //make sure start is not less than 0 or greater than the total number of results
    startIndex = Math.max(0, startIndex)
    return startIndex
  }

  generateQueryMap(urlSearchString = document.location.search) {
    const queryParams = parse(urlSearchString.substring(1))
    //delete any pageSize property so the user can't affect how results are displayed
    delete queryParams.pageSize
    //calculate the actual  start value from the pageNumber parameter
    let { pageNumber } = queryParams
    const {
      searchParams: { pageSize }
    } = this.state
    pageNumber = isNaN(parseInt(pageNumber, 10)) ? 1 : parseInt(pageNumber, 10)
    //not using the calculate startIndex function here because we won't know the count yet
    queryParams.start = Math.max(0, (pageNumber - 1) * pageSize)
    return queryParams
  }

  componentWillMount() {
    const { defaultSearchParams } = this.props
    const { searchParams } = this.state

    const newSearchParams = merge(searchParams, defaultSearchParams || {}, this.generateQueryMap())
    this.setState({ searchParams: newSearchParams })
    if (this.props.loadDefaultResults === true) {
      this.doSearch(this.props.searchType, newSearchParams)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items: results, isLoading } = nextProps

    const newState = {
      results,
      isLoading
    }

    this.setState(newState)
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
    //push search to history
    const filteredSearchParams = this.filterSearchParams(searchParams)
    const urlParams = this.filterSearchParamsForUrl(filteredSearchParams)
    browserHistory.push({
      pathname: document.location.pathname,
      search: `?${stringify(urlParams)}`
    })

    this.setState({ isLoading: true })
    this.setState({ submittedSearchParams: filteredSearchParams })
    this.props.onHandleEvent()
    this.props.actions.fetchContentIfNeeded(searchType, searchType, filteredSearchParams)
  }

  renderPaginator() {
    const { count } = this.props
    const {
      results,
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
          <div className={styles.container}>
            <p>loading...</p>
          </div>
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
      this.props.onHandleEvent()
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
      this.props.onHandleEvent()
    )
  }

  render() {
    const {
      results,
      searchParams: { pageSize }
    } = this.state
    const { children, count, extraClassName, paginate } = this.props

    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        items: results,
        onSearch: this.onSearch.bind(this),
        onFieldChange: this.onChange.bind(this),
        fieldValues: this.state.searchParams,
        submittedFieldValues: this.state.submittedSearchParams,
        isLoading: this.state.isLoading,
        onForward: this.handleForward.bind(this),
        onBack: this.handleBack.bind(this),
        pageNumber: this.calculatePageNumber(),
        pageSize,
        total: count
      })
    })

    const divProps = {}
    if (extraClassName) {
      divProps.className = extraClassName
    }

    return (
      <div {...divProps}>
        <div>{childrenWithProps}</div>
        {this.renderLoadingView()}
        {paginate && this.renderPaginator()}
      </div>
    )
  }
}

SearchTemplate.propTypes = {
  paginate: PropTypes.bool,
  searchType: PropTypes.string.isRequired,
  searchTitle: PropTypes.string,
  items: PropTypes.array,
  location: PropTypes.string,
  isLoading: PropTypes.bool,
  scrollToTopAfterSearch: PropTypes.bool,
  onPaginate: PropTypes.func
}

SearchTemplate.defaultProps = {
  defaultSearchParams: {},
  items: [],
  paginate: true,
  isLoading: false,
  scrollToTopAfterSearch: true,
  onPaginate: () => {}
}

function mapReduxStateToProps(reduxState, props) {
  let items = []
  let count = 0
  let hasNoResults
  let isLoading = true

  if (reduxState.contentReducer[props.searchType]) {
    items = reduxState.contentReducer[props.searchType].hit
    count = reduxState.contentReducer[props.searchType].found
    hasNoResults = count === 0
    isLoading = false
  }

  return {
    items,
    location: props.location,
    count,
    hasNoResults,
    isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(SearchTemplate)
export { SearchTemplate }
