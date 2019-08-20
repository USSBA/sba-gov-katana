import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { assign, chain, find, includes, map, mapValues, pickBy } from 'lodash'
import { DocumentArticleLookup } from 'organisms'
import styles from './paging-lookup.scss'
import { getQueryParams } from '../../../services/utils.js'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { logEvent } from '../../../services/analytics.js'

const config = {
  pageSize: 30
}

const fieldNameMap = {
  searchTerm: 'Search',
  documentType: 'Type',
  program: 'Program',
  documentActivity: 'Activity',
  office: 'Office',
  sortBy: 'sortBy'
}

class PagingLookup extends React.Component {
  constructor(ownProps) {
    super()
    this.state = this.createOriginalState(ownProps)
  }

  createOriginalState(ownProps) {
    return {
      query: this.createQueryParams(ownProps),
      taxonomies: [],
      pageNumber: 1,
      isFetching: false,
      itemResponse: {
        items: null,
        count: 0
      }
    }
  }

  createQueryParams(ownProps) {
    const query = this.createQueryFromProps(ownProps)
    query.office = query.office || 'All'
    return query
  }

  createQueryFromProps(ownProps) {
    const propsSource = ownProps
    const defaults = chain(propsSource.taxonomyFilters)
      .keyBy()
      .mapValues(_ => {
        return 'All'
      })
      .value()

    const queryParams = getQueryParams()
    // look for aliases in the query params, but filter out any that are undefined
    const aliasMapping = pickBy({
      searchTerm: queryParams.search || queryParams.q,
      documentType: queryParams.type,
      documentActivity: queryParams.activity,
      office: queryParams.office,
      page: Number(queryParams.page) || 1
    })

    const filteredQueryParams = pickBy(queryParams, (value, key) => {
      return includes(propsSource.taxonomyFilters, key)
    })

    const finalQuery = assign(
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

  handleReset(ownProps) {
    this.fireDocumentationLookupEvent('clearFilters')
    this.setState(
      assign(this.createOriginalState(this.props), {
        query: {
          searchTerm: '',
          documentActivity: 'All',
          documentType: 'All',
          program: 'All',
          office: 'All',
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

  async componentDidMount() {
    const queryArgs = {
      names: this.props.taxonomyFilters.join(',')
    }

    const taxonomies = await fetchSiteContent('taxonomys', queryArgs)

    this.setState({
      taxonomies: this.reArrangeTaxonomyOrder(taxonomies)
    })
  }

  componentWillReceiveProps({ sbaOffices }) {
    this.setState(
      {
        sbaOfficeFilters: this.createSbaOfficeFilterList(sbaOffices)
      },
      () => this.submit()
    )
  }

  reArrangeTaxonomyOrder(data) {
    const taxonomies = data.slice()

    // add an "All" filter option to dynamic taxonomies
    for (let index = 0; index < taxonomies.length; index++) {
      taxonomies[index].terms.unshift('All')
    }

    const rearrangedTaxonomyOrder = map(this.props.taxonomyFilters, taxonomyVocabularyName => {
      return find(taxonomies, { name: taxonomyVocabularyName })
    })

    // add a "Sort By" taxonomy object to append a "Sort By" multiselect component
    rearrangedTaxonomyOrder.push({
      name: 'Sort By',
      terms: this.props.sortByOptions
    })
    return rearrangedTaxonomyOrder
  }

  createSbaOfficeFilterList(sbaOffices) {
    if (Array.isArray(sbaOffices) === true && sbaOffices.length > 0) {
      const filteredOffices = [
        {
          label: 'All',
          value: 'All'
        }
      ]
      sbaOffices.forEach(office => {
        const filterFormattedOffice = {}
        filterFormattedOffice.label = office.title
        filterFormattedOffice.value = office.id
        filteredOffices.push(filterFormattedOffice)
      })
      return filteredOffices.sort(function(a, b) {
        // Sort alphabetically and push "All" to the top of the list of options
        if (a.label < b.label || a.label === 'All') {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })
    }

    return null
  }

  handleSubmit() {
    const queryObject = this.state.query

    this.fireDocumentationLookupEvent(`Apply CTA: Term: ${queryObject.searchTerm}`)
    this.setState(
      {
        items: null,
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
    const start = (this.state.query.page - 1) * config.pageSize
    const end = start + config.pageSize

    const remappedState = mapValues(this.state.query, value => {
      return value === 'All' ? 'all' : value
    })
    const queryTerms = assign({}, remappedState, { start, end })

    this.setState(
      {
        isFetching: true
      },
      async () => {
        this.setState({
          itemResponse: await fetchSiteContent(this.props.type, queryTerms),
          isFetching: false
        })
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
    const newQuery = assign({}, currentQuery, newQueryFieldValue)
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
      items: this.state.itemResponse.items,
      itemCount: this.state.itemResponse.count,
      pageNumber: this.state.query.page,
      pageSize: config.pageSize,
      taxonomies: this.state.taxonomies,
      sbaOffices: this.state.sbaOfficeFilters,
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
  title: PropTypes.string,
  type: PropTypes.string,
  taxonomyFilters: PropTypes.array,
  fieldsToShowInDetails: PropTypes.array,
  sortByOptions: PropTypes.array
}

PagingLookup.defaultProps = {
  title: '',
  type: '',
  taxonomyFilters: [],
  sbaOffices: null,
  fieldsToShowInDetails: [],
  sortByOptions: []
}

export default PagingLookup
