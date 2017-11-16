import React from 'react'
import styles from './disaster-alert.scss'
import exitIcon from '../../../../../../public/assets/svg/exit-modal-close.svg'
import { BasicLink } from 'atoms'

class DisasterAlert extends React.Component {
  render() {
    return (
      <div>
        {this.props.visible ? (
          <div className={styles.wrapper}>
            <div className={styles.alert}>
              <div className={styles.alertIcon + ' fa fa-exclamation-triangle'} aria-hidden="true" />
              <div className={styles.disasterDescription}>{this.props.description}</div>
              <img className={styles.alertClose} onClick={this.props.onClose} src={exitIcon} alt="Close" />
              <div>
                <BasicLink
                  url={this.props.link}
                  text={this.props.buttonText}
                  myClassName={styles.alertButton}
                />
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
