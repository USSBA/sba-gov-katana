import React from 'react'
import PropTypes from 'prop-types'

import styles from './primary-search-bar.scss'
import { ApplyButton, SearchIcon } from 'atoms'

export class PrimarySearchBar extends React.PureComponent {
  onFieldChange() {
    this.props.onFieldChange()
  }

  onSearch() {
    this.props.onSearch()
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { onChange: this.onFieldChange })
    })
    return (
      <div>
        <div className={styles.banner}>
          <h2 id="primary-search-bar-title" className={styles.header}>
            {this.props.title}
          </h2>
          <div>
            {childrenWithProps}
            <div className={styles.applyButton}>
              <ApplyButton
                id="primary-search-bar-search-button"
                submit={this.onSearch}
                text={this.props.searchButtonText}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PrimarySearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  searchButtonText: PropTypes.string,
  title: PropTypes.string
}

PrimarySearchBar.defaultProps = {
  onSearch: () => {},
  onFieldChange: () => {},
  searchButtonText: 'Search',
  title: 'Search'
}

export default PrimarySearchBar
