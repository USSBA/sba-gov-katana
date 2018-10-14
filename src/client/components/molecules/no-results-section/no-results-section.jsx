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
          <p>{tip}</p>
        </li>
      )
    })
  }

  render() {
    const { searchTips, isLoading, items, renderDefaultResult } = this.props
    if (isLoading || items.length) {
      return null
    }
    return (
      <div className="no-results-view" tabIndex="0">
        {searchTips.length > 0 && (
          <div className={styles.resultsMessage}>
            <ul>{this.renderSearchTips()}</ul>
          </div>
        )}
        <div>{renderDefaultResult()}</div>
      </div>
    )
  }
}
NoResultsSection.propTypes = {
  renderDefaultResult: PropTypes.func,
  message: PropTypes.string,
  searchTips: PropTypes.array,
  items: PropTypes.array,
  isLoading: PropTypes.bool
}

NoResultsSection.defaultProps = {
  renderDefaultResult: () => {},
  searchTips: [],
  isLoading: false,
  items: []
}

export default NoResultsSection
