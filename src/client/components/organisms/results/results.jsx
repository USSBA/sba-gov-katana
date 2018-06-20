import React from 'react'
import styles from './results.scss'
import { Paginator } from 'molecules'
import PropTypes from 'prop-types'

class Results extends React.PureComponent {
  super() {
    this.renderPaginator = this.renderPaginator.bind(this)
  }

  renderDefaultView(children) {
    return <div>{children}</div>
  }

  renderPaginatedView(children, props) {
    const { total, pageSize, pageNumber, onBack, onForward } = props

    return (
      <div>
        <div className={styles.scroll}>{children}</div>
        <div className={styles.paginator}>
          <Paginator
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={total}
            onBack={onBack}
            onForward={onForward}
          />
        </div>
      </div>
    )
  }

  render() {
    const { children, id, resultId, paginated, extraClassName } = this.props
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
    const renderView = paginated ? this.renderPaginatedView : this.renderDefaultView

    return (
      <div id={this.props.id} className={className}>
        {renderView(childrenWithProps, this.props)}
      </div>
    )
  }
}

Results.defaultProps = {
  items: [],
  id: null,
  resultId: 'result'
}

Results.propTypes = {
  items: PropTypes.array,
  id: PropTypes.string, //.isRequired,
  resultId: PropTypes.string
}

export default Results
