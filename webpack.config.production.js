const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const sharedConfig = require('./webpack.config.shared')

module.exports = function(env) {
  return webpackMerge(sharedConfig(), {
    devtool: 'no-source-map',
    entry: ['@babel/polyfill', './src/client/components/entry.jsx'],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          extractComments: true,
          // This is specific to CircleCI, which gives us 36 cores, and our current build time of ~20s
          parallel: 4,
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    output: {
      path: path.join(__dirname, 'public', 'build'),
      filename: '[hash:20].bundle.js',
      publicPath: '/build/'
    },
    plugins: [
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   reportFilename: 'report.html',
      //   generateStatsFile: true,
      //   statsFilename: 'stats.json'
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: '[path].gz[query]',
        minRatio: 0.8,
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240
      })
    ],
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
          loader: 'url-loader?limit=3000'
        }
      ]
    }
  })
}
