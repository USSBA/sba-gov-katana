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

import { ApplyButton, MultiSelect, TextInput, SearchIcon } from 'atoms'
import { Paginator } from 'molecules'
import { PrimarySearchBar, CoursesLayout } from 'organisms'
import * as ContentActions from '../../../actions/content.js'
import { logPageEvent } from '../../../services/analytics.js'
import { logEvent } from '../../../services/analytics.js'
import PropTypes from 'prop-types'
import styles from './search.scss'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

export class SearchTemplate extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      searchParams: {},
      results: [],
      pageNumber: 1
    }
  }

  componentWillMount() {
    if (this.props.defaultSearchParams) {
      this.setState({ searchParams: this.props.defaultSearchParams })
    }

    if (this.props.loadDefaultResults === true) {
      this.doSearch(this.props.searchType, this.props.defaultSearchParams)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items: results } = nextProps
    const newState = {
      results
    }

    this.setState(newState)
  }

  onChange(propName, value, options = {}) {
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
        if (!isEmpty(window)) {
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
    const filteredSearchParams = this.filterSearchParams(searchParams)
    //todo: doesn't do anything yet but could post query string to history
    const query = this.generateQueryString(filteredSearchParams)

    const data = {}
    if (_options.shouldResetPageNumber === true) {
      searchParams.start = 0 //eslint-disable-line no-param-reassign
      data.pageNumber = 1
      data.searchParams = searchParams
    }

    this.setState(data, () => {
      this.doSearch(searchType, filteredSearchParams)
    })
  }

  doSearch(searchType, searchParams) {
    this.props.actions.fetchContentIfNeeded(searchType, searchType, searchParams)
  }

  renderPaginator() {
    const { count, defaultSearchParams: { pageSize } } = this.props
    const { results, pageNumber } = this.state

    let result = <div />

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
    const { children, items } = this.props
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        items: items,
        onSearch: this.onSearch.bind(this),
        onFieldChange: this.onChange.bind(this),
        fieldValues: this.state.searchParams
      })
    })

    return (
      <div>
        <div>{childrenWithProps}</div>
        {this.renderPaginator()}
      </div>
    )
  }
}

SearchTemplate.propTypes = {
  searchType: PropTypes.string.isRequired,
  searchTitle: PropTypes.string,
  items: PropTypes.array,
  location: PropTypes.string
}

SearchTemplate.defaultProps = {
  items: []
}

function mapReduxStateToProps(reduxState, props) {
  const hits = reduxState.contentReducer[props.searchType]

  return {
    items: !isEmpty(hits) ? hits.hit : [],
    location: props.location,
    count: !isEmpty(hits) ? hits.found : 0
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchTemplate)
