import React from 'react'
import PropTypes from 'prop-types'
import styles from './decorative-dash.scss'

const Dash = ({ width, ...nativeProps }) => (
  <hr {...nativeProps} className={`dash ${styles.dash}`} style={{ width: `${width}px` }} />
)

Dash.propTypes = {
  // The width of the dash in rems
  width: PropTypes.number
}

Dash.defaultProps = {
  width: 336
}

export default Dash
