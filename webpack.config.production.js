const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const sharedConfig = require('./webpack.config.shared')

const publicPath = '/build/'

module.exports = function (env) {
  return webpackMerge.smartStrategy({
    'module.rules.use': 'prepend'
  })(sharedConfig, {
    devtool: 'no-source-map',
    entry: ['@babel/polyfill', './src/client/components/entry.jsx'],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          extractComments: true,
          // This is specific to CircleCI, which gives us 36 cores, and our current build time of ~20s
          // parallel: 4,
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        }),
        new OptimizeCssAssetsPlugin()
      ]
    },
    output: {
      path: path.join(__dirname, 'public', 'build'),
      filename: '[hash:20].bundle.js',
      publicPath
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
      }),
      new MiniCssExtractPlugin({
        filename: "[hash:20].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath }
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:base64]'
              }
            }
          ],
          exclude: [path.resolve(__dirname, 'src/client/styles/common/collapse.scss')]
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
          loader: 'url-loader?limit=3000'
        }
      ]
    },
    stats: {
      // filter MiniCssExtractPlugin warnings
      warningsFilter: warn => warn.indexOf('Conflicting order between:') > -1
    }
  })
}
