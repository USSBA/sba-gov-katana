/* eslint-disable camelcase */
import config from 'config'
const govDeliveryCountyZip = require('../drupal7/drupal-govdelivery-county-zip.js').govDeliveryCountyZip
const govDeliveryDistrictCounty = require('../drupal7/drupal-govdelivery-district-county.js')
  .govDeliveryDistrictCounty
const _ = require('lodash')

function fetchOneGovDeliveryZipCodeRecord(zipCode) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve({})
  } else {
    return govDeliveryCountyZip.findOne({
      where: {
        zip_code: zipCode
      }
    })
  }
}

function fetchGovDeliveryDistrictCounties(countyName, stateCode) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve({})
  } else {
    return govDeliveryDistrictCounty.findAll({
      where: {
        state_code: stateCode,
        county_name: countyName
      }
    })
  }
}

function registerForNewsletter(userEmailAddress, userZipCode) {
  if (config.get('developmentOptions.devMode')) {
    return Promise.resolve({})
  } else {
    // get zipcode Data
    return fetchOneGovDeliveryZipCodeRecord(userZipCode).then(function(zipCodeRecord) {
      return fetchGovDeliveryDistrictCounties(
        _.replace(zipCodeRecord.county_name, ' County', ''),
        zipCodeRecord.state_code
      )
    })
  }
}

export { registerForNewsletter }
