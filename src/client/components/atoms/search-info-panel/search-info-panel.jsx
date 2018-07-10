import React, { PropTypes } from 'react'
import styles from './search-info-panel.scss'

class SearchInfoPanel extends React.Component {
  render() {
    const { id, pageNumber, pageSize, total, searchTerm } = this.props
    const start = Math.min(1 + (pageNumber - 1) * pageSize, total)
    const end = Math.min(start + pageSize - 1, total)
    return (
      <div id={id}>
        <span>
          Results <strong className="text-primary">{start}</strong>{' '}
          <span className={styles.spacing}>-</span> <strong className="text-primary">{end}</strong>{' '}
          <span className={styles.spacing}>of</span> <strong className="text-primary">{total}</strong>
          {searchTerm && (
            <span>
              {' '}
              for <span>"{searchTerm}"</span>
            </span>
          )}
        </span>
      </div>
    )
  }
}

SearchInfoPanel.defaultProps = {
  pageNumber: 1,
  pageSize: 1,
  total: 0,
  searchTerm: ''
}

SearchInfoPanel.PropTypes = {
  id: PropTypes.string,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  searchTerm: PropTypes.string
}

export default SearchInfoPanel
