const path = require('path')
const _ = require('lodash')
/*Contains express server setup*/
const express = require('express')
const accepts = require('accepts')
const config = require('config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const httpStatus = require('http-status-codes')
const { enableWebpackHotModuleReplacement, addDevelopmentErrorHandler } = require('./util/dev.js')
const fs = require('fs')
let mainBundleFile = ''
const axios = require('axios')

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

const { findNodeIdByUrl } = require('./service/url-redirect.js')
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
    .then(({ nodeId, langCode, type }) => {
      let responseStatus = httpStatus.OK
      if (!nodeId && config.get('features.true404')) {
        responseStatus = httpStatus.NOT_FOUND
      }

      const clientConfig = {
        counselorCta: config.get('counselorCta.nodeId'),
        debug: config.get('developmentOptions.client.logging'),
        geoLocator: config.get('features.geoLocator'),
        googleAnalytics: config.get('googleAnalytics'),
        googleMapsApiKey: config.get('googleMapsApiKey'),
        govdelivery: config.get('govdelivery.popupEnabled'),
        isUserLoggedIn: hasSessionCookie || false,
        pressRelease: config.get('features.pressRelease'),
        responseStatus: responseStatus,
        sbaOfficeNames: config.get('features.office.sbaOfficeNames'),
        searchUrl: config.get('features.searchUrl'),
        showSbic: config.get('features.showSbic'),
        localAssistMenuHeight: config.get('features.localAssistMenuHeight')
      }
      req.sessionAndConfig = clientConfig //eslint-disable-line no-param-reassign
      req.nodeId = nodeId //eslint-disable-line no-param-reassign
      req.type = type //eslint-disable-line no-param-reassign

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
  res.status(httpStatus.OK).send()
})

const sbicContactsCsv = require('./controllers/sbic-contacts-csv.js')
app.get('/api/content/sbic-contacts.csv', sbicContactsCsv.downloadCsv)

// this is only reached in local development where the nginx proxy is not present
app.post('/api/feedback', (req, res, next) => {
  console.log('Saving feedback', req.body)
  res.status(httpStatus.OK).json({
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
app.get('/api/content/search/*', (req, res, next) => {
  fetchExternalContent(config.get('content.endpoint'), '', req.path, req.query, res, 'json')
})
app.get('/api/content/*', (req, res, next) => {
  fetchExternalContent(config.get('content.cloudfront'), '', req.path, req.query, res, 'json')
})
app.get('/naics', (req, res, next) => {
  fetchExternalContent(config.get('sizestandards.endpoint'), 'latest', req.path, req.query, res, 'json')
})
app.get('/naics/:id', (req, res, next) => {
  fetchExternalContent(config.get('sizestandards.endpoint'), 'latest', req.path, req.query, res, 'json')
})
app.get('/naics/:id/:property', (req, res, next) => {
  fetchExternalContent(config.get('sizestandards.endpoint'), 'latest', req.path, req.query, res, 'json')
})
app.get('/isSmallBusiness', (req, res, next) => {
  fetchExternalContent(config.get('sizestandards.endpoint'), 'latest', req.path, req.query, res, 'json')
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
        res.writeHead(httpStatus.OK, headers)
        res.end(response.data, 'binary')
      })
      .catch(function(error) {
        res.send('error:' + error)
      })
  })
}

const { fetchNewUrlByOldUrl } = require('./service/drupal-url-redirect.js')
const { findMostRecentUrlRedirect } = require('./service/url-redirect.js')

async function getMetaVariables(nodeId, type = 'node', request) {
  let description = config.get('meta.description')
  let title = config.get('meta.title')

  // This will only allow valid nodeId's to make an axios call.
  // Currently negative nodeId numbers are associated to pages without a nodeId,
  // so we can regard negative nodeId's as invalid.
  if (request.substring(0, 7) === '/event/') {
    const jsonContent = await axios.get(
      `https://${config.get('server.fqdn')}/api/content/search/event/${nodeId}.json`
    )
    if (jsonContent.data) {
      description = jsonContent.data.summary
      title = jsonContent.data.title
    }
  } else if (nodeId > 0) {
    const jsonContent = await axios.get(
      `https://${config.get('content.cloudfront')}/api/content/${nodeId}.json`
    )
    if (jsonContent.data) {
      description = jsonContent.data.summary
      title = jsonContent.data.title
    }
  }

  return {
    description,
    title
  }
}

app.get(['/', '/*'], async function(req, res, next) {
  let metaVariables
  try {
    metaVariables = await getMetaVariables(req.nodeId, req.type, req.url)

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
        redirectCode = httpStatus.MOVED_TEMPORARILY
      }
      if (!redirectUrl && config.get('features.drupalRedirect.enabled')) {
        redirectUrl = await fetchNewUrlByOldUrl(url)
        redirectCode = httpStatus.MOVED_TEMPORARILY
      }
      if (redirectUrl && redirectUrl !== url) {
        console.log('Redirecting to ' + redirectUrl)
        res.redirect(redirectCode, redirectUrl)
      } else {
        res.status(req.sessionAndConfig.responseStatus).render('main', pugVariables)
      }
    }

    return handleRedirects()
  } catch (e) {
    return next(e)
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
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: 'Something went wrong! Oh no!'
        })
      } else {
        res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
        res.render('error', {
          message: err.message,
          error: {}
        })
      }
    }
  })
}

module.exports = app
