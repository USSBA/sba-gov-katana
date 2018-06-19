import React from 'react'
import styles from './results.scss'
import { Address, PhoneNumber, Paginator } from 'molecules'
import PropTypes from 'prop-types'

class Results extends React.PureComponent {
  super() {
    this.renderPaginator = this.renderPaginator.bind(this)
  }

  /*
  renderPaginator() {
    //const { count, defaultSearchParams: { pageSize } } = this.props
    //const { results, pageNumber } = this.state

    let result = <div />

    //if (!isEmpty(results)) {
      result = (
        <div className={styles.paginator}>
          <Paginator
            pageNumber={10}
            pageSize={20}
            total={100}
            onBack={() => {}}
            onForward={() => {}}
          />
        </div>
      )
    //}
    return result
  }*/

  renderDefaultView(children) {
    return <div>{children}</div>
  }

  renderOfficeView(children) {
    return (
      <div>
        <div className={styles.scroll}>{children}</div>
        <div className={styles.paginator}>
          <Paginator pageNumber={10} pageSize={20} total={100} onBack={() => {}} onForward={() => {}} />
        </div>
      </div>
    )
  }

  render() {
    const { children, id, resultId } = this.props
    const childrenWithProps = this.props.items.map((item, index) => {
      const mappedChildren = React.Children.map(children, child => {
        return React.cloneElement(child, {
          item: item,
          id: `${resultId}-${index.toString()}`
        })
      })
      return mappedChildren
    })

    let renderView
    let className

    switch (this.props.id) {
      case 'office-results':
        className = `${styles.container} ${styles.officeResults}`
        renderView = this.renderOfficeView
        break
      default:
        className = `${styles.container}`
        renderView = this.renderDefaultView
    }

    return (
      <div id={this.props.id} className={className}>
        {renderView(childrenWithProps)}
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
