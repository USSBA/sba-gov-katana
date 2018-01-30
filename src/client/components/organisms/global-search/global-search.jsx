import React from 'react'
import { connect } from 'react-redux'
import { assign, camelCase, chain, includes, pickBy, startCase } from 'lodash'
import { bindActionCreators } from 'redux'

import styles from './global-search.scss'
import { ApplyButton, MultiSelect } from 'atoms'
import * as ContentActions from '../../../actions/content.js'
import { logPageEvent } from '../../../services/analytics.js'
import { getQueryParams } from '../../../services/utils.js'
import { logEvent } from '../../../services/analytics.js'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

export class GlobalSearch extends React.PureComponent {
  constructor(ownProps) {
    super()
    this.state = {
      query: {}
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
      names: this.props.taxonomyFilters.join(',')
    })
  }

  renderMultiSelects(taxonomies) {
    const _multiselects = taxonomies.map(taxonomy => {
      const { name } = taxonomy
      let newName
      const id = `${createSlug(name)}-select`
      const stateName = camelCase(name)
      const includesAllInTaxonomy = ['All', ...taxonomy.terms]
      const options = includesAllInTaxonomy.map(entry => {
        return { label: entry, value: entry }
      })

      name === 'businessStage' ? (newName = 'courseTopic') : newName

      const _ms = {
        id: id,
        onChange: event => {
          this.handleChange(event, stateName)
        },
        name: id,
        label: startCase(newName || name),
        value: this.state.query[name] || 'All',
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
    const currentQuery = this.state.query
    const newQuery = _.assign({}, currentQuery, newQueryFieldValue)
    console.log('CHANGES', newQuery)
    this.setState({ query: newQuery })
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

  render() {
    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.props.taxonomies && (
            <div>
              {this.renderMultiSelects(this.props.taxonomies)}
              <div className={styles.applyButton}>
                <ApplyButton submit={this.props.onSubmit} />
              </div>
            </div>
          )}
        </div>
        <div />
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    taxonomies: reduxState.contentReducer.taxonomies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(GlobalSearch)
