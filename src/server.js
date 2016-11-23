/*Contains express server setup*/
var express = require('express');
var config = require('config');

var app = express();

//set up template engine
app.set('view engine', 'pug');
app.set('views', './src/views')

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

app.get('*', function(req, res) {
    res.render('main');
});

//listen to port
let port = config.get('server.port');
app.listen(port);
console.log('Express server listening on port ' + port);
