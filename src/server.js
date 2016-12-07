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

app.post('/matchFormData', jsonParser, function(req, res){
    console.log(req.body);
    //required fields
    //contactInfoData.contactFullName
    //contactInfoData.contactPhoneNumber
    //contactInfoData.contactEmailAddress
    //businessInfoData.businessInfoName
    //businessInfoData.businessInfoZipcode
    //businessInfoData.businessInfoType
    //additionalInfoData.industryExp
    //loanData.loanAmount
    //loanData.loanDescription

    if(!("contactFullName" in req.body.contactInfoData)){
        //res.statusCode = 406;
        //res.statusText = "Contact Full Name is required.";
        //res.status(406).send({error: "Contact Full Name is required."});
        //res.status(406).send('Contact Full Name is required.');
        //res.send("Contact Full Name is required.");
        //err.message = "Contact Full Name is required.";
        //res.status(406).json({message: 'Contact Full Name is required.'});
        //res.writeHead(406, 'Contact Full Name is required.', {'content-type' : 'text/plain'});
        //res.end("Contact Full Name is required.");
        console.log("Error: Contact Full Name is required.");
        var err = new Error("Contact Full Name is required.");
        err.code = 406;
        sendError(err, req, res);
        return;

        //return next(err);
    }
    if(!("contactPhoneNumber" in req.body.contactInfoData)){
        console.log("Error: Contact Phone Number is required.");
        var err = new Error("Contact Phone Number is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("contactEmailAddress" in req.body.contactInfoData)){
        console.log("Error: Contact Email Address is required.");
        var err = new Error("Contact Email Address is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("businessInfoName" in req.body.businessInfoData)){
        console.log("Error: Business Name is required.");
        var err = new Error("Business Name is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("businessInfoZipcode" in req.body.businessInfoData)){
        console.log("Error: Business Zip Code is required.");
        var err = new Error("Business Zip Code is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("businessInfoType" in req.body.businessInfoData)){
        console.log("Error: Business Type is required.");
        var err = new Error("Business Type is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("industryExp" in req.body.additionalInfoData)){
        console.log("Error: Industry Experience is required.");
        var err = new Error("Industry Experience is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("loanAmount" in req.body.loanData)){
        console.log("Error: Loan Amount is required.");
        var err = new Error("Loan Amount is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("loanDescription" in req.body.loanData)){
        console.log("Error: Loan Description is required.");
        var err = new Error("Loan Description is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    res.send("Data received successfully.");
});

//listen to port
let port = config.get('server.port');
app.listen(port);
console.log('Express server listening on port ' + port);
