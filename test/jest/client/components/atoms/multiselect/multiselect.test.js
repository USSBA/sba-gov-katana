/*global expect*/

/*eslint-disable no-unused-vars*/
import React from 'react'
/*eslint-enable no-unused-vars*/
import ReactSelect from 'react-select'
import { MultiSelect } from 'atoms'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import _ from 'lodash'

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

function makeValueLikeReactSelectReturnsIt(x) {
  return _.map(x, item => {
    return {
      value: item
    }
  })
}

test('MultiSelect maximum values', () => {
  let lastValue = 'A,B,C'
  function handleChange(newValue) {
    lastValue = newValue
  }

  function simulateChange(component, value) {
    component
      .find(ReactSelect)
      .simulate('change', makeValueLikeReactSelectReturnsIt(value))
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
