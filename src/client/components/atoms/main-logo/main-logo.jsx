import React from 'react'

import sbaLogo from 'assets/images/logo.png'
import styles from './main-logo.scss'
import { Link } from 'atoms'

class MainLogo extends React.Component {
  render() {
    return (
      <div className={styles.logo}>
        <Link to="/">
          <img alt="Small Business Administration" aria-label="homepage" src={sbaLogo} />
        </Link>
      </div>
    )
  }
}
export default MainLogo
