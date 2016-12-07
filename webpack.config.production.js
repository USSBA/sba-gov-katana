var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        'bootstrap-loader',
        'babel-polyfill',
        './src/client/components/main.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public', "build"),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
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
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules'
        }, {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader?modules", "sass-loader?modules"]
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.gif$/,
            loader: "url-loader?mimetype=image/png"
        }, {
            test: /\.(woff|woff2|ttf|otf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            loader: 'url-loader?limit=100000'
        }, {
            test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
            loader: 'imports-loader?jQuery=jquery'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
};
