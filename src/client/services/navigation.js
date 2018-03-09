import { browserHistory } from 'react-router'
import { logEvent, logPageEvent } from '../services/analytics.js'
import _ from 'lodash'
import clientConfig from './client-config.js'

const paths = [
  'styleguide',
  'learning-center',
  'guide',
  'business-guide',
  'lendermatch',
  'funding-programs',
  'document',
  'article',
  'partners',
  'disaster-assistance',
  'size-standards',
  'federal-contracting'
]

function createCtaNavigation(targetLocation, category, action, value) {
  return createNavigation(targetLocation, {
    category: category,
    action: action,
    value: value,
    label: browserHistory.getCurrentLocation().pathname
  })
}

// eslint-disable-next-line complexity
function navigateNow(targetLocation, eventConfig) {
  if (targetLocation) {
    console.log('targetLocation', targetLocation)
    const mapped = _.map(paths, path => {
      // eslint-disable-next-line no-magic-numbers
      return _.startsWith(path, '/' + targetLocation)
    })
    const isHandledRoute = _.compact(mapped).length > 0
    const startsWithHttp = _.startsWith(targetLocation, 'http')
    const sbicSpecialCaseToAllowServerRedirect =
      targetLocation === '/partners/sbic' && !clientConfig.showSbic
    if (eventConfig) {
      logEvent({
        category: eventConfig.category || 'Navigation',
        action: eventConfig.action || `Location Change Request: ${targetLocation}`,
        label: eventConfig.label || browserHistory.getCurrentLocation().pathname,
        value: eventConfig.value || null
      })
    }
    if (
      (targetLocation === '/' || isHandledRoute) &&
      !startsWithHttp &&
      !sbicSpecialCaseToAllowServerRedirect
    ) {
      browserHistory.push(targetLocation)
      // eslint-disable-next-line no-magic-numbers
      if (targetLocation.indexOf('#') === -1) {
        window.scrollTo(0, 0)
      }
    } else {
      document.location = targetLocation
    }
  } else {
    console.log("WARNING: navigateNow passed a null target location; here's the eventConfig", eventConfig)
  }
}

function createNavigation(targetLocation, eventConfig) {
  return () => {
    navigateNow(targetLocation, eventConfig)
  }
}

function goBackNow() {
  browserHistory.goBack()
  logEvent({
    category: 'Navigation',
    action: 'Back Button Pushed',
    label: browserHistory.getCurrentLocation().pathname
  })
}

export { createCtaNavigation, goBackNow, navigateNow, createNavigation }
