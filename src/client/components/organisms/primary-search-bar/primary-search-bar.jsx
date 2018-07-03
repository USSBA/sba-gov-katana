import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import styles from './primary-search-bar.scss'
import { Button, SearchIcon } from 'atoms'

export class PrimarySearchBar extends React.PureComponent {
  onFieldChange(fieldName, value) {
    const { onFieldChange } = this.props
    if (onFieldChange) {
      onFieldChange(fieldName, value)
    }
  }

  onSearch(event) {
    event.preventDefault()
    if (this.props.onSearch) {
      this.props.onSearch()
      return false
    }

    return true
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const { queryParamName } = child.props
      const { fieldValues } = this.props
      const clonedChild = React.cloneElement(child, {
        onChange: valueOrEvent => {
          this.onFieldChange.bind(this)
          const value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent
          this.onFieldChange(queryParamName, value)
        },
        value: fieldValues && fieldValues[queryParamName] ? fieldValues[queryParamName] : ''
      })
      return clonedChild
    })
    const { id } = this.props
    return (
      <div id={id}>
        <div className={styles.banner}>
          <h2 id={`${id ? id : 'primary-search-bar'}-title`} className={styles.header}>
            {this.props.title}
          </h2>
          <form>
            {childrenWithProps}
            <div className={styles.applyButton}>
              <Button
                primary
                alternate
                id={`${id ? id : 'primary-search-bar'}-search-button`}
                onClick={this.onSearch.bind(this)}
              >
                {this.props.searchButtonText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

PrimarySearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  searchButtonText: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string
}

PrimarySearchBar.defaultProps = {
  onSearch: () => {},
  onFieldChange: () => {},
  searchButtonText: 'Search',
  title: 'Search',
  id: null
}

export default PrimarySearchBar
