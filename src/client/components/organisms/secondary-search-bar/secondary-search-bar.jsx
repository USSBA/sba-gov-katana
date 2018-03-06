import React from 'react'
import PropTypes from 'prop-types'

import styles from './secondary-search-bar.scss'
import { ApplyButton, SearchIcon } from 'atoms'

export class SecondarySearchBar extends React.PureComponent {
  onFieldChange(fieldName, value) {
    if (this.props.onFieldChange) {
      this.props.onFieldChange(fieldName, value)
    }
  }

  onSearch() {
    if (this.props.onSearch) {
      this.props.onSearch()
    }
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const clonedChild = React.cloneElement(child, {
        onChange: value => {
          this.onFieldChange.bind(this)
          this.onFieldChange(child.props.queryParamName, value)
        },
        labelStyle: styles.inlineLabel
      })
      return clonedChild
    })
    return (
      <div id={this.props.id} className={styles.container}>
        {childrenWithProps}
      </div>
    )
  }
}

SecondarySearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  searchButtonText: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string
}

SecondarySearchBar.defaultProps = {
  onSearch: () => {},
  onFieldChange: () => {},
  searchButtonText: 'Search',
  title: 'Search',
  id: null
}

export default SecondarySearchBar
