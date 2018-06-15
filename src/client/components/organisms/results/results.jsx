import React from 'react'
import styles from './results.scss'
import { Address, PhoneNumber } from 'molecules'
import PropTypes from 'prop-types'

class Results extends React.PureComponent {
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

    let className = styles.container

    switch (this.props.id) {
      case 'office-results':
        className += ` ${styles.officeResults}`
        break
    }

    return (
      <div id={id} className={className}>
        {childrenWithProps}
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
