/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react'
/*eslint-enable no-unused-vars*/
import ReactSelect from 'react-select'
import { MultiSelect } from 'atoms'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { getLanguageOverride } from '../../../../../../src/client/services/utils.js'

jest.mock('../../../../../../src/client/services/utils.js', () => ({
  getLanguageOverride: jest.fn()
}))

describe('MultiSelect', () => {
  test('placeholder value renders in Spanish', () => {
    getLanguageOverride.mockReturnValueOnce('es')
    const component = shallow(
      <MultiSelect
        label="Good label"
        name="select"
        options={['Z1', 'N2', 'T1', 'A1']}
        autoFocus
        multi={false}
      />
    )

    const wrapper = component.find('Select')
    expect(wrapper.props().placeholder).toEqual('Selecciona...')
  })

  test('placeholder value renders in English', () => {
    const component = shallow(
      <MultiSelect
        label="Good label"
        name="select"
        options={['Z1', 'N2', 'T1', 'A1']}
        autoFocus
        multi={false}
      />
    )
    const wrapper = component.find('Select')
    expect(wrapper.props().placeholder).toEqual('Select...')
  })
})
