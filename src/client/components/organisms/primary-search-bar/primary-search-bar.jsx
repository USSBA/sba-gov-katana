import React from 'react'
import PropTypes from 'prop-types'

import styles from './primary-search-bar.scss'
import { ApplyButton, SearchIcon } from 'atoms'

export class PrimarySearchBar extends React.PureComponent {
  onFieldChange(newValue) {
    if (this.props.onFieldChange) {
      this.props.onFieldChange()
    }

    console.log('newvalue', newValue)
  }

  onSearch() {
    if (this.props.onSearch) {
      this.props.onSearch()
    }
    console.log('onsearch')
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      console.log('CHILD', child)
      const clonedChild = React.cloneElement(child, { onChange: this.onFieldChange.bind(this) })
      console.log('CLONED CHILD', clonedChild)
      return clonedChild
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
                submit={this.onSearch.bind(this)}
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
