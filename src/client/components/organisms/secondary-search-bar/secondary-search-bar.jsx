import React from 'react'
import PropTypes from 'prop-types'

import styles from './secondary-search-bar.scss'
import { SearchIcon } from 'atoms'

export class SecondarySearchBar extends React.PureComponent {
  onFieldChange(fieldName, value) {
    const onChangeOptions = {
      shouldTriggerSearch: true,
      shouldResetPageNumber: true
    }
    if (this.props.onFieldChange) {
      this.props.onFieldChange(fieldName, value, onChangeOptions)
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
        onChange: valueOrEvent => {
          this.onFieldChange.bind(this)
          const value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent
          this.onFieldChange(child.props.queryParamName, value)
        },
        labelStyle: styles.inlineLabel
      })
      return clonedChild
    })
    return (
      <div id={this.props.id} className={styles.secondarySearchBar}>
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
