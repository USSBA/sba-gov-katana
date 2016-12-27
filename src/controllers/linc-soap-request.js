
let request = require('request');
let xml2js = require('xml2js');
let DOMParser = require('xmldom').DOMParser;
let XMLSerializer = require('xmldom').XMLSerializer;

class SbaLincEnq {
    constructor(req, sbaGovUser, dbUserID, submissionID){
            //UserName <= 80 chars
            this.UserName = sbaGovUser;
            //UniqueID <= 30 chars
            this.UniqueID = this.formatMoment() + "-" + dbUserID + "-" + submissionID;
            //LoanName <= 255 chars
            this.LoanName = req.businessInfoData.businessInfoName;
            //ProjectZipCd = 5 chars
            this.ProjectZipCd = req.businessInfoData.businessInfoZipcode;
            //ProjectZip4Cd = 4 chars
            this.ProjectZip4Cd = "0000";
            //FirstName <= 80 chars
            this.FirstName = this.fName(req.contactInfoData.contactFullName);
            //LastName <= 80 chars
            this.LastName = this.lName(req.contactInfoData.contactFullName);
            //PrimaryPhone <= 25 chars
            this.PrimaryPhone = req.contactInfoData.contactPhoneNumber;
            //PrimaryEmail <= 255 chars
            this.PrimaryEmail = req.contactInfoData.contactEmailAddress;
            //CurrEmpQty = int
            this.CurrEmpQty = "";
            //BusinessAgeCd = 2 chars
            this.BusinessAgeCd = this.bAgeCd(req.industryInfoData.industryExperience);
            //GrossRevenueSales  = decimal
            this.GrossRevenueSales = "";
            //LegalOrgnztnCd = 2 chars
            this.LegalOrgnztnCd = "";
            //BusinessDtlTypCd = 2 chars
            this.BusinessDtlTypCd = this.bDtlTypCd(req.industryInfoData.industryType);
            //BusinessDtlTypTxt <= 255 chars
            this.BusinessDtlTypTxt = this.bDtlTypTxt(req);
            //LoanProceedTypCd <= 255 comma delimited
            this.LoanProceedTypCd = this.lProceedTypCd(req.loanData.loanDescription);
            //ProceedOthTypTxt <= 255 chars
            this.ProceedOthTypTxt = req.body.loanData.loanUsage;
            //RequestedAmtRangeCd = 2 chars
            this.RequestedAmtRangeCd = this.reqAmtRangeCd(req.loanData.loanAmount);
            //CollateralInd Y for Yes  or N for No
            this.CollateralInd = "N";
            //CollateralDesc <= 255 chars
            this.CollateralDesc = "";
            //BusinessAdvisoryInd Y for Yes or N for No
            this.BusinessAdvisoryInd = this.bAdvisoryInd(req);
            //BusinessPlanInd Y for Yes or N for No
            this.BusinessPlanInd = this.bPlanInd(req);
            //OtherFundSourceInd Y for Yes or N for No
            this.OtherFundSourceInd = this.oFundSourceInd(req);
            //BusinessStatusDescTxt <= 1000
            this.BusinessStatusDescTxt = this.bStatusDescTxt(req);
            //Veteran = unsignedByte means 6 for Yes 1 for No
            this.Veteran = this.vetInd(req);
    }

    lProceedTypCd(loanDesc){
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

    bDtlTypCd(industryType){
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

    bAgeCd(exp){
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

    formatMoment(){

        const d = new Date();

        return (d.getDate() + ":" + d.getMonth() + ":" + d.getFullYear() + "-" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    }

    reqAmtRangeCd(loanAmount){
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

    vetInd(req){
        if(req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("isVeteran") && (req.additionalInfoData.isVeteran === true)){
            return "6";
        }else{
            return "1";
        }
    }

    bPlanInd(req){
        if(req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("hasWrittenPlan") && (req.additionalInfoData.hasWrittenPlan === true)){
            return "Y";
        }else{
            return "N";
        }
    }

    oFundSourceInd(req){
        if(req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("isGeneratingRevenue") && (req.additionalInfoData.isGeneratingRevenue === true)){
            return "Y";
        }else{
            return "N";
        }
    }

    bAdvisoryInd(req){
        if(req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("hasFinancialProjections") && (req.additionalInfoData.hasFinancialProjections === true)){
            return "Y";
        }else{
            return "N";
        }
    }

    bDtlTypTxt(req){
        if(("loanData" in req) && ("loanUsage" in req.loanData)){
            return (req.loanData.loanUsage);
        }else{
            return "";
        }
    }

    bStatusDescTxt(req){
        if(("businessInfoData" in req) && ("businessInfoDescription" in req.businessInfoData)){
            return req.businessInfoData.businessInfoDescription;
        }else{
            return "";
        }
    }

    fName(name){
        //check that first name is less than 40 chars
        let nameArray = name.split(" ");
        return nameArray[0];
    }

    lName(name){
        //check that last name is less than 40 chars
        let nameArray = name.split(" ");
        return nameArray[1];
    }
}
class FormDataToXml {
    static convertFormDataToXml(req){
        //remove &, < and > from the xml
        //user_id and form_submission_id and sbaGovUser will come from the database
        const dbUserID = 1;
        const submissionID = 1;
        const sbaGovUser = "newUser";

        const objFormData = {
            "LINC_APP": {
                "SBA_LINC_ENQ": new SbaLincEnq(req,sbaGovUser, dbUserID, submissionID)
            }
        };

        const builder = new xml2js.Builder({'headless': true});
        const xmlFormData = builder.buildObject(objFormData);
        return xmlFormData;
    }
}

class LincSoapRequest{

    sendLincSoapRequest(soapUrl, req, username, password){
        return new Promise((resolve)=>{

            const dataXml = FormDataToXml.convertFormDataToXml(req);
            const lincSoapRequestEnvelopeXml = this.createLincSoapRequestEnvelopeXml(username, password, dataXml);

            let options = {
                uri: soapUrl,
                method: "POST",
                followAllRedirects: true,
                followOriginalHttpMethod: true,
                body: lincSoapRequestEnvelopeXml,
                timeout: 5000,
                secureProtocol: 'TLSv1_2_method',
                headers: {
                    'Content-Type' : 'text/xml; charset=UTF-8',
                    'SOAPAction' : ""
                }
            };
            request(options, (error, response, body)=>{
                if(error){
                    throw error;
                }else{
                    if(this.parseResponse(body) === "S") {
                        //success response received
                        resolve("Data successfully received by OCA.");
                    }else{
                        throw body;
                    }
                }
            });
        });
    }

    parseResponse(xmlBody){
        let parser, xmlRespDoc, resultCode, errorMessageTechnical, response, errorMessageEnglish, passwordUpdateRequired;
        let retVal = "F";
        parser = new DOMParser();
        xmlRespDoc = parser.parseFromString(xmlBody);
        passwordUpdateRequired = xmlRespDoc.getElementsByTagName("item")[0].getElementsByTagName("value")[0].childNodes[0].nodeValue;
        console.log(passwordUpdateRequired);

        //this element can be empty
        let secondItemChildren = xmlRespDoc.getElementsByTagName("item")[1].getElementsByTagName("value")[0].childNodes;
        if(secondItemChildren.length > 0){
            errorMessageEnglish = secondItemChildren[0].nodeValue;
            console.log(errorMessageEnglish);
        }
        response = xmlRespDoc.getElementsByTagName("item")[2].getElementsByTagName("value")[0].childNodes[0].nodeValue;
        console.log(response);

        //this element can be empty
        let fourthItemChildren = xmlRespDoc.getElementsByTagName("item")[3].getElementsByTagName("value")[0].childNodes;
        if(fourthItemChildren.length > 0){
            errorMessageTechnical = fourthItemChildren[0].nodeValue;
            console.log(errorMessageTechnical);
        }
        resultCode = xmlRespDoc.getElementsByTagName("item")[4].getElementsByTagName("value")[0].childNodes[0].nodeValue;
        console.log(resultCode);
        if(resultCode === "0"){
            let lincRespXmlDoc = parser.parseFromString(response);
            retVal = lincRespXmlDoc.getElementsByTagName("Result")[0].childNodes[0].nodeValue;
        }
        return retVal;
    }

    createLincSoapRequestEnvelopeXml(username, password, unwrappedFormData){
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

}

module.exports = LincSoapRequest;