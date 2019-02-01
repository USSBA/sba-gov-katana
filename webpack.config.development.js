const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const sharedConfig = require('./webpack.config.shared')

module.exports = function (env) {
  return webpackMerge.smartStrategy({
    'module.rules.use': 'prepend'
  })(sharedConfig, {
    devtool: 'eval',
    entry: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/client/components/entry-dev.jsx'
    ],
    output: {
      path: path.join(__dirname, 'public', 'build'),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new HardSourceWebpackPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          ],
          exclude: [path.resolve(__dirname, 'src/client/styles/common/collapse.scss')]
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
          loader: 'file-loader?name=img/img-[hash:6].[ext]'
        }
      ]
    }
  });
};
