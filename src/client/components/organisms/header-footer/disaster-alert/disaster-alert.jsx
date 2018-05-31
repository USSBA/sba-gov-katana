import React from 'react'

import styles from './disaster-alert.scss'
import exitIcon from '../../../../../../public/assets/svg/exit-modal-close.svg'
import { Link } from 'atoms'

const DisasterAlert = props => {
  const { buttonText, description, link, onClose, visible } = props

  if (visible) {
    return (
      <div className={styles.wrapper} id="disaster-alert">
        <div className={styles.alert}>
          <div className={styles.alertIcon + ' fa fa-exclamation-triangle'} aria-hidden="true" />
          <div className={styles.disasterDescription} tabIndex="0" aria-label={description}>
            {description}
          </div>
          <img className={styles.alertClose} onClick={onClose} src={exitIcon} alt="Close" />
          <Link className={styles.alertLink} to={link} aria-label="Click to Learn More">
            {buttonText}
          </Link>
        </div>
      </div>
    )
  } else {
    return null
  }
}

DisasterAlert.defaultProps = {
  visible: false,
  link: '',
  buttonText: '',
  description: ''
}

export default DisasterAlert
