
const textLowerLimit = 0;
const textUpperLimit = 255;

function lProceedTypCd(loanDesc) {
  return loanDesc.split(",").map(function(loanDescItem) { // eslint-disable-line complexity
    const strLoanDesc = loanDescItem.trim(" ").toUpperCase();
    let retLoanDescCd = "";
    switch (strLoanDesc) {
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
      default:
        throw Error("Value not a valid LoanDescription.");
    }
    return retLoanDescCd;
  }).join();
}

function bDtlTypCd(industryType) {
  return industryType.split(",").map(function(industryTypeItem) { //eslint-disable-line complexity
    const strIndustryType = industryTypeItem.trim(" ").toUpperCase();
    let retIndustryTypeCd = "";
    switch (strIndustryType) {
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
      default:
        throw Error("Value not valid as IndustryType.");
    }
    return retIndustryTypeCd;
  }).join();
}

function bAgeCd(exp) {
  let retVal = "";
  switch (exp) {
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
    default:
      throw Error("Valid Industry Experience is required.");
  }
  return retVal;
}

function formatMoment() {

  const mDate = new Date();

  return (mDate.getDate() + ":" + mDate.getMonth() + ":" + mDate.getFullYear() + "-" + mDate.getHours() + ":" + mDate.getMinutes() + ":" + mDate.getSeconds());
}

function reqAmtRangeCd(loanAmount) { //eslint-disable-line complexity

  let retVal = "";
  const fiftyThousand = 50000;
  const fiftyThousandAndOne = 50001;
  const oneFiftyThousand = 150000;
  const oneFiftyThousandAndOne = 150001;
  const twoFiftyThousand = 250000;
  const twoFiftyThousandAndOne = 250001;
  const threeHundredAndFiftyThousand = 350000;
  const threeHundredAndFiftyThousandAndOne = 350001;
  const oneMillion = 1000000;
  const oneMillionAndOne = 1000001;
  const fiveMillion = 5000000;

  const loanAmt = loanAmount.replace(/\$|,/g, "");

  if (isNaN(loanAmt)) {
    throw Error("Value is a not a number.");
  }

  const intLoanAmt = parseInt(loanAmt, 10);
  if (intLoanAmt <= fiftyThousand) {
    retVal = "01";
  } else if ((intLoanAmt >= fiftyThousandAndOne) && (intLoanAmt <= oneFiftyThousand)) {
    retVal = "02";
  } else if ((intLoanAmt >= oneFiftyThousandAndOne) && (intLoanAmt <= twoFiftyThousand)) {
    retVal = "03";
  } else if ((intLoanAmt >= twoFiftyThousandAndOne) && (intLoanAmt <= threeHundredAndFiftyThousand)) {
    retVal = "04";
  } else if ((intLoanAmt >= threeHundredAndFiftyThousandAndOne) && (intLoanAmt <= oneMillion)) {
    retVal = "05";
  } else if ((intLoanAmt >= oneMillionAndOne) && (intLoanAmt <= fiveMillion)) {
    retVal = "06";
  } else if (intLoanAmt > fiveMillion) {
    retVal = "07";
  }

  return retVal;
}

function vetInd(req) {
  return (req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("isVeteran") && (req.additionalInfoData.isVeteran === true)) ? "6" : "1";
}

function bPlanInd(req) {
  return (req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("hasWrittenPlan") && (req.additionalInfoData.hasWrittenPlan === true)) ? "Y" : "N";
}

function oFundSourceInd(req) {
  return (req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("isGeneratingRevenue") && (req.additionalInfoData.isGeneratingRevenue === true)) ? "Y" : "N";
}

function bAdvisoryInd(req) {
  return (req.hasOwnProperty("additionalInfoData") && req.additionalInfoData.hasOwnProperty("hasFinancialProjections") && (req.additionalInfoData.hasFinancialProjections === true)) ? "Y" : "N";
}

function bDtlTypTxt(req) {
  let retVal = "";
  if (req.hasOwnProperty("loanData") && req.loanData.hasOwnProperty("loanUsage")) {
    if (req.loanData.loanUsage.length > textLowerLimit && req.loanData.loanUsage.length < textUpperLimit) {
      retVal = req.loanData.loanUsage;
    } else if (req.loanData.loanUsage.length >= textUpperLimit) {
      retVal = req.loanData.loanUsage.substring(textLowerLimit, textUpperLimit);
    }
  }
  return retVal;
}

function pOthTypTxt(req) {
  let retVal = "";
  if (req.hasOwnProperty("loanData") && req.loanData.hasOwnProperty("loanUsage")) {
    if (req.loanData.loanUsage.length > textLowerLimit && req.loanData.loanUsage.length < textUpperLimit) {
      retVal = req.loanData.loanUsage;
    } else if (req.loanData.loanUsage.length >= textUpperLimit) {
      retVal = req.loanData.loanUsage.substring(textLowerLimit, textUpperLimit);
    }
  }
  return retVal;
}

function bStatusDescTxt(req) {
  let retVal = "";
  if (req.hasOwnProperty("businessInfoData") && req.businessInfoData.hasOwnProperty("businessInfoDescription")) {
    if (req.businessInfoData.businessInfoDescription.length > textLowerLimit && req.businessInfoData.businessInfoDescription.length < textUpperLimit) {
      retVal = req.businessInfoData.businessInfoDescription;
    } else if (req.businessInfoData.businessInfoDescription.length >= textUpperLimit) {
      retVal = req.businessInfoData.businessInfoDescription.substring(textLowerLimit, textUpperLimit);
    }
  }
  return retVal;
}

function userName(whichName, name) {

  const nameLowerLimit = 0;
  const nameUpperLimit = 40;

  const strName = name.trim();
  if (strName.length > nameLowerLimit && strName.length < nameUpperLimit) {
    return strName;
  }
  const strError = "User " + whichName + " is required and should be less than 40 characters.";
  throw new Error(strError);
}

function formatMessage(reqData) {

  const req = reqData.req;
  const firstName = 0;
  const lastName = 1;

  return {
    //UserName <= 80 chars
    "UserName": reqData.sbaGovUser,
    //UniqueID <= 30 chars
    "UniqueID": formatMoment() + "-" + reqData.dbUserID + "-" + reqData.submissionID,
    //LoanName <= 255 chars
    "LoanName": reqData.req.businessInfoData.businessInfoName,
    //ProjectZipCd = 5 chars
    "ProjectZipCd": reqData.req.businessInfoData.businessInfoZipcode,
    //ProjectZip4Cd = 4 chars
    "ProjectZip4Cd": "0000",
    //FirstName <= 80 chars
    "FirstName": userName("First Name", req.contactInfoData.contactFullName.split(" ")[firstName]),
    //LastName <= 80 chars
    "LastName": userName("Last Name", req.contactInfoData.contactFullName.split(" ")[lastName]),
    //PrimaryPhone <= 25 chars
    "PrimaryPhone": req.contactInfoData.contactPhoneNumber,
    //PrimaryEmail <= 255 chars
    "PrimaryEmail": req.contactInfoData.contactEmailAddress,
    //CurrEmpQty = int
    "CurrEmpQty": "",
    //BusinessAgeCd = 2 chars
    "BusinessAgeCd": bAgeCd(req.industryInfoData.industryExperience),
    //GrossRevenueSales  = decimal
    "GrossRevenueSales": "",
    //LegalOrgnztnCd = 2 chars
    "LegalOrgnztnCd": "",
    //BusinessDtlTypCd = 2 chars
    "BusinessDtlTypCd": bDtlTypCd(req.industryInfoData.industryType),
    //BusinessDtlTypTxt <= 255 chars
    "BusinessDtlTypTxt": bDtlTypTxt(req),
    //LoanProceedTypCd <= 255 comma delimited
    "LoanProceedTypCd": lProceedTypCd(req.loanData.loanDescription),
    //ProceedOthTypTxt <= 255 chars
    "ProceedOthTypTxt": pOthTypTxt(req),
    //RequestedAmtRangeCd = 2 chars
    "RequestedAmtRangeCd": reqAmtRangeCd(req.loanData.loanAmount),
    //CollateralInd Y for Yes  or N for No
    "CollateralInd": "N",
    //CollateralDesc <= 255 chars
    "CollateralDesc": "",
    //BusinessAdvisoryInd Y for Yes or N for No
    "BusinessAdvisoryInd": bAdvisoryInd(req),
    //BusinessPlanInd Y for Yes or N for No
    "BusinessPlanInd": bPlanInd(req),
    //OtherFundSourceInd Y for Yes or N for No
    "OtherFundSourceInd": oFundSourceInd(req),
    //BusinessStatusDescTxt <= 1000
    "BusinessStatusDescTxt": bStatusDescTxt(req),
    //Veteran = unsignedByte means 6 for Yes 1 for No
    "Veteran": vetInd(req)
  };
}

export { userName, bStatusDescTxt, bDtlTypTxt, bAdvisoryInd, oFundSourceInd, bPlanInd, vetInd, reqAmtRangeCd, formatMoment, bAgeCd, bDtlTypCd, lProceedTypCd, formatMessage, pOthTypTxt };