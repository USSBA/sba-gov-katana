import React from 'react'
import styles from './results.scss'
import { Paginator } from 'molecules'
import { SearchInfoPanel } from 'atoms'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Search from '../../atoms/icons/search'

class Results extends React.PureComponent {
  super() {
    this.renderPaginator = this.renderPaginator.bind(this)
  }

  renderDefaultView(children) {
    return <div>{children}</div>
  }

  renderPaginator() {
    const { total, pageSize, pageNumber, onBack, onForward } = this.props

    return (
      <div className={styles.paginator}>
        <Paginator
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={total}
          onBack={onBack}
          onForward={onForward}
        />
      </div>
    )
  }

  renderSearchInfoPanel() {
    const { total, pageSize, pageNumber, searchTermName, submittedFieldValues } = this.props
    const searchTerm = submittedFieldValues[searchTermName]
    return (
      <div className={styles.searchInfoPanel}>
        <SearchInfoPanel
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={total}
          searchTerm={searchTerm}
        />
      </div>
    )
  }

  render() {
    const { children, id, resultId, paginate, scroll, extraClassName, hasSearchInfoPanel } = this.props
    const childrenWithProps = this.props.items.map((item, index) => {
      const mappedChildren = React.Children.map(children, child => {
        return React.cloneElement(child, {
          item: item,
          id: `${resultId}-${index.toString()}`
        })
      })
      return mappedChildren
    })

    const className = extraClassName ? `${styles.container} ${extraClassName}` : styles.container

    const divClassName = classNames({
      [styles.scroll]: scroll,
      [styles.resultsWithPagination]: paginate,
      [styles.resultsWithSearchInfo]: hasSearchInfoPanel,
      [styles.resultContainer]: true
    })

    const resultsClassName = classNames({
      [styles.resultContainerWithPagination]: paginate
    })

    return (
      <div id={id} className={className}>
        <div className={resultsClassName}>
          {hasSearchInfoPanel && this.renderSearchInfoPanel()}
          <div className={divClassName}>{childrenWithProps}</div>
          {paginate && this.renderPaginator()}
        </div>
      </div>
    )
  }
}

Results.defaultProps = {
  items: [],
  id: null,
  resultId: 'result',
  paginate: false,
  scroll: false,
  hasSearchInfoPanel: false,
  searchTermName: ''
}

Results.propTypes = {
  items: PropTypes.array,
  id: PropTypes.string, //.isRequired,
  resultId: PropTypes.string,
  paginate: PropTypes.bool,
  scroll: PropTypes.bool,
  hasSearchInfoPanel: PropTypes.bool,
  searchTermName: PropTypes.string
}

export default Results
