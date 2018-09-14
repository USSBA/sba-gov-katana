import React from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import styles from './no-results-section.scss'

class NoResultsSection extends React.Component {
  renderSearchTips() {
    const { searchTips } = this.props
    return searchTips.map(function(tip, index) {
      return (
        <li key={`search-tip-${index}`}>
          <div className={styles.bullet} />
          <p>{tip}</p>
        </li>
      )
    })
  }

  render() {
    const { message, searchTips, isLoading, items } = this.props
    if (isLoading || items.length) {
      return null
    }
    return (
      <div className="no-results-view">
        {searchTips.length > 0 && (
          <div className={styles.resultsMessage}>
            <ul>{this.renderSearchTips()}</ul>
          </div>
        )}
      </div>
    )
  }
}
NoResultsSection.propTypes = {
  message: PropTypes.string,
  searchTips: PropTypes.array,
  items: PropTypes.array,
  isLoading: PropTypes.bool
}

NoResultsSection.defaultProps = {
  searchTips: [],
  isLoading: false,
  items: []
}

export default NoResultsSection
