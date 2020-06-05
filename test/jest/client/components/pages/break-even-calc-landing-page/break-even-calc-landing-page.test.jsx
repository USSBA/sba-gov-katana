import React from 'react'
import { shallow } from 'enzyme'

import BreakEvenCalculatorPage from 'pages/break-even-calc-landing-page/break-even-calc-landing-page.jsx'

describe('BreakEvenCalculatorPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BreakEvenCalculatorPage />)
    expect(wrapper).toHaveLength(1)
  })
})
