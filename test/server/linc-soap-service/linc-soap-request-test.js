var should = require ('should');
import {userName, bStatusDescTxt, bDtlTypTxt, bAdvisoryInd, oFundSourceInd, bPlanInd, vetInd, reqAmtRangeCd, bAgeCd, bDtlTypCd, lProceedTypCd, formatMessage, pOthTypTxt } from "../../../src/service/linc-message-formatter.js";

describe('linc soap request test', function(){
    describe('soap request formatting functions test', function(){

        it('test userName with string of length between 1 and less than 40 characters long', function(){
            let retVal = userName("Last Name", "Benjamin");
            retVal.should.be.exactly("Benjamin");
        });

        it('test userName with string having white space that should be trimmed', function(){
            let retVal = userName("Last Name", " Benjamin ");
            retVal.should.be.exactly("Benjamin");
        });

        it('test userName with string of length greater than 40 characters long', function(){
            (function(){userName("Last Name", "BenjaminfromtheAntacticCircleBeyondAustralia")}).should.throw("User Last Name is required and should be less than 40 characters.");
        });

        it('test userName with empty string', function(){
            (function(){userName("Last Name", "")}).should.throw("User Last Name is required and should be less than 40 characters.");
        });

        it('test bAgeCd for Less than 1 year', function(){
            let retVal = bAgeCd("Less than 1 year");
            retVal.should.be.exactly("01");
        });

        it('test bAgeCd for 1-2 years', function(){
            let retVal = bAgeCd("1-2 years");
            retVal.should.be.exactly("02");
        });

        it('test bAgeCd for 2-5 years', function(){
            let retVal = bAgeCd("2-5 years");
            retVal.should.be.exactly("03");
        });

        it('test bAgeCd for 5+ years', function(){
            let retVal = bAgeCd("5+ years");
            retVal.should.be.exactly("04");
        });

        it('test bAgeCd for empty string', function(){
            (function(){bAgeCd("")}).should.throw("Valid Industry Experience is required.");
        });

        it('test bAgeCd for 6+ years', function(){
            (function(){bAgeCd("6+ years")}).should.throw("Valid Industry Experience is required.");
        });

        it('test bDtlTypCd for passing multiple items in the list', function(){
            let retVal = bDtlTypCd("ENTERTAINMENT/RECREATION,NON-PROFIT,MANUFACTURING,RETAIL");
            retVal.should.be.exactly("14,20,02,04");
        });

        it('test bDtlTypCd for passing single item in the list', function(){
            let retVal = bDtlTypCd("SERVICE");
            retVal.should.be.exactly("01");
        });

        it('test bDtlTypCd for passing empty string', function(){
            (function(){bDtlTypCd("")}).should.throw("Value not valid as IndustryType.");
        });

        it('test bDtlTypCd for passing invalid Industry Type', function(){
            (function(){bDtlTypCd("NOT AN INDUSTRY TYPE")}).should.throw("Value not valid as IndustryType.");
        });

        it('test lProceedTypCd for passing multiple items in the list', function(){
            let retVal = lProceedTypCd("REFINANCING/CONSOLIDATING DEBT,REMODELING AN EXISTING LOCATION,HIRING EMPLOYEES/STAFF");
            retVal.should.be.exactly("04,03,05");
        });

        it('test lProceedTypCd for passing single item in the list', function(){
            let retVal = lProceedTypCd("PURCHASING PROPERTY");
            retVal.should.be.exactly("01");
        });

        it('test lProceedTypCd for passing empty string', function(){
            (function(){lProceedTypCd("")}).should.throw("Value not a valid LoanDescription.");
        });

        it('test lProceedTypCd for passing invalid Loan Description Type', function(){
            (function(){lProceedTypCd("NOT AN LOAN DESCRIPTION TYPE")}).should.throw("Value not a valid LoanDescription.");
        });

        it('test bDtlTypTxt with arbitrary string between length of 0 and 255', function(){
            let req = {loanData: {loanUsage: 'We build shopping malls in all states for several years.'}};
            let retVal = bDtlTypTxt(req);
            retVal.should.be.exactly("We build shopping malls in all states for several years.");
        });

        it('test bDtlTypTxt with string of length greater than 255', function(){
            let req = {loanData: {loanUsage: "We build shopping malls in all states for several years and we " +
            "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
            "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
            "and will let our great grand children know how you have helped us through this difficult time."}};
            let retVal = bDtlTypTxt(req);
            retVal.should.have.length(255);
        });

        it('test bDtlTypTxt with loanUsage is empty string', function(){
            let req = {loanData: {loanUsage: ''}};
            let retVal = bDtlTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test bDtlTypTxt with loanData is empty string', function(){
            let req = {loanData: ''};
            let retVal = bDtlTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test bDtlTypTxt with request data as empty string', function(){
            let req = "";
            let retVal = bDtlTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test pOthTypTxt with arbitrary string between length of 0 and 255', function(){
            let req = {loanData: {loanUsage: 'We build shopping malls in all states for several years.'}};
            let retVal = pOthTypTxt(req);
            retVal.should.be.exactly("We build shopping malls in all states for several years.");
        });

        it('test pOthTypTxt with string of length greater than 255', function(){
            let req = {loanData: {loanUsage: "We build shopping malls in all states for several years and we " +
            "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
            "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
            "and will let our great grand children know how you have helped us through this difficult time."}};
            let retVal = pOthTypTxt(req);
            retVal.should.have.length(255);
            retVal.should.be.exactly("We build shopping malls in all states for several years and we have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. Please give us this loan as we need it so we don't go bankrupt. We will forever be ");
        });

        it('test pOthTypTxt with loanUsage is empty string', function(){
            let req = {loanData: {loanUsage: ''}};
            let retVal = pOthTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test pOthTypTxt with loanData is empty string', function(){
            let req = {loanData: ''};
            let retVal = pOthTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test pOthTypTxt with badBadLoanData is empty string', function(){
            let req = {badLoanData: ''};
            let retVal = pOthTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test pOthTypTxt with badBadLoanData and valid loanUsage', function(){
            let req = {badBadLoanData: {loanUsage: 'We are open for business.'}};
            let retVal = pOthTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test pOthTypTxt with request data as empty string', function(){
            let req = "";
            let retVal = pOthTypTxt(req);
            retVal.should.be.exactly("");
        });

        it('test reqAmtRangeCd lower bound range up to 50000', function(){
            let retVal = reqAmtRangeCd("$50,000");
            retVal.should.be.exactly("01");
        });

        it('test reqAmtRangeCd for a non-number', function(){
            (function(){reqAmtRangeCd("$50,AAAA")}).should.throw("Value is a not a number.");
        });

        it('test reqAmtRangeCd for decimal values', function(){
            let retVal = reqAmtRangeCd("$50,000.98");
            retVal.should.be.exactly("01");
        });

        it('test reqAmtRangeCd lower bound range 50001 - 150000', function(){
            let retVal = reqAmtRangeCd("$50,001");
            retVal.should.be.exactly("02");
        });

        it('test reqAmtRangeCd upper bound range 50001 - 150000', function(){
            let retVal = reqAmtRangeCd("$150,000");
            retVal.should.be.exactly("02");
        });

        it('test reqAmtRangeCd lower bound range 150001 - 250000', function(){
            let retVal = reqAmtRangeCd("$150,001");
            retVal.should.be.exactly("03");
        });

        it('test reqAmtRangeCd upper bound range 150001 - 250000', function(){
            let retVal = reqAmtRangeCd("$250,000");
            retVal.should.be.exactly("03");
        });

        it('test reqAmtRangeCd lower bound range 250001 - 350000', function(){
            let retVal = reqAmtRangeCd("$250,001");
            retVal.should.be.exactly("04");
        });

        it('test reqAmtRangeCd upper bound range 250001 - 350000', function(){
            let retVal = reqAmtRangeCd("$350,000");
            retVal.should.be.exactly("04");
        });

        it('test reqAmtRangeCd lower bound range 350001 - 1000000', function(){
            let retVal = reqAmtRangeCd("$350,001");
            retVal.should.be.exactly("05");
        });

        it('test reqAmtRangeCd upper bound range 350001 - 1000000', function(){
            let retVal = reqAmtRangeCd("$1,000,000");
            retVal.should.be.exactly("05");
        });

        it('test reqAmtRangeCd lower bound range 1000001 - 5000000', function(){
            let retVal = reqAmtRangeCd("$1,000,001");
            retVal.should.be.exactly("06");
        });

        it('test reqAmtRangeCd upper bound range 1000001 - 5000000', function(){
            let retVal = reqAmtRangeCd("$5,000,000");
            retVal.should.be.exactly("06");
        });

        it('test reqAmtRangeCd upper bound range over 5000000', function(){
            let retVal = reqAmtRangeCd("$5,000,001");
            retVal.should.be.exactly("07");
        });

        it('test bAgeCd for 6+ years', function(){
            (function(){bAgeCd("6+ years")}).should.throw("Valid Industry Experience is required.");
        });

        it('test bAdvisoryInd for Yes', function(){
            let req = {additionalInfoData: {hasFinancialProjections : true}};
            let retVal = bAdvisoryInd(req);
            retVal.should.be.exactly("Y");
        });

        it('test bAdvisoryInd for No', function(){
            let req = {additionalInfoData: {hasFinancialProjections : false}};
            let retVal = bAdvisoryInd(req);
            retVal.should.be.exactly("N");
        });

        it('test bPlanInd for Yes', function(){
            let req = {additionalInfoData: {hasWrittenPlan : true}};
            let retVal = bPlanInd(req);
            retVal.should.be.exactly("Y");
        });

        it('test bPlanInd for No', function(){
            let req = {additionalInfoData: {hasWrittenPlan : false}};
            let retVal = bPlanInd(req);
            retVal.should.be.exactly("N");
        });


        it('test oFundSourceInd for Yes', function(){
        let req = {additionalInfoData: {isGeneratingRevenue : true}};
            let retVal = oFundSourceInd(req);
            retVal.should.be.exactly("Y");
        });

        it('test oFundSourceInd for No', function(){
            let req = {additionalInfoData: {isGeneratingRevenue : false}};
            let retVal = oFundSourceInd(req);
            retVal.should.be.exactly("N");
        });

        it('test bStatusDescTxt with arbitrary string between length of 0 and 255', function(){
            let req = {businessInfoData: {businessInfoDescription: 'We build shopping malls in all states for several years.'}};
            let retVal = bStatusDescTxt(req);
            retVal.should.be.exactly("We build shopping malls in all states for several years.");
        });

        it('test bStatusDescTxt with string of length greater than 255', function(){
            let req = {businessInfoData: {businessInfoDescription: "We build shopping malls in all states for several years and we " +
                        "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
                        "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
                        "and will let our great grand children know how you have helped us through this difficult time."}};
            let retVal = bStatusDescTxt(req);
            retVal.should.have.length(255);
            retVal.should.be.exactly("We build shopping malls in all states for several years and we have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. Please give us this loan as we need it so we don't go bankrupt. We will forever be ");
        });

        it('test bStatusDescTxt with businessInfoDescription is empty string', function(){
            let req = {businessInfoData: {businessInfoDescription: ''}};
            let retVal = bStatusDescTxt(req);
            retVal.should.be.exactly("");
        });

        it('test bStatusDescTxt with businessInfoData is empty string', function(){
            let req = {businessInfoData: ''};
            let retVal = bStatusDescTxt(req);
            retVal.should.be.exactly("");
        });

        it('test bStatusDescTxt with badBusinessInfoData is empty string', function(){
            let req = {badBusinessInfoData: ''};
            let retVal = bStatusDescTxt(req);
            retVal.should.be.exactly("");
        });

        it('test bStatusDescTxt with badBusinessInfoData and valid businessInfoDescription', function(){
            let req = {badBusinessInfoData: {businessInfoDescription: 'We are open for business.'}};
            let retVal = bStatusDescTxt(req);
            retVal.should.be.exactly("");
        });

        it('test bStatusDescTxt with request data as empty string', function(){
            let req = "";
            let retVal = bStatusDescTxt(req);
            retVal.should.be.exactly("");
        });

        it('test vetInd for Yes', function(){
            let req = {additionalInfoData: {isVeteran: true}};
            let retVal = vetInd(req);
            retVal.should.be.exactly("6");
        });

        it('test vetInd for No', function(){
            let req = {additionalInfoData: {isVeteran: false}};
            let retVal = vetInd(req);
            retVal.should.be.exactly("1");
        });
    });

});