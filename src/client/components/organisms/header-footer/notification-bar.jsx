import React from 'react'

import styles from './notification-bar.scss'
import exitIcon from '../../../../../public/assets/svg/exit-modal-close-white.svg'
import { Button } from 'atoms'

class NotificationBar extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.alert}>
          <div className={styles.description}>{this.props.description}</div>

          <img className={styles.alertClose} onClick={this.props.onClose} src={exitIcon} alt="Close" />

          <div>
            <Button secondary url={this.props.url}>
              Learn more
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

NotificationBar.defaultProps = {
  description: '',
  url: '#',
  onClose: () => false
}

export default NotificationBar
