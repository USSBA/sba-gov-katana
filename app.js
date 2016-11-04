/*application entry point*/

var express = require('express');

var app = express();

//set up template engine
app.set('view engine', 'pug');

//set up static files handler not route specific but will route to any static files inside public and its subfolders
app.use(express.static('./public'));

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//listen to port
app.listen(3000);
console.log('Express server listening on port 3000');
