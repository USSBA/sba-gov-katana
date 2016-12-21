import init from'../src/init.js';
console.log(init);

import * as lenderMatchRecordDao from '../src/models/dao/lender-match-record.js';
var dataString = '{"loanData":{"loanAmount":"$12","loanDescription":"Buying an Existing Business","loanUsage":"sadf"},"additionalInfoData":{"hasWrittenPlan":false,"hasFinancialProjections":true,"isGeneratingRevenue":true,"isVeteran":false},"contactInfoData":{"contactPhoneNumber":"1231231231","contactFullName":"Jon King","contactEmailAddress":"j@j.gov"},"businessInfoData":{"businessInfoName":"asdf","businessInfoZipcode":"21113","businessInfoDescription":"asdf","businessInfoWebsite":""},"industryInfoData":{"industryType":"Agriculture","industryExperience":"1-2 years"}}';

var data = JSON.parse(dataString);
init()
    .then(function(){
        return lenderMatchRecordDao.create(data)
    })
    .then(console.log)
    .catch(console.err)
    .finally(process.exit);
