import React from 'react'

import styles from './search-bar.scss'
import { SmallIcon, TextInput } from 'atoms'

class SearchBar extends React.Component {
  constructor(props) {
    super()
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
    let uri = encodeURI('/search/?q=' + this.state.searchValue)
    document.location = uri
  }

  render() {
    if (this.state.expanded) {
      return (
        <form
          key={2}
          id="search-bar"
          className={styles.searchBar}
          onBlur={this.handleSearchToggle.bind(this)}
          onSubmit={this.submitSearch.bind(this)}
        >
          <TextInput
            id="search-input"
            placeholder="Search SBA.gov"
            onChange={this.handleSearchChange.bind(this)}
            onKeyDown={this.handleKeyPressOnSearch}
            autoFocus
          />
          <SmallIcon
            extraClassName={styles.searchIcon}
            id="search-button"
            onClick={this.submitSearch.bind(this)}
            alt="search button"
            fontAwesomeIconClassName="search"
          />
        </form>
      )
    } else {
      return (
        <SmallIcon
          id="search-toggle-link"
          extraClassName={styles.searchIcon}
          onClick={this.handleSearchToggle.bind(this)}
          onKeyDown={this.handleSearchKeypress.bind(this)}
          alt="search icon"
          fontAwesomeIconClassName="search"
        />
      )
    }
  }
}

SearchBar.propTypes = {}

export default SearchBar
