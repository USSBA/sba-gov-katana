var path = require('path');
var webpack = require('webpack');


var sassResources = {
  loader: 'sass-resources-loader',
  options: {
    resources: [path.join(__dirname, 'src', 'client', 'styles', "global.scss"), path.join(__dirname, 'src', 'client', 'styles', 'base', "_variables.scss")]
  }
};

module.exports = function(styleNamingFormat) {
  return {
    module: {
      rules: [{
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
            path.resolve(__dirname, "src/client/components/atoms/multiselect/react-select-helpers.css")
          ]
        },
        {
          test: /.*react-select.*\.css$/,
          loader: 'style-loader!css-loader?outputStyle=expanded&' + 'includePaths[]=' +
            (path.resolve(__dirname, './node_modules'))
        },
        {
          test: /\.scss$/,
          use: ["style-loader", {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: styleNamingFormat || '[hash:base64]'
            }
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.join(__dirname, 'src', 'client', 'styles')
              ]
            }
          }, sassResources],
          exclude: [
            path.resolve(__dirname, "src/client/styles/common/collapse.scss")
          ]
        },
        {
          test: /.*collapse\.scss$/,
          loaders: ["style-loader", "css-loader", {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.join(__dirname, 'src', 'client', 'styles')
              ]
            }
          }, sassResources]
        },
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    }
  };
};
