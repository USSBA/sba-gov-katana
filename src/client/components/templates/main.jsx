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
    const disasterAlert = await fetchRestContent('disaster', null, getLanguageOverride())
    this.setState({
      disasterAlert,
      disasterAlertCookieExists: Boolean(cookie.load(DISASTER_ALERT_COOKIE))
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
    const OFFSET = 53
    const { children } = this.props
    const {
      disasterAlert: { buttonText, description, link, spanishTranslation, visible },
      disasterAlertCookieExists
    } = this.state

    return (
      <div className={visible && !disasterAlertCookieExists && styles.alertIsActive}>
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

        <Header additionalMenuOffset={visible ? OFFSET : 0} />

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
