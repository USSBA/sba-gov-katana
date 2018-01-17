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
}

if (config.get('newrelic.enabled')) {
  console.log('Starting NewRelic')
  require('newrelic') // eslint-disable-line global-require
}

const metaVariables = {
  description:
    "We support America's small businesses. The SBA connects entrepreneurs with lenders and funding to help them plan, start and grow their business.",
  title: 'Small Business Administration'
}

app.use(function(req, res, next) {
  // handle Accept-Language header
  req.preferredLanguage = accepts(req).languages()[0] //eslint-disable-line no-param-reassign
  const sessionCookie = _.find(_.keys(req.cookies), key => {
    return _.startsWith(key, 'SSESS')
  })
  console.log('Session cookie: ', sessionCookie)
  let hasSessionCookie = false
  if (sessionCookie) {
    hasSessionCookie = true
    if (req.cookies) {
      req.sessionInfo = req.cookies[sessionCookie] //eslint-disable-line no-param-reassign
      console.log('Session info: ', req.sessionInfo)
    }
  }
  const clientConfig = {
    isUserLoggedIn: hasSessionCookie || false,
    googleAnalytics: config.get('googleAnalytics'),
    debug: config.get('developmentOptions.client.logging'),
    govdelivery: config.get('govdelivery.popupEnabled'),
    showSbic: config.get('features.showSbic'),
    moon: config.get('features.moon'),
    searchUrl: config.get('features.searchUrl'),
    forPartners: config.get('features.forPartners')
  }
  req.sessionAndConfig = clientConfig //eslint-disable-line no-param-reassign
  next()
})

app.use(function(req, res, next) {
  console.log('Received request for ' + req.originalUrl)
  next()
})

import * as sizeStandardsController from './controllers/size-standards.js'
app.get('/naics', sizeStandardsController.getNaics)
app.get('/naics/:id', sizeStandardsController.getNaicsById)
app.get('/naics/:id/:property', sizeStandardsController.getNaicsPropertyById)
app.get('/isSmallBusiness', sizeStandardsController.determineIfSmallBusiness)

import * as lenderMatchController from './controllers/lender-match-controller.js'
app.post('/lendermatch/matchFormData', jsonParser, lenderMatchController.handleLenderMatchSubmission)
app.get('/actions/lendermatch/confirmEmail', lenderMatchController.handleEmailConfirmation)
app.post('/lendermatch/resend', jsonParser, lenderMatchController.handleResendEmailConfirmation)
app.get('/actions/lendermatch/resetPassword', lenderMatchController.resetPassword)
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

import * as feedbackController from './controllers/feedback-controller.js'
app.post('/actions/feedback', feedbackController.handleFeedback)
app.get('/api/content/feedback.csv', feedbackController.retrieveFeedback)
app.put('/actions/feedback/:id/text', jsonParser, feedbackController.handleFeedbackText)

import * as resourceCenterProfileController from './controllers/resource-center-profile.js'
app.post(
  '/actions/resourceCenterProfile',
  jsonParser,
  resourceCenterProfileController.handleProfileSubmission
)
app.get('/api/content/resourceCenterProfile.json', resourceCenterProfileController.retrieveProfiles)

import * as cacheController from './controllers/cache.js'
app.get('/actions/clearCache/collection/:type.json', cacheController.clearContentCollectionCacheByType)
app.get('/actions/clearCache/:type/:id.json', cacheController.clearContentCacheById)
app.get('/actions/clearCache/:type.json', cacheController.clearContentCacheByType)
app.delete('/api/content/collection/:type.json', cacheController.clearContentCollectionCacheByType)
app.delete('/api/content/:type/:id.json', cacheController.clearContentCacheById)
app.delete('/api/content/:type.json', cacheController.clearContentCacheByType)

import * as lincCounselorController from './controllers/linc-counselor.js'
app.get('/api/content/counselors-by-location.json', lincCounselorController.getCounselorsByLocation)

import { getUserRoles } from './controllers/user-roles.js'
app.get('/api/content/:userId/roles.json', getUserRoles)

import { getDrupalUserEmail } from './controllers/user-email.js'
app.get('/api/content/:userId/email.json', getDrupalUserEmail)

import { registerUserForNewsletter } from './controllers/newsletter-registration.js'
app.get('/api/content/newsletter-registration.json', registerUserForNewsletter)

import { fetchContentById, fetchContentByType } from './controllers/content.js'
app.get('/api/content/:type/:id.json', fetchContentById)
app.get('/api/content/:type.json', fetchContentByType)

import { fetchNewUrlByOldUrl } from './service/drupal-url-redirect.js'

app.get(['/', '/*'], function(req, res, next) {
  const pugVariables = _.merge({}, metaVariables, {
    lang: req.preferredLanguage,
    config: JSON.stringify(req.sessionAndConfig),
    optimizeContainerId: config.get('googleAnalytics.optimizeContainerId'),
    tagManagerAccountId: config.get('googleAnalytics.tagManagerAccountId'),
    foreseeEnabled: config.get('foresee.enabled'),
    foreseeEnvironment: config.get('foresee.environment')
  })
  const url = req.url
  if (config.get('features.drupalRedirect.enabled')) {
    fetchNewUrlByOldUrl(url).then(newUrl => {
      if (newUrl) {
        console.log('Redirecting to ' + newUrl)
        res.redirect(newUrl)
      } else {
        res.render('main', pugVariables)
      }
    })
  } else {
    res.render('main', pugVariables)
  }
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

//listen to port
const port = config.get('server.port')
app.listen(port)
console.log('Express server listening on port ' + port)
