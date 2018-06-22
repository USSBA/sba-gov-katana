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

  renderPaginator(children) {
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

  render() {
    const { children, id, resultId, paginate, scroll, extraClassName } = this.props
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

    const divProps = {}
    if (scroll) {
      divProps.className = styles.scroll
    }

    return (
      <div id={this.props.id} className={className}>
        <div {...divProps}>{childrenWithProps}</div>
        {paginate && this.renderPaginator()}
      </div>
    )
  }
}

Results.defaultProps = {
  items: [],
  id: null,
  resultId: 'result',
  paginate: false,
  scroll: false
}

Results.propTypes = {
  items: PropTypes.array,
  id: PropTypes.string, //.isRequired,
  resultId: PropTypes.string,
  paginate: PropTypes.bool,
  scroll: PropTypes.bool
}

export default Results
