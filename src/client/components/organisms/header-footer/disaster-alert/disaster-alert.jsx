import React, { PropTypes } from 'react'

import styles from './disaster-alert.scss'
import exitIcon from '../../../../../../public/assets/svg/exit-modal-close.svg'
import { Link } from 'atoms'

const DisasterAlert = props => {
  const { buttonText, description, link, onClose, visible } = props

  if (!visible) {
    return null
  }

  const icon = <i className="fa fa-exclamation-triangle" aria-hidden="true" />

  return (
    <div className={styles.alert} id="disaster-alert">
      <div className={styles.column}>{icon}</div>
      <div className={styles.description}>
        <h6>
          {icon}
          {description}
          <Link className={styles.button} to={link}>
            {buttonText}
          </Link>
        </h6>
      </div>
      <div className={styles.column}>
        <img className={styles.close} onClick={onClose} src={exitIcon} alt="Close" />
      </div>
    </div>
  )
}

DisasterAlert.defaultProps = {
  visible: false
}

DisasterAlert.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default DisasterAlert
