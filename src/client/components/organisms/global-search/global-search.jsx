import React from 'react'
import { browserHistory } from 'react-router'
import { assign, camelCase, chain, includes, pickBy, startCase, isEmpty } from 'lodash'
import { Button, MultiSelect } from 'atoms'
import { CoursesLayout } from 'organisms'
import styles from './global-search.scss'
import { logPageEvent } from '../../../services/analytics.js'
import { logEvent } from '../../../services/analytics.js'
import { fetchSiteContent } from '../../../fetch-content-helper'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}
class GlobalSearch extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      filterValues: {},
      taxonomies: []
    }
  }

  async componentWillMount() {
    const topicQuery = this.props.location.query.topic
    const taxonomies = await this.getTaxonomies(this.props.taxonomyFilters)
    
    if (this.props.type === 'courses') {
      let topic = topicQuery || 'All'
      return this.setState({
        filterValues: {
          businessStage: topicQuery,
          sortBy: this.props.defaultSortBy
        },
        taxonomies
      },
        async () => {
          await this.getContent(this.state.filterValues)
        }
      )
    }

    const filterValuesWithSortByOption = Object.assign({}, this.state.filterValues, {
      sortBy: this.props.defaultSortBy
    })
    return await this.getContent(filterValuesWithSortByOption)
  }

  async getTaxonomies(taxonomyFilters) {
    const taxonomies = await fetchSiteContent('taxonomys', {
      names: taxonomyFilters.join(',')
    })
    return taxonomies
  }

  async getContent(filters) {
    const results = await fetchSiteContent(this.props.type, filters)    
    this.setState({
      items: results
    })
  }

  handleChange(event, selectStateKey) {
    this.handleQueryChange(selectStateKey, event.value)
  }

  handleQueryChange(field, value) {
    if (field !== 'searchTerm') {
      // Log Analytic Event, but not for search term
      this.fireDocumentationLookupEvent(`${field}: ${value}`)
    }
    const newQueryFieldValue = {}
    newQueryFieldValue[field] = value
    const currentQuery = this.state.filterValues
    const newQuery = Object.assign({}, currentQuery, newQueryFieldValue)
    this.setState({ filterValues: newQuery })
  }

  fireDocumentationLookupEvent(action, value = null) {
    this.fireEvent('course-topic-lookup', action, value)
  }

  fireEvent(category, action, value) {
    logEvent({
      category: category,
      action: action,
      label: window.location.pathname,
      value: value
    })
  }

  renderMultiSelects(taxonomies) {
    const _multiselects = taxonomies.map(taxonomy => {
      let newName
      const { name } = taxonomy
      const id = `${createSlug(name)}-select`
      const stateName = camelCase(name)
      const includesAllInTaxonomy = ['All', ...taxonomy.terms]
      const options = includesAllInTaxonomy.map(entry => {
        return { label: entry, value: entry }
      })

      if (name === 'businessStage') {
        newName = 'courseTopic'
      }

      const _ms = {
        id: id,
        onChange: event => {
          this.handleChange(event, stateName)
        },
        name: id,
        label: startCase(newName || name),
        value: this.state.filterValues[name] || 'All',
        options: options
      }

      return _ms
    })

    return _multiselects.map((multiSelectProps, index) => {
      const returnNull = () => {
        return null
      }

      let multiSelectStyle = styles.multiSelect
      if (this.props.type === 'courses') {
        multiSelectStyle = styles.courseMultiSelect
      }

      return (
        <div className={multiSelectStyle} key={index}>
          <MultiSelect
            {...multiSelectProps}
            onBlur={returnNull}
            onFocus={returnNull}
            validationState=""
            errorText=""
            autoFocus={false}
            multi={false}
          />
        </div>
      )
    })
  }

  onReset() {
    if (this.props.type === 'courses') {
      this.setState({ filterValues: { businessStage: 'All' } }, () => {
        this.submit()
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.submit()
  }

  submit() {
    const { taxonomies } = this.state

    const queryParams = this.props.location.query
    let query

    if (
      this.props.type === 'courses' &&
      queryParams.topic &&
      taxonomies.indexOf(queryParams.topic) >= 0
    ) {
      this.setState({
        filterValues: { businessStage: queryParams.topic, sortBy: this.props.defaultSortBy }
      })
      query = { businessStage: queryParams.topic }
    } else if (taxonomies.indexOf(queryParams.topic) < 0) {
      query = this.state.filterValues
    }

    browserHistory.push({
      pathname: `/course/`,
      search: `?topic=${query.businessStage}`
    })

    const filterValuesWithSortByOption = Object.assign({}, this.state.filterValues, {
      sortBy: this.props.defaultSortBy
    })

    this.setState({
      items: 'IS_LOADING'
    }, () => {
      this.getContent(filterValuesWithSortByOption)
    })
  }

  renderItems(items) {
    if (this.props.type === 'courses') {
      return (
        <div className={styles.container}>
          <CoursesLayout
            items={items}
            onReset={_ => {
              this.onReset()
            }}
          />
        </div>
      )
    }
  }

  render() {
    const { taxonomies, items } = this.state

    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {taxonomies && (
            <form onSubmit={this.onSubmit.bind(this)}>
              {this.renderMultiSelects(taxonomies)}
              <div className={styles.applyButton}>
                <Button primary alternate type="submit">
                  Apply
                </Button>
              </div>
            </form>
          )}
        </div>
        {items && items !== 'IS_LOADING' && <div>{this.renderItems(items)}</div>}
      </div>
    )
  }
}

export default GlobalSearch
