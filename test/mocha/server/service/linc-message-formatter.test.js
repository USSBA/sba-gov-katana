import {
  userName,
  mapToUnsignedByte,
  reqAmtRangeCd,
  bAgeCd,
  bDtlTypCd,
  lProceedTypCd,
  formatMessage,
  booleanToChar,
  trimToSize
} from "../../../../src/service/linc-message-formatter.js";

describe("LINC Message Formatter", function() {
  describe('#formatMessage', function() {
    it('should have all the correct fields filled', function() {
      let output = formatMessage({
        dbUserID: 1,
        submissionID: 1,
        sbaGovUser: "newUser"
      }, {
        id: "some-test-id",
        name: "Test von User",
        phone: "123-456-7890",
        emailAddress: "test@test.test",
        businessName: "businessName",
        businessZip: "21113",
        industry: "AGRICULTURE",
        industryExperience: "Less than 1 year",
        loanAmount: "10000",
        loanDescription: "loanDescription",
        loanUsage: "REMODELING/EXPANSION",
        businessWebsite: "businessWebsite",
        businessDescription: "businessDescription",
        hasWrittenPlan: true,
        hasFinancialProjects: true,
        isGeneratingRevenue: true,
        isVeteran: true
      });

      // list is generated from the XSD
      output.should.have.property("LoanName");
      output.should.have.property("LoginID");
      output.should.have.property("RequestID");
      output.should.have.property("ProjectZipCd");
      output.should.have.property("ProjectZip4Cd");
      output.should.have.property("FirstName");
      output.FirstName.should.equal("Test");
      output.should.have.property("LastName");
      output.LastName.should.equal("von User");
      output.should.have.property("BusinessWebsite");
      output.should.have.property("FinancialInd");
      output.should.have.property("RevenueInd");
      output.should.have.property("PrimaryEmail");
      output.should.have.property("PrimaryPhone");
      output.should.have.property("BusinessAgeCd");
      output.should.have.property("BusinessDtlTypCd");
      output.should.have.property("BusinessDtlTypTxt");
      output.should.have.property("LoanProceedTypCd");
      output.should.have.property("ProceedOthTypTxt");
      output.should.have.property("RequestedLoanAmount");
      output.should.have.property("BusinessPlanInd");
      output.should.have.property("Veteran");
    });
  })
  describe('Soap Request Formatting', function() {

    it('should accept a userName that is a string of length between 1 and less than 40 characters', function() {
      let retVal = userName("Benjamin");
      retVal.should.equal("Benjamin");
    });

    it('should accept a userName that is a string having white space that should be trimmed', function() {
      let retVal = userName("Benjamin ");
      retVal.should.equal("Benjamin");
    });

    it('should accept a bAgeCd that is Less than 1 year', function() {
      let retVal = bAgeCd("Less than 1 year");
      retVal.should.equal("01");
    });

    it('should accept a bAgeCd that is 1-2 years', function() {
      let retVal = bAgeCd("1-2 years");
      retVal.should.equal("02");
    });

    it('should accept a bAgeCd that is 2-5 years', function() {
      let retVal = bAgeCd("2-5 years");
      retVal.should.equal("03");
    });

    it('should accept a bAgeCd that is 5+ years', function() {
      let retVal = bAgeCd("5+ years");
      retVal.should.equal("04");
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
      retVal.should.equal("14,20,02,04");
    });

    it('should accept bDtlTypCd that has a single item in the list', function() {
      let retVal = bDtlTypCd("RETAIL");
      retVal.should.equal("04");
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
      let retVal = lProceedTypCd("REFINANCING DEBT,REMODELING/EXPANSION,HIRING EMPLOYEES");
      retVal.should.equal("04,03,05");
    });

    it('should accept lProceedTypCd that is a single item in the list', function() {
      let retVal = lProceedTypCd("PURCHASING PROPERTY");
      retVal.should.equal("01");
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

    it('should accept reqAmtRangeCd with lower bound range up to 50000', function() {
      let retVal = reqAmtRangeCd("$50,000");
      retVal.should.equal("01");
    });

    it('should not accept reqAmtRangeCd that is a non-number', function() {
      (function() {
        reqAmtRangeCd("$50,AAAA")
      }).should.throw("Value is a not a number.");
    });

    it('should accept reqAmtRangeCd that is a decimal value', function() {
      let retVal = reqAmtRangeCd("$50,000.98");
      retVal.should.equal("01");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 50001', function() {
      let retVal = reqAmtRangeCd("$50,001");
      retVal.should.equal("02");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 150000', function() {
      let retVal = reqAmtRangeCd("$150,000");
      retVal.should.equal("02");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 150001', function() {
      let retVal = reqAmtRangeCd("$150,001");
      retVal.should.equal("03");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 250000', function() {
      let retVal = reqAmtRangeCd("$250,000");
      retVal.should.equal("03");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 250001', function() {
      let retVal = reqAmtRangeCd("$250,001");
      retVal.should.equal("04");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 350000', function() {
      let retVal = reqAmtRangeCd("$350,000");
      retVal.should.equal("04");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 350001', function() {
      let retVal = reqAmtRangeCd("$350,001");
      retVal.should.equal("05");
    });

    it('should accept reqAmtRangeCd that has an upper bound of 1000000', function() {
      let retVal = reqAmtRangeCd("$1,000,000");
      retVal.should.equal("05");
    });

    it('should accept reqAmtRangeCd that has a lower bound of 1000001', function() {
      let retVal = reqAmtRangeCd("$1,000,001");
      retVal.should.equal("06");
    });

    it('should accept reqAmtRangeCd that has an upper bound range 5000000', function() {
      let retVal = reqAmtRangeCd("$5,000,000");
      retVal.should.equal("06");
    });

    it('should accept reqAmtRangeCd that has an upper bound of over 5000000', function() {
      let retVal = reqAmtRangeCd("$5,000,001");
      retVal.should.equal("07");
    });

    it('should not accept bAgeCd that is 6+ years', function() {
      (function() {
        bAgeCd("6+ years")
      }).should.throw("Valid Industry Experience is required.");
    });

    it('should accept an arbitrary string between length of 0 and 255', function() {
      let retVal = trimToSize("We build shopping malls in all states for several years.");
      retVal.should.equal("We build shopping malls in all states for several years.");
    });

    it('should trim a string of length greater than 255', function() {
      let req = "We build shopping malls in all states for several years and we " +
        "have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. " +
        "Please give us this loan as we need it so we don't go bankrupt. " + "We will forever be grateful for your help " +
        "and will let our great grand children know how you have helped us through this difficult time.";
      let retVal = trimToSize(req);
      retVal.should.have.length(255);
      retVal.should.equal("We build shopping malls in all states for several years and we have no problem being able to pay back this loan. We have several hundred employees in our Baltimore office. Please give us this loan as we need it so we don't go bankrupt. We will forever be ");
    });

    it('should accept the empty string', function() {
      let retVal = trimToSize("");
      retVal.should.equal("");
    });

    it('should convert the null string to the empty string', function() {
      let retVal = trimToSize(null);
      retVal.should.equal("");
    });

    it('should map true to the number 6', function() {
      let retVal = mapToUnsignedByte(true);
      retVal.should.equal("6");
    });

    it('should map false to the number 1', function() {
      let retVal = mapToUnsignedByte(false);
      retVal.should.equal("1");
    });

    it('should translate boolean true to Y', function() {
      booleanToChar(true).should.equal("Y");
    });

    it('should translate boolean false to F', function() {
      booleanToChar(false).should.equal("N");
    });
  });

});
