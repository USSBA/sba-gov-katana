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

// Does not appear to work with React-Select
// test('MultiSelect render', () => {
//     function handleChange(){
//
//     }
//     const component = renderer.create(
//         <MultiSelect    label="Some Label"
//                         name="somename"
//                         onChange={ handleChange }
//                         getValidationState={ "success" }
//                         value={ "A,B,C"}
//                         options={ ["A","B","C","D","E","F","G","H"] }
//                         autoFocus
//                         required
//                         maxValues={ 3 }>
//         </MultiSelect>
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

jest.mock('../../../../../../src/client/services/utils.js', () => ({
  getLanguageOverride: jest.fn()
}))

function makeValueLikeReactSelectReturnsIt(x) {
  return _.map(x, item => {
    return {
      name: item,
      value: item
    }
  })
}

describe('MultiSelect', () => {
  test('outputs maximum values', () => {
    let lastValue = 'A,B,C'
    function handleChange(newValue) {
      lastValue = newValue
    }

    function simulateChange(component, value) {
      component.find(ReactSelect).simulate('change', makeValueLikeReactSelectReturnsIt(value))
    }

    const component = shallow(
      <MultiSelect
        label="Some Label"
        name="somename"
        onChange={handleChange}
        getValidationState={'success'}
        value={lastValue}
        options={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']}
        autoFocus
        required
        maxValues={3}
      />
    )
    simulateChange(component, ['B'])
    expect(lastValue).toEqual('B')
    simulateChange(component, ['A', 'B'])
    expect(lastValue).toEqual('A,B')
    simulateChange(component, ['A', 'B', 'C'])
    expect(lastValue).toEqual('A,B,C')
    simulateChange(component, ['A', 'B', 'C', 'D'])
    expect(lastValue).toEqual('A,B,C')
  })

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

    const wrapper = component.find('.myselect')
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
    const wrapper = component.find('.myselect')
    expect(wrapper.props().placeholder).toEqual('Select...')
  })
})
