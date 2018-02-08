import React from 'react'
import _ from 'lodash'

import styles from './paging-multiview-layout.scss'
import { Paginator } from 'molecules'
import { logPageEvent } from '../../../services/analytics.js'

class PagingMultiviewLayout extends React.PureComponent {
  constructor(ownProps) {
    super()
    this.state = {
      currentRenderer: ownProps.rendererOne,
      currentRendererName: ownProps.rendererOneName
    }
  }

  renderItems() {
    let result = 'Loading...'
    const { items, pageNumber, onReset, type } = this.props
    if (!_.isEmpty(items)) {
      result = this.state.currentRenderer(items)
    } else {
      result = (
        <div className={`no-results-message-container ${styles.noResults}`}>
          <p className={styles.noResultsMessage}>Sorry, we couldn't find any {type} matching that query.</p>
          <p>
            <a onClick={onReset}>Clear all search filters</a>
          </p>
        </div>
      )
    }

    return <div className={`${styles.itemContainer}`}>{result}</div>
  }

  renderPaginator() {
    const { items, itemCount, pageNumber, pageSize } = this.props
    let result = <div />
    if (!_.isEmpty(items)) {
      result = (
        <div className={styles.paginator}>
          <Paginator
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={itemCount}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      )
    }
    return result
  }

  handleBack() {
    const { pageNumber, onPageChange, googleAnalyticsCategory } = this.props
    let newPageNumber = Math.max(1, pageNumber - 1)
    onPageChange(newPageNumber)
    logPageEvent({ category: googleAnalyticsCategory, action: 'Previous' })
  }

  handleForward() {
    const { itemCount, pageNumber, onPageChange, googleAnalyticsCategory } = this.props
    let newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / this.props.pageSize)), pageNumber + 1)
    onPageChange(newPageNumber)
    logPageEvent({ category: googleAnalyticsCategory, action: 'Next' })
  }

  renderViewTypeSelector() {
    if (this.props.rendererOneName && this.props.rendererTwoName) {
      return (
        <div className={`view-type-selector ${styles.viewTypeSelector}`}>
          {rendererOneName} | {rendererTwoName}
        </div>
      )
    } else {
      return <div />
    }
  }

  render() {
    return (
      <div>
        {this.renderViewTypeSelector()}
        {this.renderPaginator()}
        {this.renderItems()}
        {this.renderPaginator()}
      </div>
    )
  }
}

PagingMultiviewLayout.defaultProps = {
  onPageChange: () => {},
  onReset: () => {},
  itemCount: 0,
  items: [],
  pageNumber: 0,
  pageSize: 0,
  rendererOne: item => {
    return <div>item</div>
  },
  rendererTwo: item => {
    return <div>item</div>
  },
  rendererOneName: null,
  rendererTwoName: null,
  googleAnalyticsCategory: 'Show-More-Results',
  type: 'items'
}

PagingMultiviewLayout.propTypes = {
  onPageChange: React.PropTypes.func,
  onReset: React.PropTypes.func,
  itemCount: React.PropTypes.number,
  items: React.PropTypes.array,
  pageNumber: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  rendererOne: React.PropTypes.func,
  rendererTwo: React.PropTypes.func,
  rendererOneName: React.PropTypes.string,
  rendererTwoName: React.PropTypes.string,
  googleAnalyticsCategory: React.PropTypes.string,
  type: React.PropTypes.string
}

export default PagingMultiviewLayout
