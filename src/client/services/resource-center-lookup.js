import _ from 'lodash'
import resourceCenters from './resource-centers.json'

const getPartners = (enableResourceCenterOverride = []) => {
  // if enableResourceCenterOverride array is empty
  // return all keys
  // else
  // return filtered keys based on the enableResourceCenterOverride array
  let keys = Object.keys(resourceCenters)
  if (!_.isEmpty(enableResourceCenterOverride)) {
    keys = enableResourceCenterOverride.filter(partner => {
      return keys.find(key => {
        return key === partner ? key : false
      })
    })
  }
  return keys
}

const getPartnerOffices = partner => {
  return resourceCenters[partner]
}

const getOfficesByZip = (partner, zip) => {
  return _.filter(
    module.exports.getPartnerOffices(partner), // We use the module.exports version to ensure it can be mocked
    office => {
      return _.startsWith(office.zip, zip)
    }
  )
}

const getOfficesByState = (partner, state) => {
  return _.filter(
    module.exports.getPartnerOffices(partner), // We use the module.exports version to ensure it can be mocked
    office => {
      return office.state === state
    }
  )
}

export { getPartners, getPartnerOffices, getOfficesByZip, getOfficesByState }
