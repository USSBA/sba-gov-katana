const path = require('path')
const webpack = require('webpack')
// Rather than potentially deleting the node module for not being required directly anywhere,
// we require css loader here, since css loader is used by webpack.  
require('css-loader')

const sassResources = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      path.join(__dirname, 'src', 'client', 'styles', 'global.scss'),
      path.join(__dirname, 'src', 'client', 'styles', 'base', '_mixins.scss'),
      path.join(__dirname, 'src', 'client', 'styles', 'base', '_variables.scss')
    ]
  }
}

module.exports = {
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&',
        exclude: [
          path.resolve(__dirname, 'node_modules/react-select-v1'),
          path.resolve(__dirname, 'src/client/components/atoms/multiselect/react-select-helpers.css')
        ]
      },
      {
        test: /.*react-select.*\.css$/,
        loader:
        'style-loader!css-loader?outputStyle=expanded&' +
        'includePaths[]=' +
        path.resolve(__dirname, './node_modules')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, 'src', 'client', 'styles')]
            }
          },
          sassResources
        ],
        exclude: [path.resolve(__dirname, 'src/client/styles/common/collapse.scss')]
      },
      {
        test: /.*collapse\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, 'src', 'client', 'styles')]
            }
          },
          sassResources
        ]
      }
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'public/assets'),
      atoms: path.resolve(__dirname, 'src/client/components/atoms'),
      styles: path.resolve(__dirname, 'src/client/styles'),
      molecules: path.resolve(__dirname, 'src/client/components/molecules'),
      organisms: path.resolve(__dirname, 'src/client/components/organisms')
    },
    extensions: ['*', '.js', '.jsx']
  }
}
