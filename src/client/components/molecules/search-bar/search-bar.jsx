import React from 'react'

import clientConfig from '../../../services/client-config.js'
import styles from './search-bar.scss'
import { Link, TextInput } from 'atoms'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      searchValue: ''
    }
  }

  handleSearchToggle(e) {
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleSearchKeypress(e) {
    if (e.keyCode === 13) {
      this.handleSearchToggle(e)
    }
  }

  handleSearchChange(e) {
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
  }

  submitSearch(e) {
    e.preventDefault()
    let uri = encodeURI(clientConfig.searchUrl + this.state.searchValue)
    this.executeSearch(uri)
  }

  executeSearch(uri) {
    document.location = uri
  }

  render() {
    const { expanded } = this.state
    const searchLabel = 'Search SBA.gov'
    const toggleLabel = 'toggle search bar'

    if (expanded) {
      return (
        <form
          aria-expanded={expanded}
          id="search-bar"
          key={2}
          className={styles.searchBar}
          onBlur={this.handleSearchToggle.bind(this)}
          onSubmit={this.submitSearch.bind(this)}
        >
          <TextInput
            aria-label={searchLabel}
            id="search-input"
            placeholder={searchLabel}
            onChange={this.handleSearchChange.bind(this)}
            autoFocus
          />
          <i
            alt="search button"
            aria-hidden="true"
            className=" fa fa-search"
            id="search-button"
            onClick={this.submitSearch.bind(this)}
          />
        </form>
      )
    } else {
      return (
        <Link
          aria-label={toggleLabel}
          onClick={this.handleSearchToggle.bind(this)}
          onKeyDown={this.handleSearchKeypress.bind(this)}
        >
          <i alt={toggleLabel} aria-hidden="true" className="fa fa-search" id="search-toggle-link" />
        </Link>
      )
    }
  }
}

export default SearchBar
