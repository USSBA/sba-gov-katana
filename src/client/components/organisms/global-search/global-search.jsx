import React from 'react'
import { connect } from 'react-redux'
import { assign, camelCase, chain, includes, pickBy, startCase } from 'lodash'

import styles from './global-search.scss'
import { ApplyButton, MultiSelect, SearchIcon, SmallInverseSecondaryButton, TextInput } from 'atoms'
import * as ContentActions from '../../../actions/content.js'
import { logPageEvent } from '../../../services/analytics.js'
import { getQueryParams } from '../../../services/utils.js'

const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}

export class GlobalSearch extends React.PureComponent {
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
      courseTopic: queryParams.courseTopic
    })

    const filteredQueryParams = pickBy(queryParams, (value, key) => {
      return includes(propsSource.taxonomyFilters, key)
    })

    const finalQuery = assign(defaults, filteredQueryParams, aliasMapping)
    console.log('A', finalQuery)
    return finalQuery
  }

  renderMultiSelects() {
    const _multiselects = this.props.taxonomies.map(taxonomy => {
      const { name } = taxonomy
      const id = `${createSlug(name)}-select`
      const stateName = camelCase(name)
      const options = taxonomy.terms.map(entry => {
        return { label: entry, value: entry }
      })

      const _ms = {
        id: id,
        name: id,
        label: startCase(name),
        options: options
      }

      return _ms
    })

    return _multiselects.map((multiSelectProps, index) => {
      console.log('MULTI', multiSelectProps)
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
    this.props.onQueryChange(selectStateKey, event.value)
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

  render() {
    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.header}>{this.props.title}</h2>
          {this.props.taxonomies.length > 0 && (
            <div>
              {this.renderMultiSelects()}
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

export default connect()(GlobalSearch)
