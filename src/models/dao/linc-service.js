import { executeNonDrupalQuery } from "../drupal-db.js";

function fetchPendingOrFailedMessagesFromDb() {
  const sqlQuery = "select reg.id, reg.name, reg.phone, reg.emailAddress, reg.businessName, reg.businessZip, reg.industry, reg.industryExperience, " +
    " reg.loanAmount, reg.loanDescription, reg.loanUsage, reg.businessWebsite, reg.businessDescription, reg.hasWrittenPlan, reg.hasFinancialProjections, " +
    "reg.isGeneratingRevenue, reg.isVeteran, res.id as responseId, count(*) as resCount from lenderMatchRegistration reg inner join lenderMatchSoapResponse res on reg.id = res.lenderMatchRegistrationId " +
    "inner join emailConfirmation eco on reg.id = eco.lenderMatchRegistrationId where eco.confirmed is not null and res.processed is null " +
    "and res.updatedAt = (select max(updatedAt) from lenderMatchSoapResponse where lenderMatchRegistrationId = reg.id) and (res.responseCode = 'P' or res.responseCode = 'F') group by responseId having resCount < 5";

  return executeNonDrupalQuery(sqlQuery);
}

export { fetchPendingOrFailedMessagesFromDb };