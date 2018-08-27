var path = require('path')
var webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const sharedConfig = require('./webpack.config.shared.js')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var CompressionPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = function(env) {
  return webpackMerge(sharedConfig(), {
    devtool: 'cheap-module-source-map',
    entry: ['babel-polyfill', './src/client/components/entry.jsx'],
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new UglifyJSPlugin({
        extractComments: true,
        uglifyOptions: {
          compress: {
            drop_console: false
          }
        }
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
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
