import { govDeliveryCountyZip } from "../drupal-govdelivery-county-zip.js";
import { govDeliveryDistrictCounty } from "../drupal-govdelivery-district-county.js";
import _ from "lodash";


function fetchOneGovDeliveryZipCodeRecord(zipCode) {
  return govDeliveryCountyZip.findOne(
    {
      where: {
        zip_code: zipCode //eslint-disable-line camelcase
      }
    }
  );
}

function fetchGovDeliveryDistrictCounties(countyName, stateCode) {
  return govDeliveryDistrictCounty.findAll(
    {
      where: {
        state_code: stateCode, //eslint-disable-line camelcase
        county_name: countyName //eslint-disable-line camelcase
      }
    }
  );
}

function registerForNewsletter(userEmailAddress, userZipCode) {
  //get zipcode Data
  return fetchOneGovDeliveryZipCodeRecord(userZipCode)
    .then(function(zipCodeRecord) {
      return fetchGovDeliveryDistrictCounties(_.replace(zipCodeRecord.county_name, " County", ""), zipCodeRecord.state_code); //eslint-disable-line camelcase
    })
    .then(function(govDeliveryDistrictCounties) {
      console.log(govDeliveryDistrictCounties);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export { registerForNewsletter, fetchOneGovDeliveryZipCodeRecord };