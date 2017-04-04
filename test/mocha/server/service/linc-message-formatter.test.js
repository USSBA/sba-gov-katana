import {
  userName,
  bStatusDescTxt,
  bDtlTypTxt,
  bAdvisoryInd,
  oFundSourceInd,
  bPlanInd,
  vetInd,
  reqAmtRangeCd,
  bAgeCd,
  bDtlTypCd,
  lProceedTypCd,
  formatMessage,
  pOthTypTxt
} from "../../../../src/service/linc-message-formatter.js";


describe("LINC", function() {
  describe('Soap Request Formatting', function() {

    it('should accept a userName that is a string of length between 1 and less than 40 characters', function() {
      let retVal = userName("Last Name", "Benjamin");
      retVal.should.be.exactly("Benjamin");
    });

    it('should accept a userName that is a string having white space that should be trimmed', function() {
      let retVal = userName("Last Name", " Benjamin ");
      retVal.should.be.exactly("Benjamin");
    });

    it('should not accept a userName that is a string of length greater than 40 characters long', function() {
      (function() {
        userName("Last Name", "BenjaminfromtheAntacticCircleBeyondAustralia")
      }).should.throw("User Last Name is required and should be less than 40 characters.");
    });

    it('should not accept a userName with empty string', function() {
      (function() {
        userName("Last Name", "")
      }).should.throw("User Last Name is required and should be less than 40 characters.");
    });

    it('should accept a bAgeCd that is Less than 1 year', function() {
      let retVal = bAgeCd("Less than 1 year");
      retVal.should.be.exactly("01");
    });

    it('should accept a bAgeCd that is 1-2 years', function() {
      let retVal = bAgeCd("1-2 years");
      retVal.should.be.exactly("02");
    });

    it('should accept a bAgeCd that is 2-5 years', function() {
      let retVal = bAgeCd("2-5 years");
      retVal.should.be.exactly("03");
    });

    it('should accept a bAgeCd that is 5+ years', function() {
      let retVal = bAgeCd("5+ years");
      retVal.should.be.exactly("04");
    });

    it('should not accept a bAgeCd that is empty string', function() {
      (function() {
        bAgeCd("")
      }).should.throw("Valid Industry Experience is required.");
    });

    it('should not accept a bAgeCd that is 6+ years', function() {
      (function() {
        bAgeCd("6+ years")
      }).should.throw("Valid Industry Experience is required.");
    });

    it('should accept a bDtlTypCd that has multiple items in the list', function() {
      let retVal = bDtlTypCd("ENTERTAINMENT/RECREATION,NON-PROFIT,MANUFACTURING,RETAIL");
      retVal.should.be.exactly("14,20,02,04");
    });

    it('should accept bDtlTypCd that has a single item in the list', function() {
      let retVal = bDtlTypCd("SERVICE");
      retVal.should.be.exactly("01");
    });

    it('should not accept bDtlTypCd that has an empty string', function() {
      (function() {
        bDtlTypCd("")
      }).should.throw("Value not valid as IndustryType.");
    });

    it('should not accept bDtlTypCd that is an invalid Industry Type', function() {
      (function() {
        bDtlTypCd("NOT AN INDUSTRY TYPE")
      }).should.throw("Value not valid as IndustryType.");
    });

    it('should accept lProceedTypCd that has multiple items in the list', function() {
      let retVal = lProceedTypCd("REFINANCING/CONSOLIDATING DEBT,REMODELING AN EXISTING LOCATION,HIRING EMPLOYEES/STAFF");
      retVal.should.be.exactly("04,03,05");
    });

    it('should accept lProceedTypCd that is a single item in the list', function() {
      let retVal = lProceedTypCd("PURCHASING PROPERTY");
      retVal.should.be.exactly("01");
    });

    it('should not accept lProceedTypCd that is empty string', function() {
      (function() {
        lProceedTypCd("")
      }).should.throw("Value not a valid LoanDescription.");
    });

    it('should not accept lProceedTypCd that has an invalid Loan Description Type', function() {
      (function() {
        lProceedTypCd("NOT AN LOAN DESCRIPTION TYPE")
      }).should.throw("Value not a valid LoanDescription.");
    });

    it('should accept bDtlTypTxt that has an arbitrary string between length of 0 and 255', function() {
      let retVal = bDtlTypTxt("We build shopping malls in all states for several years.");
      retVal.should.be.exactly("We build shopping malls in all states for several years.");
    });

    it('should accept bDtlTypTxt that is a string of length greater than 255', function() {
      let req = "We build shopping malls in all states for several years and we " +
        "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
        "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
        "and will let our great grand children know how you have helped us through this difficult time.";
      let retVal = bDtlTypTxt(req);
      retVal.should.have.length(255);
    });

    it('should accept bDtlTypTxt that has an empty string', function() {
      let retVal = bDtlTypTxt("");
      retVal.should.be.exactly("");
    });

    it('should accept pOthTypTxt that has an arbitrary string between length of 0 and 255', function() {
      let retVal = pOthTypTxt("We build shopping malls in all states for several years.");
      retVal.should.be.exactly("We build shopping malls in all states for several years.");
    });

    it('should accept pOthTypTxt that has a string of length greater than 255', function() {
      let req = "We build shopping malls in all states for several years and we " +
        "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
        "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
        "and will let our great grand children know how you have helped us through this difficult time.";
      let retVal = pOthTypTxt(req);
      retVal.should.have.length(255);
      retVal.should.be.exactly("We build shopping malls in all states for several years and we have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. Please give us this loan as we need it so we don't go bankrupt. We will forever be ");
    });

    it('should accept pOthTypTxt that has a loanUsage that is empty string', function() {
      let retVal = pOthTypTxt("");
      retVal.should.be.exactly("");
    });

    it('should accept reqAmtRangeCd with lower bound range up to 50000', function() {
      let retVal = reqAmtRangeCd("$50,000");
      retVal.should.be.exactly("01");
    });

    it('should not accept reqAmtRangeCd that is a non-number', function() {
      (function() {
        reqAmtRangeCd("$50,AAAA")
      }).should.throw("Value is a not a number.");
    });

    it('should accept reqAmtRangeCd that is a decimal value', function() {
      let retVal = reqAmtRangeCd("$50,000.98");
      retVal.should.be.exactly("01");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 50001', function() {
      let retVal = reqAmtRangeCd("$50,001");
      retVal.should.be.exactly("02");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 150000', function() {
      let retVal = reqAmtRangeCd("$150,000");
      retVal.should.be.exactly("02");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 150001', function() {
      let retVal = reqAmtRangeCd("$150,001");
      retVal.should.be.exactly("03");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 250000', function() {
      let retVal = reqAmtRangeCd("$250,000");
      retVal.should.be.exactly("03");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 250001', function() {
      let retVal = reqAmtRangeCd("$250,001");
      retVal.should.be.exactly("04");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 350000', function() {
      let retVal = reqAmtRangeCd("$350,000");
      retVal.should.be.exactly("04");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 350001', function() {
      let retVal = reqAmtRangeCd("$350,001");
      retVal.should.be.exactly("05");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 1000000', function() {
      let retVal = reqAmtRangeCd("$1,000,000");
      retVal.should.be.exactly("05");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 1000001', function() {
      let retVal = reqAmtRangeCd("$1,000,001");
      retVal.should.be.exactly("06");
    });

    it('should accept reqAmtRangeCd that has an upper bound range 5000000', function() {
      let retVal = reqAmtRangeCd("$5,000,000");
      retVal.should.be.exactly("06");
    });

    it('should accept reqAmtRangeCd that has an upper bound of over 5000000', function() {
      let retVal = reqAmtRangeCd("$5,000,001");
      retVal.should.be.exactly("07");
    });

    it('should not accept bAgeCd that is 6+ years', function() {
      (function() {
        bAgeCd("6+ years")
      }).should.throw("Valid Industry Experience is required.");
    });

    it('should accept bAdvisoryInd that is Yes', function() {
      let retVal = bAdvisoryInd(true);
      retVal.should.be.exactly("Y");
    });

    it('should accept bAdvisoryInd that is No', function() {
      let retVal = bAdvisoryInd(false);
      retVal.should.be.exactly("N");
    });

    it('should accept bPlanInd that is Yes', function() {
      let retVal = bPlanInd(true);
      retVal.should.be.exactly("Y");
    });

    it('should accept bPlanInd that is No', function() {
      let retVal = bPlanInd(false);
      retVal.should.be.exactly("N");
    });


    it('should accept oFundSourceInd that is Yes', function() {
      let retVal = oFundSourceInd(true);
      retVal.should.be.exactly("Y");
    });

    it('should accept oFundSourceInd that is No', function() {
      let retVal = oFundSourceInd(false);
      retVal.should.be.exactly("N");
    });

    it('should accept bStatusDescTxt that is an arbitrary string between length of 0 and 255', function() {
      let retVal = bStatusDescTxt("We build shopping malls in all states for several years.");
      retVal.should.be.exactly("We build shopping malls in all states for several years.");
    });

    it('should accept bStatusDescTxt that is a string of length greater than 255', function() {
      let req = "We build shopping malls in all states for several years and we " +
        "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
        "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
        "and will let our great grand children know how you have helped us through this difficult time.";
      let retVal = bStatusDescTxt(req);
      retVal.should.have.length(255);
      retVal.should.be.exactly("We build shopping malls in all states for several years and we have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. Please give us this loan as we need it so we don't go bankrupt. We will forever be ");
    });

    it('should accept bStatusDescTxt that is empty string', function() {
      let retVal = bStatusDescTxt("");
      retVal.should.be.exactly("");
    });


    it('should accept vetInd that is Yes', function() {
      let retVal = vetInd(true);
      retVal.should.be.exactly("6");
    });

    it('should accept vetInd that is No', function() {
      let retVal = vetInd(false);
      retVal.should.be.exactly("1");
    });
  });

});
