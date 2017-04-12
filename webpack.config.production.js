var path = require('path');
var webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const sharedConfig = require('./webpack.config.shared.js');

module.exports = function(env) {
  return webpackMerge(sharedConfig(), {
    devtool: 'cheap-module-source-map',
    entry: [
      'bootstrap-loader',
      'babel-polyfill',
      './src/client/components/entry.jsx'
    ],
    output: {
      path: path.join(__dirname, 'public', "build"),
      filename: 'bundle.js',
      publicPath: '/public/'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.optimize.OccurrenceOrderPlugin(true)
    ],
    module: {
      rules: [{
        test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]'
      }]
    }
  });
}
