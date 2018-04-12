import React from 'react'
import { Link } from 'react-router'

import sbaLogo from 'assets/images/logo.png'
import styles from './main-logo.scss'

class MainLogo extends React.Component {
  render() {
    return (
      <div className={styles.logo}>
        <Link tabIndex="-1" to="/">
          <img alt="Small Business Administration" src={sbaLogo} />
        </Link>
      </div>
    )
  }
}
export default MainLogo
