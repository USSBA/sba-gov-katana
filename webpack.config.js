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
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),


    ],
    module: {
        rules: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /.*slick.*\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&',
            exclude: [
                path.resolve(__dirname, "node_modules/slick-carousel"),
                path.resolve(__dirname, "node_modules/react-slick")
            ]
        }, {
            test: /.*slick.*\.scss$/,
            loader: 'style-loader!css-loader!sass-loader?modules&outputStyle=expanded&' + 'includePaths[]=' +
                (path.resolve(__dirname, './node_modules'))
        }, {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader?modules", "sass-loader?modules"],
            exclude: [
                path.resolve(__dirname, "node_modules/slick-carousel"),
                path.resolve(__dirname, "node_modules/react-slick")
            ]
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
            loader: 'file-loader?name=img/img-[hash:6].[ext]'
        }, {
            test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
            loader: 'imports-loader?jQuery=jquery'
        }]
    }
};
