import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { assign, camelCase, chain, includes, pickBy, startCase, isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'

//import styles from './global-search.scss'
import { ApplyButton, MultiSelect, TextInput, SearchIcon } from 'atoms'
import { PrimarySearchBar, CoursesLayout } from 'organisms'
import * as ContentActions from '../../../actions/content.js'
import { logPageEvent } from '../../../services/analytics.js'
import { logEvent } from '../../../services/analytics.js'
import PropTypes from 'prop-types'

const styles = {}
const createSlug = str => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')
}
export class SearchTemplate extends React.PureComponent {
  // constructor() {
  //   super()
  //   this.state = {
  //     filterValues: {}
  //   }
  // }

  componentWillMount() {
    // const topicQuery = this.props.location.query.topic
    //if (this.props.necessaryTaxonomies) {
    // this.props.actions.fetchContentIfNeeded('taxonomies', 'taxonomys', {
    //   names: this.props.necessaryTaxonomies.join(',')
    // })
    //}
    // if (this.props.type === 'courses' && topicQuery) {
    //   this.setState({ filterValues: { businessStage: topicQuery } })
    //   return this.getContent({ businessStage: topicQuery })
    // }
    // return this.getContent(this.state.filterValues)
  }

  // getContent(filters) {
  //   this.props.actions.fetchContentIfNeeded(this.props.type, this.props.type, filters)
  // }

  // handleChange(event, selectStateKey) {
  //   this.handleQueryChange(selectStateKey, event.value)
  // }

  // handleQueryChange(field, value) {
  //   if (field !== 'searchTerm') {
  //     // Log Analytic Event, but not for search term
  //     this.fireDocumentationLookupEvent(`${field}: ${value}`)
  //   }
  //   const newQueryFieldValue = {}
  //   newQueryFieldValue[field] = value
  //   const currentQuery = this.state.filterValues
  //   const newQuery = assign({}, currentQuery, newQueryFieldValue)
  //   this.setState({ filterValues: newQuery })
  // }

  // fireDocumentationLookupEvent(action, value = null) {
  //   this.fireEvent('course-topic-lookup', action, value)
  // }

  // fireEvent(category, action, value) {
  //   logEvent({
  //     category: category,
  //     action: action,
  //     label: window.location.pathname,
  //     value: value
  //   })
  // }

  // renderSearchInput() {
  //   const { searchInputProps } = this.props;
  //   //searchInputProps.value = this.props.queryState.searchTerm
  //   //searchInputProps.onKeyUp =
  //   //searchInputProps.onChange =

  //   return (
  //     <div className={styles.searchBox}>
  //       <TextInput {...searchInputProps} />
  //       <div className={styles.searchIcon}>
  //         <SearchIcon aria-hidden="true" />
  //       </div>
  //     </div>
  //   )
  // }

  // renderMultiSelects(taxonomies) {
  //   const _multiselects = taxonomies.map(taxonomy => {
  //     let newName
  //     const { name } = taxonomy
  //     const id = `${createSlug(name)}-select`
  //     const stateName = camelCase(name)
  //     const includesAllInTaxonomy = ['All', ...taxonomy.terms]
  //     const options = includesAllInTaxonomy.map(entry => {
  //       return { label: entry, value: entry }
  //     })

  //     //todo: this may be an issue for actual businessStage taxonomies e..g in office lookup
  //     if (name === 'businessStage') {
  //       newName = 'courseTopic'
  //     }

  //     const _ms = {
  //       id: id,
  //       onChange: event => {
  //         this.handleChange(event, stateName)
  //       },
  //       name: id,
  //       label: startCase(newName || name),
  //       value: this.state.filterValues[name] || 'All',
  //       options: options
  //     }

  //     return _ms
  //   })

  //   return _multiselects.map((multiSelectProps, index) => {
  //     const returnNull = () => {
  //       return null
  //     }

  //     let multiSelectStyle = styles.multiSelect
  //     if (this.props.type === 'courses') {
  //       multiSelectStyle = styles.courseMultiSelect
  //     }

  //     return (
  //       <div className={multiSelectStyle} key={index}>
  //         <MultiSelect
  //           {...multiSelectProps}
  //           onBlur={returnNull}
  //           onFocus={returnNull}
  //           validationState=""
  //           errorText=""
  //           autoFocus={false}
  //           multi={false}
  //         />
  //       </div>
  //     )
  //   })
  // }

  // onReset() {
  //   if (this.props.type === 'courses') {
  //     this.setState({ filterValues: { businessStage: 'All' } }, () => {
  //       this.onSubmit()
  //     })
  //   }
  // }

  // onSubmit() {
  //   const queryParams = this.props.location.query
  //   let query

  //   if (
  //     this.props.type === 'courses' &&
  //     queryParams.topic &&
  //     this.props.taxonomies.indexOf(queryParams.topic) >= 0
  //   ) {
  //     this.setState({ filterValues: { businessStage: queryParams.topic } })
  //     query = { businessStage: queryParams.topic }
  //   } else if (this.props.taxonomies.indexOf(queryParams.topic) < 0) {
  //     query = this.state.filterValues
  //   }

  //   browserHistory.push({
  //     pathname: `/course/`,
  //     search: `?topic=${query.businessStage}`
  //   })

  //   this.getContent(query)
  // }

  // renderItems(items) {
  //   console.log('LS@', this.props.children)
  //   return (
  //     <div className={styles.container}>
  //       {React.cloneElement(React.Children.only(this.props.children), {
  //         items: items,
  //         onReset: this.onReset
  //       })}
  //     </div>
  //   )
  // }

  render() {
    console.log('CHILLDRENS', this.props.children)
    console.log('PROSPAS', this.props)

    return (
      <div>
        {this.props.children}
        {this.props.items && <div>{this.renderItems(this.props.items)}</div>}
      </div>
    )
  }
}

SearchTemplate.propTypes = {
  searchTitle: PropTypes.string,
  getResults: PropTypes.func.isRequired,
  necessaryTaxonomies: PropTypes.array,
  taxonomies: PropTypes.array,
  items: PropTypes.array,
  location: PropTypes.string,
  actions: PropTypes.any
  // text: React.PropTypes.string.isRequired,
  // target: React.PropTypes.string.isRequired,
  // title: React.PropTypes.string.isRequired,
  // image: React.PropTypes.string.isRequired
}

SearchTemplate.defaultProps = {
  getResults: () => {}
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
export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchTemplate)
