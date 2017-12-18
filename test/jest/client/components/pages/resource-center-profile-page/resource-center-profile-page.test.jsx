import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow } from 'enzyme'

import { ResourceCenterProfilePage } from 'pages/resource-center-profile-page/resource-center-profile-page'
import {
  getPartners,
  getPartnerOffices
} from '../../../../../../src/client/services/resource-center-lookup.js'
import { submitProfile } from '../../../../../../src/client/actions/resource-center-profile'
jest.mock('../../../../../../src/client/services/resource-center-lookup.js')
jest.mock('../../../../../../src/client/actions/resource-center-profile')

const idPrefix = 'resource-center-profile-'
const partners = {
  partner1: [
    {
      name1: 'New York Small Business Development Center ~ State University of New York (SUNY) System',
      name2: 'New York State Small Business Development Center ~ Pace University',
      street1: '163 William Street',
      street2: '16th Floor',
      city: 'New York',
      state: 'NY',
      zip: '10038',
      phone: ''
    }
  ],
  partner2: [
    {
      name1: 'Colorado Small Business Development Center ~ State of Colorado',
      name2: 'Colorado Small Business Development Center ~ Boulder Small Business Development Center',
      street1: '1001 Arapahoe Ave',
      street2: '',
      city: 'Boulder',
      state: 'CO',
      zip: '80302',
      phone: '303-442-1475'
    },
    {
      name1: 'Colorado Small Business Development Center ~ State of Colorado',
      name2: 'Colorado Small Business Development Center ~ Pikes Peak Small Business Development Center',
      street1: '1675 W Garden of the Gods Rd',
      street2: "El Paso County Citizen's Center",
      city: 'Colorado Springs',
      state: 'CO',
      zip: '80907',
      phone: ''
    }
  ]
}

getPartners.mockImplementation(() => {
  return Object.keys(partners)
})

getPartnerOffices.mockImplementation(partner => {
  return partners[partner]
})

describe('ResourceCenterProfilePage', () => {
  test('Office select is hidden until partner is selected and address is hidden until office is selected', () => {
    const component = shallow(<ResourceCenterProfilePage />)
    const selectedPartner = getPartners()[0]
    const selectedOffice = getPartnerOffices(selectedPartner)[0]
    let officeSelect = component.find('#' + idPrefix + 'office')
    let shouldUpdateContactInfo = component.find('#' + idPrefix + 'should-update-contact-info')
    expect(officeSelect.node).toBeUndefined()
    expect(shouldUpdateContactInfo.node).toBeUndefined()
    const partnerSelect = component.find('#' + idPrefix + 'partner')
    partnerSelect.simulate('change', { value: selectedPartner })
    officeSelect = component.find('#' + idPrefix + 'office')
    expect(officeSelect.node).toBeDefined()
    shouldUpdateContactInfo = component.find('#' + idPrefix + 'should-update-contact-info')
    expect(shouldUpdateContactInfo.node).toBeUndefined()
    officeSelect.simulate('change', { value: selectedOffice })
    shouldUpdateContactInfo = component.find('#' + idPrefix + 'should-update-contact-info')
    expect(shouldUpdateContactInfo.node).toBeDefined()
  })

  test('Entering non-optional fields allows form to be submitted', () => {
    const component = shallow(<ResourceCenterProfilePage />)
    const selectedPartner = getPartners()[1]
    const selectedOffice = getPartnerOffices(selectedPartner)[1]
    const partnerSelect = component.find('#' + idPrefix + 'partner')
    partnerSelect.simulate('change', { value: selectedPartner })
    const officeSelect = component.find('#' + idPrefix + 'office')
    officeSelect.simulate('change', { value: selectedOffice })
    const shouldUpdateContactInfo = component.find('#' + idPrefix + 'should-update-contact-info')
    shouldUpdateContactInfo.simulate('change', true)
    const url = component.find('#' + idPrefix + 'url')
    url.simulate('change', { target: { name: 'url', value: 'http://www.google.com' } })
    const serviceArea = component.find('#' + idPrefix + 'service-area')
    serviceArea.simulate('change', { value: 'Entire Nation' })
    const expertiseCheckbox = component.find('#' + idPrefix + 'Networking')
    //not sure why this is not working, manually calling for now
    expertiseCheckbox.simulate('change', { target: { checked: true, name: 'Networking' } })
    component.instance().handleCheckbox({ target: { checked: true, name: 'Networking' } }, 'expertise')

    const businessStage = component.find('#' + idPrefix + 'business-stage')
    businessStage.simulate('change', 'New and early stage businesses')
    const servicesCheckbox = component.find('#' + idPrefix + 'Appointments')
    // not sure why this is not working, manually calling for now
    servicesCheckbox.simulate('change', { target: { checked: true, name: 'Appointments' } })
    component.instance().handleCheckbox({ target: { checked: true, name: 'Appointments' } }, 'services')

    const submit = component.find('#' + idPrefix + 'form-submit-button')
    submit.simulate('click')
    const errorMsg = component.find('FormErrorMessage')
    expect(errorMsg.node).toBeUndefined()
    expect(component.instance().state.profile).toMatchSnapshot()
  })

  test('Missing required fields causes error to show', () => {
    const component = shallow(<ResourceCenterProfilePage />)

    const submit = component.find('#' + idPrefix + 'form-submit-button').parent()
    submit.simulate('click', { preventDefault: () => {} })
    const errorMsg = component.find('FormErrorMessage')
    expect(errorMsg.node).toBeDefined()
    expect(errorMsg.node).toMatchSnapshot()
  })

  test('Getting isSubmitted=true response causes message to display', () => {
    const component = shallow(<ResourceCenterProfilePage isSubmitComplete={true} />)
    const submissionMsg = component.find('#' + idPrefix + 'submission-complete')
    expect(submissionMsg.node).toBeDefined()
    expect(submissionMsg.node).toMatchSnapshot()
  })
})
