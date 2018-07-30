import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  assign,
  filter,
  camelCase,
  chain,
  includes,
  pickBy,
  startCase,
  isEmpty,
  cloneDeep,
  merge
} from 'lodash'
import { bindActionCreators } from 'redux'

import { MultiSelect, TextInput, SearchIcon } from 'atoms'
import { Paginator } from 'molecules'
import { PrimarySearchBar, CoursesLayout } from 'organisms'
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

export class SearchTemplate extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      searchParams: {},
      submittedSearchParams: {},
      results: [],
      pageNumber: 1,
      hasNoResults: false
    }
  }

  componentWillMount() {
    const { defaultSearchParams } = this.props
    let clonedDefaultSearchParams

    if (defaultSearchParams) {
      clonedDefaultSearchParams = { ...defaultSearchParams }
      if (
        clonedDefaultSearchParams.hasOwnProperty('type') &&
        clonedDefaultSearchParams.type.toLowerCase() === 'all'
      ) {
        delete clonedDefaultSearchParams.type
      }
    }

    if (clonedDefaultSearchParams) {
      this.setState({ searchParams: clonedDefaultSearchParams })
    }

    if (this.props.loadDefaultResults === true) {
      this.doSearch(this.props.searchType, clonedDefaultSearchParams)
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

  onChange(propName, value, options = {}) {
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
      }
    )
  }

  generateQueryString(filteredParams) {
    const queryTermArray = []
    for (const paramName in filteredParams) {
      if (filteredParams.hasOwnProperty(paramName)) {
        const value = filteredParams[paramName]
        queryTermArray.push(`${paramName}=${value}`)
      }
    }
    let search = ''
    if (queryTermArray.length) {
      search += `?${queryTermArray.join('&')}`
    }
    // todo:
    //   browserHistory.push({
    //     pathname: `/course/`,
    //     search: `?topic=${query.businessStage}`
    //   })

    return search
  }

  filterSearchParams(searchParams) {
    const filteredSearchParams = {}
    for (const paramName in searchParams) {
      if (searchParams.hasOwnProperty(paramName)) {
        let value = searchParams[paramName]
        if (value) {
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
      data.pageNumber = 1
      data.searchParams = searchParams
    }
    const filteredSearchParams = this.filterSearchParams(searchParams)
    //todo: doesn't do anything yet but could post query string to history
    const query = this.generateQueryString(filteredSearchParams)
    this.setState(data, () => {
      this.doSearch(searchType, filteredSearchParams)
    })
  }

  doSearch(searchType, searchParams) {
    this.setState({ isLoading: true })
    this.setState({ submittedSearchParams: this.state.searchParams })
    this.props.actions.fetchContentIfNeeded(searchType, searchType, searchParams)
  }

  renderPaginator() {
    const { count, defaultSearchParams: { pageSize } } = this.props
    const { results, pageNumber } = this.state

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
    const { defaultSearchParams: { pageSize } } = this.props
    const { pageNumber } = this.state
    const newPageNumber = Math.max(1, pageNumber - 1)
    this.setState({ pageNumber: newPageNumber }, () => {
      this.onChange('start', (newPageNumber - 1) * pageSize, {
        shouldTriggerSearch: true,
        shouldResetPageNumber: false
      })
    })
  }

  handleForward() {
    const { count, defaultSearchParams: { pageSize } } = this.props
    const { pageNumber } = this.state
    const newPageNumber = Math.min(Math.max(1, Math.ceil(count / pageSize)), pageNumber + 1)
    this.setState({ pageNumber: newPageNumber }, () => {
      this.onChange('start', (newPageNumber - 1) * pageSize, {
        shouldTriggerSearch: true,
        shouldResetPageNumber: false
      })
    })
  }

  render() {
    const { results } = this.state
    const {
      children,
      items,
      hasNoResults,
      loadDefaultResults,
      count,
      extraClassName,
      defaultSearchParams: { pageSize },
      paginate
    } = this.props

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
        pageNumber: this.state.pageNumber,
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
  scrollToTopAfterSearch: PropTypes.bool
}

SearchTemplate.defaultProps = {
  defaultSearchParams: { pageSize: 5 },
  items: [],
  paginate: true,
  isLoading: false,
  scrollToTopAfterSearch: true
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
export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchTemplate)
