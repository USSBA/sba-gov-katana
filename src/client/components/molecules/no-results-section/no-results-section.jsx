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
        <div className={styles.container + ' ' + styles.emptyDocuments}>
          <div>
            <p className={styles.emptyDocumentsMessage}>{message}</p>

            {searchTips.length > 0 && (
              <div className={styles.resultsMessage}>
                <p>
                  <strong>Search tips:</strong>
                </p>
                <ul>
                  {/* <li>
                                    <div className={styles.bullet} />
                                    <p>Try a different search term, like “counseling” instead of "counselor".</p>
                                </li>
                                <li>
                                    <div className={styles.bullet} />
                                    <p>Try searching with different ZIP code.</p>
                                </li>
                                <li>
                                    <div className={styles.bullet} />
                                    <p>Try filtering by a different service, resource type or distance.</p>
                                </li> */}
                  {this.renderSearchTips()}
                </ul>
              </div>
            )}
          </div>
        </div>
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
  message: 'No results found',
  isLoading: false,
  items: []
}

export default NoResultsSection
