/*application entry point*/


var path = require('path');
// var webpack = require('webpack');
import webpack from 'webpack';
var express = require('express');
var webpackconfig = require('./webpack.config');
var config = require('config');

var app = express();
var compiler = webpack(webpackconfig);



//set up template engine
app.set('view engine', 'pug');

//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static('./public'));
//
//
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackconfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*',function(req, res){
    res.sendFile(__dirname + '/src/index.html');
});

//listen to port
let port =  config.get('server.port');
app.listen(port);
console.log('Express server listening on port '+port);
