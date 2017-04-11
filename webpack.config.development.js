var path = require('path');
var webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const sharedConfig = require('./webpack.config.shared.js');

module.exports = function(env) {
  return webpackMerge(sharedConfig(), {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
      'bootstrap-loader',
      'babel-polyfill',
      './src/client/components/entry-dev.jsx'
    ],
    output: {
      path: path.join(__dirname, 'public', "build"),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  });
};
