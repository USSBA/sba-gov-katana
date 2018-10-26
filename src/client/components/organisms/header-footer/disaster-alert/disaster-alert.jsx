import React from 'react'

import styles from './disaster-alert.scss'
import exitIcon from '../../../../../../public/assets/svg/exit-modal-close.svg'
import { Link } from 'atoms'
import { getLanguageOverride } from '../../../../services/utils.js'

const DisasterAlert = props => {
  const langCode = getLanguageOverride()
  const disasterData = determineDisasterData(props, langCode)
  const { onClose, visible } = props
  const { buttonTxt, desc, url } = disasterData

  if (visible) {
    return (
      <div className={styles.wrapper} id="disaster-alert">
        <div className={styles.alert}>
          <div className={styles.alertIcon + ' fa fa-exclamation-triangle'} aria-hidden="true" />
          <div className={styles.disasterDescription} tabIndex="1" aria-label={desc}>
            {desc}
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
            to={url}
            tabIndex="2"
            aria-label={`click to learn more about ${desc}`}
          >
            {buttonTxt}
          </Link>
        </div>
      </div>
    )
  } else {
    return null
  }
}

function determineDisasterData(data, langCode) {
  const { buttonText, description, link, spanishTranslation } = data
  let buttonTxt
  let desc
  let url

  if (langCode === 'es' && data && data.spanishTranslation) {
    buttonTxt = spanishTranslation.buttonText
    desc = spanishTranslation.description
    url = spanishTranslation.link
  } else {
    ;(buttonTxt = buttonText), (desc = description), (url = link)
  }

  return {
    buttonTxt,
    desc,
    url
  }
}

DisasterAlert.defaultProps = {
  visible: false,
  link: '',
  buttonText: '',
  description: ''
}

export default DisasterAlert
