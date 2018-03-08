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

  componentWillMount() {
    if (this.props.defaultSearchParams) {
      this.setState({ searchParams: this.props.defaultSearchParams })
    }

    if (this.props.loadDefaultResults === true) {
      this.doSearch(this.props.searchType, this.props.defaultSearchParams)
    }
  }

  onChange(propName, value) {
    this.setState(prevState => {
      const searchParamsClone = cloneDeep(prevState.searchParams)
      searchParamsClone[propName] = value
      return { searchParams: searchParamsClone }
    })
  }

  generateQuery() {
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
    // todo:
    //   browserHistory.push({
    //     pathname: `/course/`,
    //     search: `?topic=${query.businessStage}`
    //   })

    return search
  }

  onSearch() {
    //doesn't do anything yet but will post query string to history
    const query = this.generateQuery()
    const { searchType } = this.props
    const { searchParams } = this.state
    this.doSearch(searchType, searchParams)
  }

  doSearch(searchType, searchParams) {
    this.props.actions.fetchContentIfNeeded(searchType, searchType, searchParams)
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
