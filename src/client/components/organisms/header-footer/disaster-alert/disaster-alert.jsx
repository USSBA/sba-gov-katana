import React from 'react'

import styles from './disaster-alert.scss'
import exitIcon from '../../../../../../public/assets/svg/exit-modal-close.svg'
import { Link } from 'atoms'
import { getLanguageOverride } from '../../../../services/utils.js'

const DisasterAlert = props => {
  const { onClose, spanishTranslation, visible } = props

  const langCode = getLanguageOverride()
  const data = langCode === 'es' && spanishTranslation ? spanishTranslation : props
  const { buttonText, description, link } = data

  if (visible) {
    return (
      <div className={styles.wrapper} id="disaster-alert">
        <div className={styles.alert}>
          <div className={styles.alertIcon + ' fa fa-exclamation-triangle'} aria-hidden="true" />
          <div className={styles.disasterDescription} tabIndex="1" aria-label={description}>
            {description}
          </div>
          <img
            className={styles.alertClose}
            onClick={onClose}
            onKeyDown={e => {
              // Key code 13 equals Enter and 32 equals Spacebar
              if (e.keyCode === 13 || e.keyCode === 32) {
                e.preventDefault()
                return onClose()
              }
            }}
            src={exitIcon}
            alt="close"
            tabIndex="3"
            aria-label="click to close alert"
          />
          <Link
            className={styles.alertLink}
            to={link}
            tabIndex="2"
            aria-label={`click to learn more about ${description}`}
          >
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
