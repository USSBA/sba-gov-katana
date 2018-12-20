import React from 'react'

import logo from 'assets/images/logo-no-text.svg'
import styles from './loader.scss'

const Loader = props => (
  <div className={`loader ${styles.container}`}>
    <img className={styles.logo} src={logo} />
    <div className={styles.loader} />
  </div>
)

export default Loader
