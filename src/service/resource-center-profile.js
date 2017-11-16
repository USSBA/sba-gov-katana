/* eslint-disable id-length,object-property-newline */
import * as ResourceCenterModel from '../models/resource-center-profile.js'
import _ from 'lodash'
import moment from 'moment'
import uuid from 'uuid'
import { isAdministrator } from '../service/user-service.js'
import { formatResourceCenterData } from '../util/formatter.js'

function saveProfile(profile, honeyPotText) {
  if (honeyPotText) {
    console.log('Detected submission with honeypot field filled. Dropping save.')
    return Promise.resolve()
  }
  const newProfile = _.assign({}, profile, {
    id: uuid.v4(),
    timestamp: moment().unix(),
    expertise: formatArray(profile.expertise, 'expertise'),
    services: formatArray(profile.services, 'service'),
    languages: formatArray(profile.languages, 'language')
  })

  return ResourceCenterModel.resourceCenterProfile.create(newProfile, {
    include: [
      {
        model: ResourceCenterModel.resourceCenterHours,
        as: 'hours'
      },
      {
        association: ResourceCenterModel.expertise,
        as: 'expertise'
      },
      {
        association: ResourceCenterModel.services,
        as: 'services'
      },
      {
        association: ResourceCenterModel.languages,
        as: 'languages'
      }
    ]
  })
}

function getProfiles(sessionId) {
  return ResourceCenterModel.resourceCenterProfile
    .findAll({
      order: [['timestamp', 'DESC']],
      attributes: ['name', 'address', 'type', 'timestamp', 'businessStage', 'serviceArea', 'url', 'phone'],
      include: [
        {
          model: ResourceCenterModel.resourceCenterHours,
          as: 'hours',
          attributes: [
            'mondayOpen',
            'mondayClose',
            'mondayOpen',
            'mondayClose',
            'tuesdayOpen',
            'tuesdayClose',
            'wednesdayOpen',
            'wednesdayClose',
            'thursdayOpen',
            'thursdayClose',
            'fridayOpen',
            'fridayClose',
            'saturdayOpen',
            'saturdayClose',
            'sundayOpen',
            'sundayClose'
          ]
        },
        {
          association: ResourceCenterModel.expertise,
          as: 'expertise',
          attributes: ['expertise']
        },
        {
          association: ResourceCenterModel.services,
          as: 'services',
          attributes: ['service']
        },
        {
          association: ResourceCenterModel.languages,
          as: 'languages',
          attributes: ['language']
        }
      ]
    })
    .then(data => {
      if (data && data.length > 0) {
        return formatResourceCenterData(data)
      }
      return ''
    })
}

function formatArray(elements, fieldName) {
  return _.map(elements, element => {
    return _.set({}, fieldName, element)
  })
}

export { saveProfile, getProfiles }
