var path = require('path');
var webpack = require('webpack');

module.exports = {
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
    loaders: [{
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&',
        exclude: [
          path.resolve(__dirname, "node_modules/react-select"),
          path.resolve(__dirname, "src/client/components/atoms/react-select-helpers.css")
        ]
      },
      {
        test: /.*react-select.*\.css$/,
        loader: 'style-loader!css-loader?outputStyle=expanded&' + 'includePaths[]=' +
          (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.scss$/,
        se: ["style-loader", "css-loader?modules", {
          loader: "sass-loader",
          options: {
            includePaths: [
              path.join(__dirname, 'src', 'client', 'styles')
            ]
          }
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: [path.join(__dirname, 'src', 'client', 'styles', "global.scss"), path.join(__dirname, 'src', 'client', 'styles', "variables.scss")]
          },
        }],
        exclude: [
          path.resolve(__dirname, "src/client/styles/common/collapse.scss"),
          path.resolve(__dirname, "src/client/components/atoms/checkbox.scss")
        ]
      },
      {
        test: /.*collapse\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }, {
        test: /.*checkbox\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }, {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
        loader: 'url-loader?limit=400000'
      }, {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      }
    ]
  }
};
