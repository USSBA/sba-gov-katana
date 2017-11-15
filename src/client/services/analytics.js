import config from './client-config.js'
import _ from 'lodash'

var reactGa = require('react-ga')

function isEnabled() {
  return config.googleAnalytics.enabled
}

if (isEnabled()) {
  reactGa.initialize(config.googleAnalytics.accountId)
  reactGa.plugin.require(config.googleAnalytics.optimizeContainerId)
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
  } else {
    console.log(
      'Would have posted location change to GA:',
      window.location.pathname
    )
  }
}

function logEvent(eventToLog) {
  if (isEnabled()) {
    console.log('Posting Event to GA:', eventToLog)
    reactGa.event(eventToLog)
  } else {
    console.log('Would have posted event to GA if enabled:', eventToLog)
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

export { logPageView, googleAnalyticsMiddleware, logEvent, logPageEvent }
