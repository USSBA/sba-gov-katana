import React from 'react'
import styles from './results.scss'
import { NoResultsSection, Paginator } from 'molecules'
import { SearchInfoPanel } from 'atoms'
import { OfficeDetail } from 'organisms'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
class Results extends React.PureComponent {
  super() {
    this.renderPaginator = this.renderPaginator.bind(this)
  }

  renderDefaultView(children) {
    return <div>{children}</div>
  }

  renderPaginator() {
    const { total, pageSize, pageNumber, onBack, onForward } = this.props

    return this.shouldRenderPaginator() ? (
      <div className={styles.paginator}>
        <Paginator
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={total}
          onBack={onBack}
          onForward={onForward}
        />
      </div>
    ) : null
  }
  shouldRenderPaginator() {
    const { isLoading, hidePaginatorOnNoResults, items, paginate } = this.props
    //don't render paginator while the page is loading, if pagination is disabled, or if the paginator is
    //disabled and there are no results
    return !isLoading && paginate && !(hidePaginatorOnNoResults && !items.length)
  }
  shouldShowSearchTips() {
    const { isLoading, displaySearchTipsOnNoResults, items } = this.props
    return !isLoading && displaySearchTipsOnNoResults && !items.length
  }

  renderSearchTips(searchTips = this.props.searchTips) {
    const { isLoading } = this.props
    return this.shouldShowSearchTips() && searchTips.length ? (
      <NoResultsSection searchTips={searchTips} />
    ) : null
  }

  renderSearchInfoPanel() {
    const {
      total,
      pageSize,
      pageNumber,
      searchTermName,
      submittedFieldValues,
      hasSearchInfoPanel,
      isLoading
    } = this.props

    const searchTerm = submittedFieldValues[searchTermName]
    return hasSearchInfoPanel ? (
      <div className={styles.searchInfoPanel}>
        <div className="search-info-panel" tabIndex="0" role="text">
          <SearchInfoPanel
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={total}
            searchTerm={searchTerm}
            isLoading={isLoading}
          />
        </div>
      </div>
    ) : null
  }

  showDetailState(item) {
    this.props.onClick(item)
  }

  hideDetailState() {
    this.props.onClick({})
  }

  renderResults(results = this.props.items) {
    const { children, resultId, hoveredMarkerId, paginate, hasSearchInfoPanel, scroll } = this.props
    const resultsWithProps = results.map((item, index) => {
      const mappedChildren = React.Children.map(children, child => {
        return React.cloneElement(child, {
          item: item,
          id: `${resultId}-${index.toString()}`,
          showDetailState: this.showDetailState.bind(this),
          onResultHover: id => {
            this.props.onResultHover(id)
          },
          hoveredMarkerId,
          length: this.props.items.length
        })
      })
      return mappedChildren
    })

    const divClassName = classNames({
      [styles.scroll]: scroll,
      [styles.resultsWithPagination]: paginate,
      [styles.resultsWithSearchInfo]: hasSearchInfoPanel,
      [styles.resultContainer]: true
    })

    return results.length ? <div className={divClassName}>{resultsWithProps}</div> : null
  }

  render() {
    const { id, paginate, selectedItem } = this.props
    const shouldShowDetailView = !isEmpty(selectedItem)

    const resultsClassName = classNames({
      [styles.resultContainerWithPagination]: paginate
    })

    // the below return statement handles both the office results index case
    // AND the detailed view case
    // based on the boolean "shouldShowDetailView"
    // this code should probably be refactored a bit to be a little more generic

    return (
      <div id={id} className={styles.container} role="main" aria-live="polite">
        {shouldShowDetailView ? (
          <div className={resultsClassName}>
            <OfficeDetail selectedItem={selectedItem} hideDetailState={() => this.hideDetailState()} />
          </div>
        ) : (
          <div className={resultsClassName}>
            {this.renderSearchInfoPanel()}
            <div className={styles.centerContainer}>
              {this.renderSearchTips()}
              {this.renderResults()}
            </div>
            {this.renderPaginator()}
          </div>
        )}
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
  displaySearchTipsOnNoResults: false,
  hidePaginatorOnNoResults: true,
  searchTermName: '',
  submittedFieldValues: [],
  searchTips: [],
  onClick: () => {},
  onResultHover: () => {}
}

Results.propTypes = {
  submittedFieldValues: PropTypes.array,
  items: PropTypes.array,
  id: PropTypes.string,
  resultId: PropTypes.string,
  paginate: PropTypes.bool,
  scroll: PropTypes.bool,
  hasSearchInfoPanel: PropTypes.bool,
  searchTermName: PropTypes.string,
  onClick: PropTypes.func,
  onResultHover: PropTypes.func,
  searchTips: PropTypes.array,
  displaySearchTipsOnNoResults: PropTypes.bool,
  hidePaginatorOnNoResults: PropTypes.bool
}

export default Results
