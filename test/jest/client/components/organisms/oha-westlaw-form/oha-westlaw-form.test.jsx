import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'
const sinon = require('sinon')

import { OHAWestlawForm } from 'organisms'

describe.only('OHA Westlaw Form', () => {
  let spyChangeLocation

  beforeEach(() => {
    spyChangeLocation = sinon.spy(OHAWestlawForm.prototype, 'changeLocation')
  })

  afterEach(() => {
    spyChangeLocation.restore()
  })

  test('should render correctly', () => {
    const component = shallow(<OHAWestlawForm />)
    expect(component).toMatchSnapshot()
  })

  test('should generate correct URL for Appeal Number Form', () => {
    const expectedValue = 'https://govt.westlaw.com/sbaoha/Search/Results?t_Method=tnc&t_querytext=CI(5248)'
    const component = mount(<OHAWestlawForm onSubmit={spyChangeLocation} />)

    const input = component.find('#appeal-number-textbox')
    input.simulate('change', { target: { name: 'appealNumber', value: 5248 } })

    const button = component.find('#appeal-number-submit')
    button.simulate('submit')

    expect(spyChangeLocation.args[0][0]).toEqual(expectedValue)
  })

  test('should generate correct URL for Appellant Name Form', () => {
    const expectedValue = 'https://govt.westlaw.com/sbaoha/Search/Results?t_Method=tnc&t_querytext=TI(ACME)'
    const component = mount(<OHAWestlawForm onSubmit={spyChangeLocation} />)

    const input = component.find('#appellant-name-textbox')
    input.simulate('change', { target: { name: 'appellantName', value: 'ACME' } })

    const button = component.find('#appellant-name-submit')
    button.simulate('submit')

    expect(spyChangeLocation.args[0][0]).toEqual(expectedValue)
  })

  test('should generate correct URL for Plain Text Search Form', () => {
    const expectedValue =
      'https://govt.westlaw.com/sbaoha/Search/Results?t_Method=win&t_querytext=ostensible%20subcontractor'
    const component = mount(<OHAWestlawForm onSubmit={spyChangeLocation} />)

    const input = component.find('#win-textbox')
    input.simulate('change', { target: { name: 'winText', value: 'ostensible subcontractor' } })

    const button = component.find('#win-text-submit')
    button.simulate('submit')

    expect(spyChangeLocation.args[0][0]).toEqual(expectedValue)
  })

  test('should generate correct URL for Boolean Search with Field Limits Form', () => {
    const expectedValue =
      'https://govt.westlaw.com/sbaoha/Search/Results?t_Method=tnc&t_querytext=134.202(d)%26%20pr(BDP!%20MSB!)%26%20da(last%203%20months)'
    const component = mount(<OHAWestlawForm onSubmit={spyChangeLocation} />)

    const input = component.find('#tnc-textbox')
    input.simulate('change', { target: { name: 'tncText', value: '134.202(d)' } })
    input.simulate('change', { target: { name: 'tncDecisionType', value: 'BDP! MSB!' } })
    input.simulate('change', { target: { name: 'tncDate', value: 'last 3 months' } })

    const button = component.find('#tnc-text-submit')
    button.simulate('submit')

    expect(spyChangeLocation.args[0][0]).toEqual(expectedValue)
  })
})
