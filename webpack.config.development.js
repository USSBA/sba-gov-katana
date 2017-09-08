var path = require('path');
var webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const sharedConfig = require('./webpack.config.shared.js');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(env) {
  return webpackMerge(sharedConfig('[path][name]__[local]--[hash:base64:5]'), {
    devtool: 'eval',
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/client/components/entry-dev.jsx'
    ],
    output: {
      path: path.join(__dirname, 'public', "build"),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    plugins: [
    //   new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/)
    ],
    module: {
      rules: [{
        test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]'
      }]
    }
  });
};
