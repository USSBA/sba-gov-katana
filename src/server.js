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
import axios from 'axios'

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
    // eslint-disable-next-line complexity
    .then(({ nodeId, langCode }) => {
      let responseStatus = HttpStatus.OK
      if (!nodeId && config.get('features.true404')) {
        responseStatus = HttpStatus.NOT_FOUND
      }

      const clientConfig = {
        counselorCta: config.get('counselorCta.nodeId'),
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
      if (langCode === 'es' || (req.preferredLanguage && req.preferredLanguage.startsWith('es'))) {
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

import * as SbicContactsCsv from './controllers/sbic-contacts-csv.js'
app.get('/api/content/sbic-contacts.csv', SbicContactsCsv.downloadCsv)

// this is only reached in local development where the nginx proxy is not present
app.post('/api/feedback', (req, res, next) => {
  console.log('Saving feedback', req.body)
  res.status(HttpStatus.OK).json({
    message:
      'Development Message: It worked.  (In the real system, this request would be forwarded by the nginx proxy to the feedback lambda'
  })
})

function fetchExternalContent(endpoint, stage, reqPath, queryParams, res, responseType) {
  axios
    .get('https://' + path.join(endpoint, stage, reqPath), {
      params: queryParams,
      responseType: responseType,
      // eslint-disable-next-line arrow-body-style
      transformResponse: rawReq => rawReq
    })
    .then(result => {
      res
        .set('Content-Type', responseType === 'json' ? 'application/json' : result.headers['Content-Type'])
        .status(result.status)
        .send(result.data)
    })
    .catch(err => {
      console.error(err)
      res.status(err.response.status).send(err.response.data)
    })
}

app.get('/actions/misc/*', (req, res, next) => {
  fetchExternalContent(config.get('miscapi.endpoint'), 'latest', req.path, req.query, res, 'json')
})
app.get('/api/content/*', (req, res, next) => {
  fetchExternalContent(config.get('content.endpoint'), 'Prod', req.path, req.query, res, 'json')
})

if (config.get('developmentOptions.webpack.enabled')) {
  app.get('/sites/default/files/*', (req, res, next) => {
    const url = `https://${config.get('developmentOptions.assets.endpoint')}${req.path}`
    console.log('Calling ' + url)
    axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer'
    })
      .then(function(response) {
        var headers = { 'Content-Type': response.headers['content-type'] }
        res.writeHead(HttpStatus.OK, headers)
        res.end(response.data, 'binary')
      })
      .catch(function(error) {
        res.send('error:' + error)
      })
  })
}

import { fetchNewUrlByOldUrl } from './service/drupal-url-redirect.js'
import { findMostRecentUrlRedirect } from './service/url-redirect.js'
app.get(['/', '/*'], function(req, res, next) {
  const pugVariables = _.merge({}, metaVariables, {
    langOverride: req.preferredLanguage,
    nodeId: req.nodeId,
    config: JSON.stringify(req.sessionAndConfig),
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
