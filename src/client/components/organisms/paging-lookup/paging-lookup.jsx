import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import styles from './paging-lookup.scss'
import * as ContentActions from '../../../actions/content.js'
import { DocumentArticleLookup } from 'organisms'
import { logEvent } from '../../../services/analytics.js'
import { getQueryParams } from '../../../services/utils.js'

const config = {
  pageSize: 30
}

const fieldNameMap = {
  searchTerm: 'Search',
  documentType: 'Type',
  program: 'Program',
  documentActivity: 'Activity',
  sortBy: 'sortBy'
}

class PagingLookup extends React.Component {
  constructor(ownProps) {
    super()
    this.state = this.createOriginalState(ownProps)
  }

  createOriginalState(ownProps) {
    return {
      query: this.createQueryFromProps(ownProps),
      taxonomies: [],
      pageNumber: 1,
      isFetching: false
    }
  }

  createQueryFromProps(ownProps) {
    const propsSource = ownProps
    const defaults = _.chain(propsSource.taxonomyFilters)
      .keyBy()
      .mapValues(_ => {
        return 'All'
      })
      .value()

    const queryParams = getQueryParams()
    // look for aliases in the query params, but filter out any that are undefined
    const aliasMapping = _.pickBy({
      searchTerm: queryParams.search || queryParams.q,
      documentType: queryParams.type,
      documentActivity: queryParams.activity,
      page: Number(queryParams.page) || 1
    })

    const filteredQueryParams = _.pickBy(queryParams, (value, key) => {
      return _.includes(propsSource.taxonomyFilters, key)
    })

    const finalQuery = _.assign(
      {
        sortBy: queryParams.sortBy || ownProps.defaultSortBy,
        searchTerm: ''
      },
      defaults,
      filteredQueryParams,
      aliasMapping
    )
    return finalQuery
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomyVocabulary', {
      names: this.props.taxonomyFilters.join(',')
    })
  }

  componentWillReceiveProps(nextProps, ownProps) {
    const updatedProps = {}

    // set the taxomonies object when
    // nextProps.items array is populated, AND state.taxonomies array is NOT populated

    if (nextProps.taxonomies && nextProps.taxonomies.length > 0 && this.state.taxonomies.length === 0) {
      const taxonomies = nextProps.taxonomies.slice()

      // add an "All" filter option to dynamic taxonomies
      for (let index = 0; index < taxonomies.length; index++) {
        taxonomies[index].terms.unshift('All')
      }

      const rearrangedTaxonomyOrder = _.map(this.props.taxonomyFilters, taxonomyVocabularyName => {
        return _.find(taxonomies, { name: taxonomyVocabularyName })
      })

      // add a "Sort By" taxonomy object to append a "Sort By" multiselect component
      rearrangedTaxonomyOrder.push({
        name: 'Sort By',
        terms: this.props.sortByOptions
      })

      updatedProps.taxonomies = rearrangedTaxonomyOrder
    }

    if (nextProps.itemReponse) {
      updatedProps.isFetching = false
    }

    this.setState(updatedProps)
  }

  handleReset(ownProps) {
    this.fireDocumentationLookupEvent('clearFilters')
    this.setState(
      _.assign(this.createOriginalState(this.props), {
        query: {
          searchTerm: "",
          documentActivity: "All",
          documentType: "All",
          program: "All",
          sortBy: this.props.defaultSortBy
        },
        taxonomies: this.state.taxonomies,
        pageNumber: 1,
        isFetching: false
      }),
      () => {
        this.handleSubmit()
      }
    )
  }

  componentDidMount() {
    this.submit()
  }

  handleSubmit() {
    const queryObject = this.state.query

    this.fireDocumentationLookupEvent(`Apply CTA: Term: ${queryObject.searchTerm}`)
    this.setState(
      {
        items: undefined,
        pageNumber: 1
      },
      () => {
        this.submit()
      }
    )
    this.handlePageChange(1)
  }

  convertAndSetQueryObjectToString(queryObject) {
    const queryString = this.convertQueryObjectToString(queryObject)
    this.setQueryStringToUrl(queryString)
  }

  convertQueryObjectToString(queryObject) {
    let queryString = ''

    for (const key in queryObject) {
      if (key === 'searchTerm') {
        queryString += `search=${queryObject[key]}&`
      } else {
        queryString += `${key}=${queryObject[key]}&`
      }
    }
    return queryString
  }

  setQueryStringToUrl(queryString) {
    const type = this.props.type

    browserHistory.push({
      pathname: `/${type.slice(0, -1)}`,
      search: `?${queryString.slice(0, -1)}`
    })
  }

  submit() {
    this.setState(
      {
        isFetching: true
      },
      () => {
        const start = (this.state.query.page - 1) * config.pageSize
        const end = start + config.pageSize

        const remappedState = _.mapValues(this.state.query, value => {
          return value === 'All' ? 'all' : value
        })
        const queryTerms = _.assign({}, remappedState, { start, end })

        this.props.actions.fetchContentIfNeeded(this.props.type, this.props.type, queryTerms)
      }
    )
  }

  fireEvent(category, action, value) {
    logEvent({
      category: category,
      action: action,
      label: window.location.pathname,
      value: value
    })
  }

  fireDocumentationLookupEvent(action, value = null) {
    this.fireEvent('documentation-lookup', action, value)
  }

  handleQueryChange(field, value) {
    if (field !== 'searchTerm') {
      // Log Analytic Event, but not for search term
      this.fireDocumentationLookupEvent(`${fieldNameMap[field] || field}: ${value}`)
    }
    const newQueryFieldValue = {}
    newQueryFieldValue[field] = value
    const currentQuery = this.state.query
    const newQuery = _.assign({}, currentQuery, newQueryFieldValue)
    this.setState({ query: newQuery })
  }

  updatePageNumberinQueryObject(newPageNumber) {
    const queryObject = this.state.query
    const queryObjectWithUpdatedPageNumber = Object.assign(queryObject, {
      page: newPageNumber
    })
    this.convertAndSetQueryObjectToString(queryObjectWithUpdatedPageNumber)
  }

  handlePageChange(newPageNumber) {
    this.updatePageNumberinQueryObject(newPageNumber)
    return this.submit()
  }

  render() {
    const lookupProps = {
      title: this.props.title,
      queryState: this.state.query,
      items: this.props.itemReponse.items,
      itemCount: this.props.itemReponse.count,
      pageNumber: this.state.query.page,
      pageSize: config.pageSize,
      taxonomies: this.state.taxonomies,
      onSubmit: this.handleSubmit.bind(this),
      onReset: this.handleReset.bind(this),
      onQueryChange: this.handleQueryChange.bind(this),
      onPageChange: this.handlePageChange.bind(this),
      isFetching: this.state.isFetching,
      fieldsToShowInDetails: this.props.fieldsToShowInDetails,
      type: this.props.type
    }
    return <DocumentArticleLookup {...lookupProps} />
  }
}

PagingLookup.propTypes = {
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  taxonomyFilters: React.PropTypes.array,
  fieldsToShowInDetails: React.PropTypes.array,
  sortByOptions: React.PropTypes.array
}

PagingLookup.defaultProps = {
  title: '',
  type: '',
  taxonomyFilters: [],
  fieldsToShowInDetails: [],
  sortByOptions: [],
  itemReponse: {
    items: undefined,
    count: 0
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  const { taxonomies } = reduxState.contentReducer
  return {
    itemReponse: reduxState.contentReducer[ownProps.type],
    taxonomies: taxonomies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(PagingLookup)

export { PagingLookup }
