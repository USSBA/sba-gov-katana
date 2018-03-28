import React, { PropTypes } from 'react'
import styles from './decorative-dash.scss'

const Dash = ({ width, ...nativeProps }) => (
  <hr className={styles.dash} style={{ width: `${width}rem` }} {...nativeProps} />
)

Dash.propTypes = {
  // The width of the dash in rems
  width: PropTypes.number
}

Dash.defaultProps = {
  width: 18.667
}

export default Dash
