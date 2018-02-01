import HttpStatus from 'http-status-codes'

export function enableWebpackHotModuleReplacement(app, silent) {
  console.log('Enabling Webpack')
  // eslint-disable-next-line global-require
  const webpack = require('webpack')
  // eslint-disable-next-line global-require
  const webpackConfig = require('../../webpack.config.development')()
  const compiler = webpack(webpackConfig)
  app.use(
    // eslint-disable-next-line global-require
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      noInfo: silent
    })
  )

  // eslint-disable-next-line global-require
  app.use(require('webpack-hot-middleware')(compiler))
}

export function addDevelopmentErrorHandler(app) {
  app.use(function(err, req, res, next) {
    // eslint-disable-line no-unused-vars
    if (err) {
      console.error(err)
      if (req.xhr) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          error: 'Something went wrong! Oh no!'
        })
      } else {
        res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        res.render('error', {
          message: err.message,
          error: err
        })
      }
    }
  })
}
