import React, { PropTypes } from 'react'
import cookie from 'react-cookie'

import styles from '../organisms/header-footer/header/header.scss'
import { getLanguageOverride } from '../../services/utils.js'
import { fetchRestContent } from '../../fetch-content-helper'
import { MainLoader } from 'molecules'
import { DisasterAlert, Footer, Header, ModalController } from 'organisms'

const DISASTER_ALERT_COOKIE = 'close_disaster_loan_parature'

class Main extends React.Component {
  constructor(props) {
    super()
    this.state = {
      disasterAlert: {},
      disasterAlertCookieExists: false
    }
  }

  async componentDidMount() {
    const disasterAlertCookie = cookie.load(DISASTER_ALERT_COOKIE) ? true : false
    const disasterAlertData = await fetchRestContent('disaster', null, getLanguageOverride())
    const disasterAlert = Object.assign(disasterAlertData, { visible: !disasterAlertCookie })

    this.setState({
      disasterAlert,
      disasterAlertCookieExists: disasterAlertCookie
    })
  }

  handleClose(type) {
    this.setState({
      disasterAlert: { visible: false },
      disasterAlertCookieExists: true
    })

    cookie.save(DISASTER_ALERT_COOKIE, '1', {
      path: '/',
      secure: true
    })
  }

  render() {
    const { children } = this.props
    const {
      disasterAlert: { buttonText, description, link, spanishTranslation, visible },
      disasterAlertCookieExists
    } = this.state

    return (
      <div className={visible && styles.alertIsActive}>
        <DisasterAlert
          description={description}
          visible={visible && !disasterAlertCookieExists}
          buttonText={buttonText}
          link={link}
          spanishTranslation={spanishTranslation}
          onClose={() => {
            this.handleClose('DISASTER')
          }}
        />

        <a className={styles.skipNav} href="#main-content">
          Skip to main content
        </a>

        <Header additionalMenuOffset={visible ? 53 : 0} />

        <MainLoader />

        <div id="main-content" className={styles.mainContent}>
          {children}
        </div>

        <Footer />
        <ModalController />
      </div>
    )
  }
}

export default Main
