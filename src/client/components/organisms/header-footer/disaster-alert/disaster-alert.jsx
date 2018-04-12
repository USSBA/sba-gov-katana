import React from 'react'

import styles from './disaster-alert.scss'
import exitIcon from '../../../../../../public/assets/svg/exit-modal-close.svg'
import { Link } from 'atoms'

class DisasterAlert extends React.Component {
  render() {
    return (
      <div id="disaster-alert">
        {this.props.visible ? (
          <div className={styles.wrapper}>
            <div className={styles.alert}>
              <div className={styles.alertIcon + ' fa fa-exclamation-triangle'} aria-hidden="true" />
              <div className={styles.disasterDescription}>{this.props.description}</div>
              <img className={styles.alertClose} onClick={this.props.onClose} src={exitIcon} alt="Close" />
              <div>
                <Link className={styles.alertButton} to={this.props.link}>
                  {this.props.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

DisasterAlert.defaultProps = {
  visible: false,
  link: '',
  buttonText: '',
  description: ''
}

export default DisasterAlert
