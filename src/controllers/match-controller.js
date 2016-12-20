function handleLenderMatchSubmission(req, res){
    console.log(req.body);
    //required fields
    //contactInfoData.contactFullName
    //contactInfoData.contactPhoneNumber
    //contactInfoData.contactEmailAddress
    //businessInfoData.businessInfoName
    //businessInfoData.businessInfoZipcode
    //industryInfoData.industryType
    //additionalInfoData.industryExp
    //loanData.loanAmount
    //loanData.loanDescription



    if(("contactSecondaryEmailAddress" in req.body.contactInfoData)){
        console.log('honeypot form element was filled.  This was probably submitted by a bot.');

    }
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
    if(!("industryType" in req.body.industryInfoData)){
        console.log("Error: Industry Type is required.");
        var err = new Error("Industry Type is required.");
        err.code = 406;
        sendError(err, req, res);
        return;
    }
    if(!("industryExperience" in req.body.industryInfoData)){
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
}
