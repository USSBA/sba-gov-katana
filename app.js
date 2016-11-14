/*application entry point*/


var path = require('path');
// var webpack = require('webpack');
import webpack from 'webpack';
var express = require('express');
var config = require('./webpack.config');


var app = express();
var compiler = webpack(config);



//set up template engine
app.set('view engine', 'pug');

//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static('./public'));
//
//
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//listen to port
app.listen(3000);
console.log('Express server listening on port 3000');
