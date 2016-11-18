var path = require('path');
var webpack = require('webpack');


module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './src/client/components/main.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.jsx?$/,
            loaders: [ 'babel'],
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style!css?modules'
        },{
            test: /\.scss$/,
            loaders: ["style", "css?modules", "sass?modules"]
        },{
            test: /\.json$/,
            loader: 'json'
        }]
    }
};