import React from 'react'
import styles from './maintenance-page.scss'

class MaintenancePage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>We'll be back soon!</h1>
        <h3 className={styles.blurb}>
          Sorry for the inconvenience but we're performing some maintenance at the moment. We'll be back
          online shortly.
        </h3>
      </div>
    )
  }
}

export default MaintenancePage
