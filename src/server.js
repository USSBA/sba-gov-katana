//remove this when breaking server.js up into controllers -zandypants
import zlib from 'zlib';

/*Contains express server setup*/
var express = require('express');
var config = require('config');
var bodyParser = require('body-parser');

var app = express();

//set up template engine
app.set('view engine', 'pug');
app.set('views', './src/views')


//var urlEncodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();
//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static('./public'));


if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config');
    var compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

//app.use(sendError);

function sendError(err,req, res){
    var code = err.code;
    var message = err.message;
    res.writeHead(code, message, {'content-type': 'text/plain'});
    res.end(message);
    /*if(res.headersSent){
        return next(err);
    }
    res.status(406).send({error: err});*/
}

app.get('*', function(req, res) {
    res.render('main');
});

import matchController from 'match-controller.js';
app.post('/matchFormData', jsonParser, matchController.matchController);

import confirmationController from 'confirmation-controller';
app.get('confirmEmail', confirmationController.confirmEmail);


app.post('/matchLocalAssistants', jsonParser, function(req, res){
    let zipStr = "zip:" + req.body.zipcode + ":distance:50";
        zlib.deflate(zipStr, function(err, buffer){
            if(err) {
                return callback(err)
            }
            let url = "https://www.sba.gov/tools/local-assistance/map/filter/"
            let encodedUrl = url + buffer.toString("hex")
            res.send({redirectTo: encodedUrl})
        })
});


app.post('/matchCounselors', jsonParser, function(req, res){
   console.log(req.body.zipcode)
});

//listen to port
let port = config.get('server.port');
app.listen(port);
console.log('Express server listening on port ' + port);
