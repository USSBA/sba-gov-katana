import React from 'react'
import styles from './results.scss'
import { NoResultsSection, Paginator } from 'molecules'
import { SearchInfoPanel } from 'atoms'
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
    const { total, pageSize, pageNumber, onBack, onForward, setWhiteBackground } = this.props

    const divClassName = classNames({
      [styles.paginator]: true,
      [styles.whiteBackground]: setWhiteBackground
    })

    return this.shouldRenderPaginator() ? (
      <div className={divClassName}>
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
  shouldRenderDefaultResults() {
    const { isLoading, displayDefaultResultOnNoResults, items, defaultResults } = this.props
    return !isLoading && displayDefaultResultOnNoResults && !items.length && defaultResults.length
  }
  renderSearchTips(searchTips = this.props.searchTips) {
    const { renderDefaultResult } = this.props
    return this.shouldShowSearchTips() && searchTips.length ? (
      <NoResultsSection searchTips={searchTips} renderDefaultResult={renderDefaultResult} />
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
      setWhiteBackground,
      isLoading,
      enableLoadingMessage
    } = this.props

    const divClassName = classNames({
      [styles.whiteBackground]: setWhiteBackground
    })

    const searchInfoPanelClassName = classNames({
      [styles.searchFocusState]: true,
      [styles.searchFocusStateWhiteBackground]: setWhiteBackground
    })

    const searchTerm = submittedFieldValues[searchTermName]

    return hasSearchInfoPanel ? (
      <div className={divClassName}>
        <div className={'search-info-panel ' + searchInfoPanelClassName} tabIndex="0" role="text">
          <SearchInfoPanel
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={total}
            searchTerm={searchTerm}
            isLoading={isLoading}
            enableLoadingMessage={enableLoadingMessage}
            setWhiteBackground={setWhiteBackground}
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

  mapResults(results, resultElement) {
    const { hoveredMarkerId, resultId } = this.props
    const resultsWithProps = results.map((item, index) => {
      const mappedChildren = React.Children.map(resultElement, child => {
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
    return resultsWithProps
  }

  renderDefaultResults() {
    const { defaultResults, setWhiteBackground } = this.props

    const divClassName = classNames({
      [styles.defaultResults]: true,
      [styles.whiteBackground]: setWhiteBackground
    })

    let result = null
    const { defaultResultObject, children } = this.props
    const resultElement = defaultResultObject || children
    if (this.shouldRenderDefaultResults()) {
      const resultsWithProps = this.mapResults(defaultResults, resultElement)
      result = resultsWithProps.length ? <div className={divClassName}>{resultsWithProps}</div> : null
    }
    return result
  }

  renderResults(results = this.props.items) {
    const {
      extraResultContainerStyles,
      paginate,
      hasSearchInfoPanel,
      scroll,
      setWhiteBackground,
      children
    } = this.props
    const resultsWithProps = this.mapResults(results, children)
    const resultContainerStyles =
      styles.resultContainer + (extraResultContainerStyles ? ' ' + extraResultContainerStyles : '')

    const divClassName = classNames({
      [styles.scroll]: scroll,
      [styles.resultsWithPagination]: paginate,
      [styles.resultsWithSearchInfo]: hasSearchInfoPanel,
      [resultContainerStyles]: true,
      [styles.whiteBackground]: setWhiteBackground
    })

    return resultsWithProps.length ? <div className={divClassName}>{resultsWithProps}</div> : null
  }

  renderResultsView(resultsClassName) {
    const { extraContainerStyles } = this.props
    const divProps = {}
    if (extraContainerStyles) {
      divProps.className = extraContainerStyles
    }

    return (
      <div className={resultsClassName}>
        {this.renderSearchInfoPanel()}
        <div {...divProps}>
          {this.renderSearchTips()}
          {this.renderDefaultResults()}
          {this.renderResults()}
        </div>
        {this.renderPaginator()}
      </div>
    )
  }

  // currently no default exists for the detail results view
  // so to render detail results customDetailResultsView must be passed in as a prop
  renderDetailResultsView(resultsClassName) {
    const { customDetailResultsView } = this.props
    return customDetailResultsView(resultsClassName, this.hideDetailState.bind(this))
  }

  render() {
    const { customDetailResultsView, id, paginate, selectedItem } = this.props
    const isItemSelected = !isEmpty(selectedItem)
    const shouldShowDetail = customDetailResultsView && isItemSelected

    const resultsClassName = classNames({
      [styles.resultContainerWithPagination]: paginate
    })

    return (
      <div id={id} className={styles.container} role="main" aria-live="polite">
        {shouldShowDetail
          ? this.renderDetailResultsView(resultsClassName)
          : this.renderResultsView(resultsClassName)}
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
  displayDefaultResultOnNoResults: false,
  defaultResultObject: null,
  hidePaginatorOnNoResults: true,
  searchTermName: '',
  submittedFieldValues: {},
  searchTips: [],
  onClick: () => {},
  onResultHover: () => {},
  enableLoadingMessage: true,
  extraContainerStyles: null,
  extraResultContainerStyles: null,

  // When true, sets white background to searchInfoPanel, paginator, resultsContainer, and defaultResults
  setWhiteBackground: false
}

Results.propTypes = {
  submittedFieldValues: PropTypes.object,
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
  hidePaginatorOnNoResults: PropTypes.bool,
  displayDefaultResultOnNoResults: PropTypes.bool,
  defaultResultObject: PropTypes.object,
  enableLoadingMessage: PropTypes.bool,

  // function that renders the details of a selected item,
  // takes two params: resultsClassName and hideDetailState function
  customDetailResultsView: PropTypes.func
}

export default Results
