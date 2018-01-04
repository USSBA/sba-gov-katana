/* eslint-disable camelcase */
const govDeliveryCountyZip = require('../drupal7/drupal-govdelivery-county-zip.js').govDeliveryCountyZip
const govDeliveryDistrictCounty = require('../drupal7/drupal-govdelivery-district-county.js')
  .govDeliveryDistrictCounty
const _ = require('lodash')

function fetchOneGovDeliveryZipCodeRecord(zipCode) {
  return govDeliveryCountyZip.findOne({
    where: {
      zip_code: zipCode
    }
  })
}

function fetchGovDeliveryDistrictCounties(countyName, stateCode) {
  return govDeliveryDistrictCounty.findAll({
    where: {
      state_code: stateCode,
      county_name: countyName
    }
  })
}

function registerForNewsletter(userEmailAddress, userZipCode) {
  // get zipcode Data
  return fetchOneGovDeliveryZipCodeRecord(userZipCode).then(function(zipCodeRecord) {
    return fetchGovDeliveryDistrictCounties(
      _.replace(zipCodeRecord.county_name, ' County', ''),
      zipCodeRecord.state_code
    )
  })
}

export { registerForNewsletter }
