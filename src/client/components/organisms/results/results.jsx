import React from 'react'
import styles from './results.scss'
import { Address, PhoneNumber } from 'molecules'
import PropTypes from 'prop-types'

class Results extends React.PureComponent {
  render() {
    const { children, id } = this.props
    const childrenWithProps = this.props.items.map((item, index) => {
      const mappedChildren = React.Children.map(children, child => {
        return React.cloneElement(child, { item: item, id: index.toString() })
      })
      return mappedChildren
    })

    return <div className={styles.container}>{childrenWithProps}</div>
  }
}

Results.defaultProps = {
  items: [],
  id: 'result'
}

Results.propTypes = {
  items: PropTypes.array,
  id: PropTypes.string //.isRequired
}

export default Results
