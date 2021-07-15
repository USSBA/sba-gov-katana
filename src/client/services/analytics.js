import config from './client-config.js'
import _ from 'lodash'

var reactGa = require('react-ga')

function isEnabled() {
  return config.googleAnalytics.enabled
}

if (isEnabled()) {
  // TODO: will completely remove in future story
  // reactGa.initialize(config.googleAnalytics.accountId)
  // reactGa.plugin.require(config.googleAnalytics.optimizeContainerId)
} else if (config.debug) {
  console.log('GA in Development Mode')
}

function logPageView() {
  if (isEnabled()) {
    reactGa.set({
      page: window.location.pathname
    })
    reactGa.pageview(window.location.pathname)
    console.log('Posting Location Change to GA:', window.location.pathname)
  } else if (config.debug) {
    console.log('Would have posted location change to GA:', window.location.pathname)
  }
}

function logEvent(eventToLog) {
  if (isEnabled()) {
    console.log('Posting Event to GA:', eventToLog)
    reactGa.event(eventToLog)
  } else if (config.debug) {
    console.log('Would have posted event to GA if enabled:', eventToLog)
  }
}

function logModal(modalName) {
  if (isEnabled()) {
    console.log('Posting modal view to GA:', modalName)
    reactGa.modalview(modalName)
  } else if (config.debug) {
    console.log('Would have posted modal view to GA if enabled:', modalName)
  }
}

function logSet(data) {
  if (isEnabled()) {
    console.log('Posting set data to GA:', data)
    reactGa.set(data)
  } else if (config.debug) {
    console.log('Would have posted set data to GA if enabled:', data)
  }
}

// Default "label" to window.location.pathname; value to null
function logPageEvent(eventToLog) {
  const defaultValues = {
    label: window.location.pathname,
    value: null
  }
  logEvent(_.merge(defaultValues, eventToLog))
}

/* eslint-disable callback-return */
function googleAnalyticsMiddleware({ getState }) {
  return next => {
    return action => {
      if (action.type === '@@router/LOCATION_CHANGE') {
        logPageView()
      }
      return next(action)
    }
  }
}
/* eslint-enable callback-return */

export { logPageView, googleAnalyticsMiddleware, logEvent, logSet, logModal, logPageEvent }
