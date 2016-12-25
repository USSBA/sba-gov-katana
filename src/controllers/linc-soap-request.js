
let request = require('request');
let xml2js = require('xml2js');
let DOMParser = require('xmldom').DOMParser;
let XMLSerializer = require('xmldom').XMLSerializer;

function loanProceedTypCd(loanDesc){
    return loanDesc.split(",").map(function(loanDescItem){
        const strLoanDesc = loanDescItem.trim(" ").toUpperCase();
        let retLoanDescCd = "";
        switch(strLoanDesc){
            case "PURCHASING PROPERTY":
                retLoanDescCd = "01";
                break;
            case "PURCHASING EQUIPMENT":
                retLoanDescCd = "02";
                break;
            case "REMODELING AN EXISTING LOCATION":
                retLoanDescCd = "03";
                break;
            case "REFINANCING/CONSOLIDATING DEBT":
                retLoanDescCd = "04";
                break;
            case "HIRING EMPLOYEES/STAFF":
                retLoanDescCd = "05";
                break;
            case "WORKING CAPITAL":
                retLoanDescCd = "06";
                break;
            case "PURCHASING INVENTORY":
                retLoanDescCd = "07";
                break;
            case "MARKETING/ADVERTISING":
                retLoanDescCd = "08";
                break;
            case "BUYING AN EXISTING BUSINESS":
                retLoanDescCd = "09";
                break;
            case "OTHER":
                retLoanDescCd = "99";
                break;
            case "BUSINESS TRAINING":
                retLoanDescCd = "10";
                break;
            case "DEVELOPING A PRODUCT":
                retLoanDescCd = "11";
                break;
            case "OPENING A NEW LOCATION":
                retLoanDescCd = "12";
                break;
            case "PARTICIPATING IN TRADE SHOW":
                retLoanDescCd = "13";
                break;
        }
        return retLoanDescCd;
    }).join();
}

function businessDtlTypCd(industryType){
    return industryType.split(",").map(function(industryTypeItem){
        const strIndustryType = industryTypeItem.trim(" ").toUpperCase();
        let retIndustryTypeCd = "";
        switch(strIndustryType){
            case "SERVICE":
                retIndustryTypeCd = "01";
                break;
            case "MANUFACTURING":
                retIndustryTypeCd = "02";
                break;
            case "WHOLESALE":
                retIndustryTypeCd = "03";
                break;
            case "RETAIL":
                retIndustryTypeCd = "04";
                break;
            case "RESTAURANT/BAR":
                retIndustryTypeCd = "05";
                break;
            case "HOTEL/MOTEL":
                retIndustryTypeCd = "06";
                break;
            case "AUTOMOTIVE/SERVICE STATION":
                retIndustryTypeCd = "07";
                break;
            case "OTHER":
                retIndustryTypeCd = "99";
                break;
            case "ADVERTISING/MARKETING":
                retIndustryTypeCd = "08";
                break;
            case "AGRICULTURE":
                retIndustryTypeCd = "09";
                break;
            case "CHEMICAL/PHARMACEUTICAL":
                retIndustryTypeCd = "10";
                break;
            case "CONSTRUCTION":
                retIndustryTypeCd = "11";
                break;
            case "EDUCATION":
                retIndustryTypeCd = "12";
                break;
            case "ENERGY":
                retIndustryTypeCd = "13";
                break;
            case "ENTERTAINMENT/RECREATION":
                retIndustryTypeCd = "14";
                break;
            case "FINANCIAL SERVICES":
                retIndustryTypeCd = "15";
                break;
            case "FOOD SERVICES":
                retIndustryTypeCd = "16";
                break;
            case "HEALTH CARE":
                retIndustryTypeCd = "17";
                break;
            case "HOSPITALITY":
                retIndustryTypeCd = "18";
                break;
            case "MEDIA":
                retIndustryTypeCd = "19";
                break;
            case "NON-PROFIT":
                retIndustryTypeCd = "20";
                break;
            case "PROFESSIONAL SERVICES":
                retIndustryTypeCd = "21";
                break;
            case "REAL ESTATE":
                retIndustryTypeCd = "22";
                break;
            case "TECHNOLOGY":
                retIndustryTypeCd = "23";
                break;
            case "TRANSPORTATION/LOGISTICS":
                retIndustryTypeCd = "24";
                break;
        }
        return retIndustryTypeCd;
    }).join();
}

function businessAgeCd(exp){
    var retVal = "";
    switch (exp){
        case "Less than 1 year":
            retVal = "01";
            break;
        case "1-2 years":
            retVal = "02";
            break;
        case "2-5 years":
            retVal = "03";
            break;
        case "5+ years":
            retVal = "04";
            break;
    }
    return retVal;
}

function formatMoment(){

    const d = new Date();

    return (d.getDay() + ":" + d.getMonth() + ":" + d.getYear() + "-" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
}

function requestAmtRangeCd(loanAmount){
    //strip the amount of any non number characters
    const loanAmt = loanAmount.replace(/[^0-9\.]+/g, "");
    const intLoanAmt = parseInt(loanAmt, 10);
    if(intLoanAmt <= 50000) return "01";
    if((intLoanAmt >= 50001) && (intLoanAmt <= 150000)) return "02";
    if((intLoanAmt >= 150001) && (intLoanAmt <= 250000)) return "03";
    if((intLoanAmt >= 250001) && (intLoanAmt <= 350000)) return "04";
    if((intLoanAmt >= 350001) && (intLoanAmt <= 1000000)) return "05";
    if((intLoanAmt >= 1000001) && (intLoanAmt <= 5000000)) return "06";
    if(intLoanAmt > 5000000) return "07";
}

function veteranInd(req){
    if(req.body.hasOwnProperty("additionalInfoData") && req.body.additionalInfoData.hasOwnProperty("isVeteran") && (req.body.additionalInfoData.isVeteran === "on")){
        return "6";
    }else{
        return "1";
    }
}

function businessPlanInd(req){
    if(req.body.hasOwnProperty("additionalInfoData") && req.body.additionalInfoData.hasOwnProperty("hasWrittenPlan") && (req.body.additionalInfoData.hasWrittenPlan === "on")){
        return "Y";
    }else{
        return "N";
    }
}

function otherFundSourceInd(req){
    if(req.body.hasOwnProperty("additionalInfoData") && req.body.additionalInfoData.hasOwnProperty("isGeneratingRevenue") && (req.body.additionalInfoData.isGeneratingRevenue === "on")){
        return "Y";
    }else{
        return "N";
    }
}

function businessAdvisoryInd(req){
    if(req.body.hasOwnProperty("additionalInfoData") && req.body.additionalInfoData.hasOwnProperty("hasFinancialProjections") && (req.body.additionalInfoData.hasFinancialProjections === "on")){
        return "Y";
    }else{
        return "N";
    }
}

function businessDtlTypTxt(req){
    if(("loanData" in req.body) && ("loanUsage" in req.body.loanData)){
        return (req.body.loanData.loanUsage);
    }else{
        return "";
    }
}

function businessStatusDescTxt(req){
    if(("businessInfoData" in req.body) && ("businessInfoDescription" in req.body.businessInfoData)){
        return req.body.businessInfoData.businessInfoDescription;
    }else{
        return "";
    }
}

function firstName(name){
    //check that first name is less than 40 chars
    let nameArray = name.split(" ");
    return nameArray[0];
}

function lastName(name){
    //check that last name is less than 40 chars
    let nameArray = name.split(" ");
    return nameArray[1];
}

function formDataXml(req){
    //remove &, < and > from the xml

    //user_id and form_submission_id and sbaGovUser will come from the database
    const dbUserID = 1;
    const submissionID = 1;
    const sbaGovUser = "newUser";

    const uniqueID = formatMoment() + "-" + dbUserID + "-" + submissionID;
    const fName = firstName(req.body.contactInfoData.contactFullName);
    const lName = lastName(req.body.contactInfoData.contactFullName);
    const bAgeCd = businessAgeCd(req.body.industryInfoData.industryExperience);
    const bDtlTypCd = businessDtlTypCd(req.body.industryInfoData.industryType);
    const bDtlTypTxt = businessDtlTypTxt(req);
    const lProceedTypCd = loanProceedTypCd(req.body.loanData.loanDescription);
    const reqAmtRangeCd = requestAmtRangeCd(req.body.loanData.loanAmount);
    const bAdvisoryInd = businessAdvisoryInd(req);
    const bPlanInd = businessPlanInd(req);
    const oFundSourceInd = otherFundSourceInd(req);
    const bStatusDescTxt = businessStatusDescTxt(req);
    const vetInd = veteranInd(req);
    const objFormData = {
        "LINC_APP": {
            "SBA_LINC_ENQ": {
                //UserName <= 80 chars
                "UserName": sbaGovUser,
                //UniqueID <= 30 chars
                "UniqueID": uniqueID,
                //LoanName <= 255 chars
                "LoanName": req.body.businessInfoData.businessInfoName,
                //ProjectZipCd = 5 chars
                "ProjectZipCd": req.body.businessInfoData.businessInfoZipcode,
                //ProjectZip4Cd = 4 chars
                "ProjectZip4Cd": "0000",
                //FirstName <= 80 chars
                "FirstName": fName,
                //LastName <= 80 chars
                "LastName": lName,
                //PrimaryPhone <= 25 chars
                "PrimaryPhone": req.body.contactInfoData.contactPhoneNumber,
                //PrimaryEmail <= 255 chars
                "PrimaryEmail": req.body.contactInfoData.contactEmailAddress,
                //CurrEmpQty = int
                "CurrEmpQty": "",
                //BusinessAgeCd = 2 chars
                "BusinessAgeCd": bAgeCd,
                //GrossRevenueSales  = decimal
                "GrossRevenueSales": "",
                //LegalOrgnztnCd = 2 chars
                "LegalOrgnztnCd": "",
                //BusinessDtlTypCd = 2 chars
                "BusinessDtlTypCd": bDtlTypCd,
                //BusinessDtlTypTxt <= 255 chars
                "BusinessDtlTypTxt": bDtlTypTxt,
                //LoanProceedTypCd <= 255 comma delimited
                "LoanProceedTypCd": lProceedTypCd,
                //ProceedOthTypTxt <= 255 chars
                "ProceedOthTypTxt": req.body.loanData.loanUsage,
                //RequestedAmtRangeCd = 2 chars
                "RequestedAmtRangeCd": reqAmtRangeCd,
                //CollateralInd Y for Yes  or N for No
                "CollateralInd": "",
                //CollateralDesc <= 255 chars
                "CollateralDesc": "",
                //BusinessAdvisoryInd Y for Yes or N for No
                "BusinessAdvisoryInd": bAdvisoryInd,
                //BusinessPlanInd Y for Yes or N for No
                "BusinessPlanInd": bPlanInd,
                //OtherFundSourceInd Y for Yes or N for No
                "OtherFundSourceInd": oFundSourceInd,
                //BusinessStatusDescTxt <= 1000
                "BusinessStatusDescTxt": bStatusDescTxt,
                //Veteran = unsignedByte means 6 for Yes 1 for No
                "Veteran": vetInd
            }
        }
    };

    const builder = new xml2js.Builder({'headless': true});
    const xmlFormData = builder.buildObject(objFormData);
    return xmlFormData;
}

function lincSoapRequestXml(username, password, unwrappedFormData){
    let text, parser, xmlDoc;
    text = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.linc" xmlns:x-="http://xml.apache.org/xml-soap"></soapenv:Envelope>';
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    let envelope = xmlDoc.documentElement;
    let header = xmlDoc.createElement("soapenv:Header");
    let body = xmlDoc.createElement("soapenv:Body");
    envelope.appendChild(header);
    envelope.appendChild(body);
    let first_SBA_LINC = xmlDoc.createElement("ws:SBA_LINC");
    body.appendChild(first_SBA_LINC);
    let inner_SBA_LINC = xmlDoc.createElement("ws:SBA_LINC");
    first_SBA_LINC.appendChild(inner_SBA_LINC);
    let first_item = xmlDoc.createElement("x-:item");
    let second_item = xmlDoc.createElement("x-:item");
    let third_item = xmlDoc.createElement("x-:item");
    inner_SBA_LINC.appendChild(first_item);
    inner_SBA_LINC.appendChild(second_item);
    inner_SBA_LINC.appendChild(third_item);
    let first_item_key = xmlDoc.createElement("x-:key");
    let first_item_value = xmlDoc.createElement("x-:value");
    first_item.appendChild(first_item_key);
    first_item.appendChild(first_item_value);
    let key_username = xmlDoc.createTextNode("username");
    first_item_key.appendChild(key_username);
    let value_username = xmlDoc.createTextNode(username);
    first_item_value.appendChild(value_username);
    let second_item_key = xmlDoc.createElement("x-:key");
    let second_item_value = xmlDoc.createElement("x-:value");
    second_item.appendChild(second_item_key);
    second_item.appendChild(second_item_value);
    let key_password = xmlDoc.createTextNode("password");
    second_item_key.appendChild(key_password);
    let value_password = xmlDoc.createTextNode(password);
    second_item_value.appendChild(value_password);
    let third_item_key = xmlDoc.createElement("x-:key");
    let third_item_value = xmlDoc.createElement("x-:value");
    third_item.appendChild(third_item_key);
    third_item.appendChild(third_item_value);
    let key_SBA_LINC  = xmlDoc.createTextNode("SBA_LINC");
    third_item_key.appendChild(key_SBA_LINC);
    let wrapped_SBA_LINC = xmlDoc.createCDATASection(unwrappedFormData);
    third_item_value.appendChild(wrapped_SBA_LINC);
    let domSerializer = new XMLSerializer();
    let soapRequestXml = domSerializer.serializeToString(xmlDoc);
    console.log(soapRequestXml);
    return soapRequestXml;
}

let lincSoapRequest = function (soapUrl, req, username, password){
    return new Promise(function(resolve){

        const dataXml = formDataXml(req);
        console.log(dataXml);
        const soapRequestXml = lincSoapRequestXml(username, password, dataXml);
        console.log(soapRequestXml);
        var options = {
            uri: soapUrl,
            method: "POST",
            followAllRedirects: true,
            followOriginalHttpMethod: true,
            body: soapRequestXml,
            timeout: 5000,
            secureProtocol: 'TLSv1_2_method',
            headers: [{
                name: 'Content-Type',
                value: 'text/xml; charset=UTF-8'
            }]
            /*,
            agentOptions:{
                keepAlive: true,
                secureProtocol: 'TLSv1_2_method'}*/
        };
        //options.agent = new https.Agent(options);
        request(options, function(error, response, body){
            if(error){
                throw error;
            }else{
                console.log(response);
                console.log(body);
                resolve("Data successfully received by OCA.");
            }
        });
    });
};

module.exports = lincSoapRequest;