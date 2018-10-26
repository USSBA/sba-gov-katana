const init = require('./init.js')
Promise.resolve().then(init)
//remove this when breaking server.js up into controllers -zandypants
import zlib from 'zlib'
import path from 'path'
import _ from 'lodash'
/*Contains express server setup*/
import express from 'express'
import accepts from 'accepts'
import config from 'config'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import HttpStatus from 'http-status-codes'
import { enableWebpackHotModuleReplacement, addDevelopmentErrorHandler } from './util/dev.js'
const fs = require('fs')
let mainBundleFile = ''

const app = express()
app.use(cookieParser())
//set up template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views/'))

//var urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json()
app.use(jsonParser)
//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static('public'))

if (config.get('developmentOptions.webpack.enabled')) {
  enableWebpackHotModuleReplacement(app, config.get('developmentOptions.webpack.silent'))
  mainBundleFile = 'bundle.js'
} else {
  // using sync because it shouldn't slow down the start up by a measurable amount and will eliminate a potential race condition at launch
  mainBundleFile = fs.readFileSync(path.join(__dirname, './public/build/main.txt'), 'utf-8') //eslint-disable-line no-sync
}

const metaVariables = {
  description:
    "We support America's small businesses. The SBA connects entrepreneurs with lenders and funding to help them plan, start and grow their business.",
  title: 'Small Business Administration'
}

import { findNodeIdByUrl } from './service/url-redirect.js'
app.use(function(req, res, next) {
  // handle Accept-Language header
  req.preferredLanguage = accepts(req).languages()[0] //eslint-disable-line no-param-reassign
  const sessionCookie = _.find(_.keys(req.cookies), key => {
    return _.startsWith(key, 'SSESS')
  })
  let hasSessionCookie = false
  if (sessionCookie) {
    hasSessionCookie = true
    if (req.cookies) {
      req.sessionInfo = req.cookies[sessionCookie] //eslint-disable-line no-param-reassign
      console.log('Session info: ', req.sessionInfo)
    }
  }
  const requestPath = req.path
  const requestPathWithoutTraillingSlack =
    requestPath && requestPath.length > 1 ? _.trimEnd(requestPath, '/') : requestPath
  findNodeIdByUrl(requestPathWithoutTraillingSlack)
    .then(({ nodeId, langCode }) => {
      let responseStatus = HttpStatus.OK
      if (!nodeId && config.get('features.true404')) {
        responseStatus = HttpStatus.NOT_FOUND
      }

      const clientConfig = {
        counsellorCta: config.get('counsellorCta.nodeId'),
        debug: config.get('developmentOptions.client.logging'),
        geoLocator: config.get('features.geoLocator'),
        googleAnalytics: config.get('googleAnalytics'),
        googleMapsApiKey: config.get('googleMapsApiKey'),
        govdelivery: config.get('govdelivery.popupEnabled'),
        isUserLoggedIn: hasSessionCookie || false,
        katanaRedirectPaths: config.get('nginx.katanaRedirectPaths').split('|'),
        pressRelease: config.get('features.pressRelease'),
        responseStatus: responseStatus,
        sbaOfficeNames: config.get('features.office.sbaOfficeNames'),
        searchUrl: config.get('features.searchUrl'),
        showSbic: config.get('features.showSbic'),
        localAssistMenuHeight: config.get('features.localAssistMenuHeight')
      }
      req.sessionAndConfig = clientConfig //eslint-disable-line no-param-reassign
      req.nodeId = nodeId //eslint-disable-line no-param-reassign

      // Spanish browser language setting and Spanish url gets priority
      if (
        (langCode && langCode.startsWith('es')) ||
        (req.preferredLanguage && req.preferredLanguage.startsWith('es'))
      ) {
        req.preferredLanguage = 'es' //eslint-disable-line no-param-reassign
      } else {
        req.preferredLanguage = 'en' //eslint-disable-line no-param-reassign
      }

      next()
    })
    .catch(next)
})

app.use(function(req, res, next) {
  console.log('Received request for ' + req.originalUrl)
  next()
})

app.get('/health', (req, res, next) => {
  res.status(HttpStatus.OK).send()
})

import * as sizeStandardsController from './controllers/size-standards.js'
app.get('/naics', sizeStandardsController.getNaics)
app.get('/naics/:id', sizeStandardsController.getNaicsById)
app.get('/naics/:id/:property', sizeStandardsController.getNaicsPropertyById)
app.get('/isSmallBusiness', sizeStandardsController.determineIfSmallBusiness)

app.get('/api/content/counselors-redirect.json', function(req, res) {
  const zipStr = 'zip:' + req.query.zip + ':distance:50'
  zlib.deflate(zipStr, function(err, buffer) {
    if (err) {
      throw new Error(err)
    }
    const url = '/tools/local-assistance/map/filter/'
    const encodedUrl = url + buffer.toString('hex')
    res.send({
      redirectTo: encodedUrl
    })
  })
})

// this is only reached in local development where the nginx proxy is not present
app.post('/api/feedback', (req, res, next) => {
  console.log('Saving feedback', req.body)
  res.status(HttpStatus.OK).json({
    message:
      'Development Message: It worked.  (In the real system, this request would be forwarded by the nginx proxy to the feedback lambda'
  })
})

import * as resourceCenterProfileController from './controllers/resource-center-profile.js'
app.post(
  '/actions/resourceCenterProfile',
  jsonParser,
  resourceCenterProfileController.handleProfileSubmission
)
app.get('/api/content/resourceCenterProfile.json', resourceCenterProfileController.retrieveProfiles)

import * as lincCounselorController from './controllers/linc-counselor.js'
app.get('/api/content/counselors-by-location.json', lincCounselorController.getCounselorsByLocation)

import { getUserRoles } from './controllers/user-roles.js'
app.get('/api/content/:userId/roles.json', getUserRoles)

import { getDrupalUserEmail } from './controllers/user-email.js'
app.get('/api/content/:userId/email.json', getDrupalUserEmail)

import { registerUserForNewsletter } from './controllers/newsletter-registration.js'
app.get('/api/content/newsletter-registration.json', registerUserForNewsletter)

import * as SbicContactsCsv from './controllers/sbic-contacts-csv.js'
app.get('/api/content/sbic-contacts.csv', SbicContactsCsv.downloadCsv)

import { fetchContentById, fetchContentByType } from './controllers/content.js'
app.get('/api/content/:type/:id.json', fetchContentById)
app.get('/api/content/:type.json', fetchContentByType)

import { handleUrlRedirect } from './controllers/url-redirect.js'
app.get('/api/content', handleUrlRedirect)

import { fetchNewUrlByOldUrl } from './service/drupal-url-redirect.js'
import { findMostRecentUrlRedirect } from './service/url-redirect.js'
app.get(['/', '/*'], function(req, res, next) {
  const pugVariables = _.merge({}, metaVariables, {
    // default to "en" for lang codes that are not "es"
    langOverride: req.preferredLanguage,
    nodeId: req.nodeId,
    config: JSON.stringify(req.sessionAndConfig),
    cdnPathFromBackend: '"' + config.get('publicPath') + '"',
    optimizeContainerId: config.get('googleAnalytics.optimizeContainerId'),
    tagManagerAccountId: config.get('googleAnalytics.tagManagerAccountId'),
    foreseeEnabled: config.get('foresee.enabled'),
    foreseeEnvironment: config.get('foresee.environment'),
    mainBundleFile: mainBundleFile
  })
  const handleRedirects = async function() {
    const url = req.url
    let redirectUrl
    let redirectCode

    // this section of code could be refactored since both types of redirects return the
    // same HTTP 302 now; however, it might be worth leaving it in case we elect to
    // change them separately in the future (more than likely the first one with be changed
    // to HTTP 301 in the future)
    if (config.get('features.urlRedirect.enabled')) {
      redirectUrl = await findMostRecentUrlRedirect(url)
      redirectCode = HttpStatus.MOVED_TEMPORARILY
    }
    if (!redirectUrl && config.get('features.drupalRedirect.enabled')) {
      redirectUrl = await fetchNewUrlByOldUrl(url)
      redirectCode = HttpStatus.MOVED_TEMPORARILY
    }
    if (redirectUrl && redirectUrl !== url) {
      console.log('Redirecting to ' + redirectUrl)
      res.redirect(redirectCode, redirectUrl)
    } else {
      res.status(req.sessionAndConfig.responseStatus).render('main', pugVariables)
    }
  }

  handleRedirects().catch(next)
})

// development error handler
// will print stacktrace
if (config.get('developmentOptions.webpack.enabled')) {
  addDevelopmentErrorHandler(app)
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    // eslint-disable-line no-unused-vars
    if (err) {
      console.log(err)
      if (req.xhr) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          error: 'Something went wrong! Oh no!'
        })
      } else {
        res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        res.render('error', {
          message: err.message,
          error: {}
        })
      }
    }
  })
}

module.exports = app
