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

app.use(sendError);

function sendError(err, req, res, next){
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
/*    if(req.body.contactInfoData.contactFullName.isEmpty){
        throwError("Contact Full Name is required.");
    }*/
    if(!("contactFullName" in req.body.contactInfoData)){
        //res.statusCode = 406;
        //res.statusText = "Contact Full Name is required.";
        //res.status(406).send({error: "Contact Full Name is required."});
        //res.status(406).send('Contact Full Name is required.');
        //res.send("Contact Full Name is required.");
        //err.message = "Contact Full Name is required.";
        //sendError(err, req, res, next);
        //res.status(406).json({message: 'Contact Full Name is required.'});
        res.writeHead(406, 'Contact Full Name is required.', {'content-type' : 'text/plain'});
        res.end("Contact Full Name is required.");
        return;

        /*var err = new Error("Contact Full Name is required.");
        err.code = 406;
        return next(err);*/
    }
    if(req.body.contactInfoData.contactPhoneNumber.isEmpty){
        throwError("Contact Phone Number is required.");
    }
    if(req.body.contactInfoData.contactEmailAddress.isEmpty){
        throwError("Contact Email Address is required.");
    }
    if(req.body.businessInfoData.businessInfoName.isEmpty){
        throwError("Business Name is required.");
    }
    if(req.body.businessInfoData.businessInfoZipcode.isEmpty){
        throwError("Business Zip Code is required.");
    }
    if(req.body.businessInfoData.businessInfoType.isEmpty){
        throwError("Business Type is required.");
    }
    if(req.body.additionalInfoData.industryExp.isEmpty){
        throwError("Industry Experience is required.");
    }
    if(req.body.loanData.loanAmount.isEmpty){
        throwError("Loan Amount is required.");
    }
    if(req.body.loanData.loanDescription.isEmpty){
        throwError("Loan Description is required.");
    }
    res.send("Data received successfully.");
});

//listen to port
let port = config.get('server.port');
app.listen(port);
console.log('Express server listening on port ' + port);
