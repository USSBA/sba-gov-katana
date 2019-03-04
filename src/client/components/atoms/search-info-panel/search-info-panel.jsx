import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './search-info-panel.scss'

class SearchInfoPanel extends React.Component {
  renderResultInfo() {
    const { pageNumber, pageSize, total, searchTerm } = this.props
    const start = Math.min(1 + (pageNumber - 1) * pageSize, total)
    const end = Math.min(start + pageSize - 1, total)
    return (
      <span>
        Results <strong className="text-primary">{start}</strong> <span className={styles.spacing}>-</span>{' '}
        <strong className="text-primary">{end}</strong> <span className={styles.spacing}>of</span>{' '}
        <strong className="text-primary">{total}</strong>
        {searchTerm && (
          <span>
            {' '}
            for <span>"{searchTerm}"</span>
          </span>
        )}
      </span>
    )
  }
  renderNoResultInfo() {
    const { searchTerm } = this.props
    return (
      <span>
        <strong className="text-primary">
          No results found
          {searchTerm && (
            <span>
              {' '}
              for <span>"{searchTerm}"</span>
            </span>
          )}
        </strong>
      </span>
    )
  }
  renderLoadingState() {
    //no loading state currently
    return <span className={styles.loading}>loading</span>
  }

  shouldDisplayLoadingState() {
    const { isLoading } = this.props
    return isLoading
  }
  shouldDisplayNoResultInfo() {
    const { isLoading, total } = this.props
    return !isLoading && total === 0
  }
  shouldDisplayResultInfo() {
    const { isLoading, total } = this.props
    return !isLoading && total > 0
  }
  render() {
    const { id, enableLoadingMessage, setWhiteBackground } = this.props

    const divClassName = classNames({
      [styles.searchInfoPanel]: true,
      [styles.whiteBackground]: setWhiteBackground
    })

    return (
      <div className={divClassName} id={id}>
        {enableLoadingMessage && this.shouldDisplayLoadingState() && this.renderLoadingState()}
        {enableLoadingMessage && this.shouldDisplayNoResultInfo() && this.renderNoResultInfo()}
        {this.shouldDisplayResultInfo() && this.renderResultInfo()}
      </div>
    )
  }
}

SearchInfoPanel.defaultProps = {
  pageNumber: 1,
  pageSize: 1,
  total: 0,
  searchTerm: '',
  isLoading: false,
  enableLoadingMessage: true,
  setWhiteBackground: false
}

SearchInfoPanel.PropTypes = {
  id: PropTypes.string,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  searchTerm: PropTypes.string,
  isLoading: PropTypes.bool,
  enableLoadingMessage: PropTypes.bool,
  setWhiteBackground: PropTypes.bool
}

export default SearchInfoPanel
