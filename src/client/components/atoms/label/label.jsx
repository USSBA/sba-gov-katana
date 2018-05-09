import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './label.scss'

const Label = props => {
  const { id, small, type } = props

  const className = classNames({
    label: true,
    [styles.label]: true,
    [styles.small]: small,
    [styles.large]: !small
  })

  return (
    <div className={className}>
      <h6 className={styles.type}>{type}</h6>
      {id ? <h6 className={styles.id}>{id}</h6> : null}
    </div>
  )
}

Label.PropTypes = {
  // Secondary text that specifies the exact entity
  id: PropTypes.string,

  // Decreases the font size and padding of the label
  small: PropTypes.bool,

  // The main text that defines the type of the entity
  type: PropTypes.string.isRequired
}

Label.defaultProps = {
  // This is a text placement for article related cards because it doesn't have any type or id
  type: 'Memo'
}

export default Label
