import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { assign, camelCase, chain, includes, pickBy, startCase, isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'

import styles from './global-search.scss'
import { ApplyButton, MultiSelect } from 'atoms'
import { CoursesLayout } from 'organisms'
import * as ContentActions from '../../../actions/content.js'
import { logPageEvent } from '../../../services/analytics.js'
import { logEvent } from '../../../services/analytics.js'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}
export class GlobalSearch extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      filterValues: {}
    }
  }

  componentWillMount() {
    const topicQuery = this.props.location.query.topic

    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
      names: this.props.taxonomyFilters.join(',')
    })

    if (this.props.type === 'courses' && topicQuery) {
      this.setState({ filterValues: { businessStage: topicQuery } })
      return this.getContent({ businessStage: topicQuery })
    }
    this.getContent(this.state.filterValues)
  }

  getContent(filters) {
    this.props.actions.fetchContentIfNeeded(this.props.type, this.props.type, filters)
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
    const newQuery = assign({}, currentQuery, newQueryFieldValue)
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

      return (
        <div className={styles.multiSelect} key={index}>
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
        this.onSubmit()
      })
    }
  }

  onSubmit() {
    const queryParams = this.props.location.query
    let query

    if (
      this.props.type === 'courses' &&
      queryParams.topic &&
      this.props.taxonomies.indexOf(queryParams.topic) >= 0
    ) {
      this.setState({ filterValues: { businessStage: queryParams.topic } })
      query = { businessStage: queryParams.topic }
    } else if (this.props.taxonomies.indexOf(queryParams.topic) < 0) {
      query = this.state.filterValues
    }

    browserHistory.push({
      pathname: `/course/`,
      search: `?topic=${query.businessStage}`
    })

    this.getContent(query)
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
    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.props.taxonomies && (
            <div>
              {this.renderMultiSelects(this.props.taxonomies)}
              <div className={styles.applyButton}>
                <ApplyButton submit={this.onSubmit.bind(this)} />
              </div>
            </div>
          )}
        </div>
        {this.props.items && <div>{this.renderItems(this.props.items)}</div>}
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState, props) {
  return {
    taxonomies: reduxState.contentReducer.taxonomies,
    items: reduxState.contentReducer[props.type],
    location: props.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(GlobalSearch)
