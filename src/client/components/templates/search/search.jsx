import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { assign, camelCase, chain, includes, pickBy, startCase, isEmpty, cloneDeep } from 'lodash'
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
  constructor() {
    super()
    this.state = {
      searchParams: {},
      results: []
    }
  }

  onChange(propName, value) {
    /// console.log(field,value)
    this.setState(prevState => {
      const searchParamsClone = cloneDeep(prevState.searchParams)
      searchParamsClone[propName] = value
      return { searchParams: searchParamsClone }
    })
  }

  generateQuery() {
    //const queryParams = this.props.location.query
    const { searchParams } = this.state
    const queryTermArray = []
    for (const paramName in searchParams) {
      if (searchParams.hasOwnProperty(paramName)) {
        let value = searchParams[paramName]
        //to handle the fact that dropdowns return an object instead of one value
        value = value.value ? value.value : value
        if (value && value !== 'All') {
          queryTermArray.push(`${paramName}=${value}`)
        }
      }
    }

    let search = ''
    if (queryTermArray.length) {
      search += `?${queryTermArray.join('&')}`
    }
    console.log('SEARCHURL!!!!', search)
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
    return ''
  }

  onSearch() {
    const query = this.generateQuery()
    console.log('search.jsx onsearch', this.props.onSearch)
    const { searchType } = this.props
    const { searchParams } = this.state
    this.props.actions.fetchContentIfNeeded(searchType, searchType, searchParams)
  }

  render() {
    // console.log('CHILLDRENS', this.props.children)
    console.log('PROSPAS', this.props)
    const { children, items } = this.props
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        items: items,
        onSearch: this.onSearch.bind(this),
        onFieldChange: this.onChange.bind(this),
        fieldValues: this.state.searchParams
      })
    })

    return <div>{childrenWithProps}</div>
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
  return {
    items: reduxState.contentReducer[props.searchType],
    location: props.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(SearchTemplate)
