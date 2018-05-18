import React from 'react'
import cookie from 'react-cookie'
import _ from 'lodash'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from '../organisms/header-footer/header/header.scss'
import * as ContentActions from '../../actions/content.js'
import * as LoadingActions from '../../actions/loading.js'
import { MainLoader } from 'molecules'
import { DisasterAlert, Footer, Header, ModalController, NotificationBar } from 'organisms'

const shouldNotificationBarBeVisible = (listOfUrls, currentPathname, isCookiePresent) => {
  let boolean

  // if location pathname MATCHES a whitelabelurl
  // show NotificationBar (if cookie is NOT set)
  // else split whiteLabelUrl by slash-asterisk ("/*")
  // if contains asterisk
  // split whiteLabelUrl by slash
  // split location pathname by slash
  // if whiteLabelUrl[0] is equal to location pathname[0]
  // show NotificationBar (if cookie is NOT set)

  if (listOfUrls) {
    for (let index = 0; index < listOfUrls.length; index++) {
      const whiteLabeledUrl = listOfUrls[index]

      if (_.startsWith(currentPathname, whiteLabeledUrl)) {
        boolean = !isCookiePresent
        break
      }
    }
  }

  return boolean
}

class Main extends React.Component {
  constructor(props) {
    super()
    this.state = {
      disasterAlertHidingCookieIsPresent: false,
      notificationBarHidingCookieIsPresent: false
    }
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded('disaster', 'disaster')
    this.props.actions.fetchContentIfNeeded('notification', 'notification')
  }

  componentWillMount() {
    const updatedState = {
      disasterAlertHidingCookieIsPresent: cookie.load('close_disaster_loan_parature') ? true : false,
      notificationBarHidingCookieIsPresent: cookie.load('close_notification_bar') ? true : false
    }

    this.setState(updatedState)
  }

  handleClose(type) {
    const updatedState = {}
    let cookieBoolean = ''
    let cookieName = ''

    switch (type) {
      case 'DISASTER':
        cookieBoolean = 'disasterAlertHidingCookieIsPresent'
        cookieName = 'close_disaster_loan_parature'

        break

      case 'NOTIFICATION':
        cookieBoolean = 'notificationBarHidingCookieIsPresent'
        cookieName = 'close_notification_bar'

        break

      default:
        return
    }

    updatedState[cookieBoolean] = true

    this.setState(updatedState)

    cookie.save(cookieName, '1', {
      path: '/',
      secure: true
    })
  }

  render() {
    const visible = this.props.disasterAlertVisible && !this.state.disasterAlertHidingCookieIsPresent
    const {
      notificationDescription,
      notificationUrl,
      notificationWhiteLabelUrls,
      location: { pathname }
    } = this.props

    // determine visibility

    const showNotificationBar = shouldNotificationBarBeVisible(
      notificationWhiteLabelUrls,
      pathname,
      this.state.notificationBarHidingCookieIsPresent
    )

    return (
      <div className={visible ? styles.alertIsActive : ''}>
        <DisasterAlert
          description={this.props.disasterAlertDescription}
          visible={visible}
          buttonText={this.props.disasterAlertButtonText}
          link={this.props.disasterAlertLink}
          onClose={() => {
            this.handleClose('DISASTER')
          }}
        />

        <Header additionalMenuOffset={visible ? 53 : 0} />

        <MainLoader />

        <div id="main-content" className={styles.mainContent}>
          {this.props.children}
        </div>

        {showNotificationBar && (
          <NotificationBar
            description={notificationDescription}
            url={notificationUrl}
            onClose={() => {
              this.handleClose('NOTIFICATION')
            }}
          />
        )}

        <Footer />
        <ModalController />
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  const data = {}
  const { disaster, notification } = reduxState.contentReducer
  const loadingState = reduxState.loading
  if (disaster) {
    data.disasterAlertVisible = disaster.visible
    data.disasterAlertDescription = disaster.description
    data.disasterAlertButtonText = disaster.buttonText
    data.disasterAlertLink = disaster.link
  }

  if (notification) {
    data.notificationWhiteLabelUrls =
      notification.visibleOnUrls && notification.visibleOnUrls.split
        ? notification.visibleOnUrls.split('\r\n')
        : []
    data.notificationDescription = notification.title
    data.notificationUrl = notification.url
  }

  if (loadingState) {
    data.loadingState = loadingState
  }

  return data
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Main)
