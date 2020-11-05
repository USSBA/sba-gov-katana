import React from 'react'
import { shallow } from 'enzyme'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'

import * as fetchContentHelper from 'client/fetch-content-helper.js'

import BreakEvenCalculatorPage from 'pages/break-even-calc-landing-page/break-even-calc-landing-page.jsx'
let fetchRestContentStub

describe('BreakEvenCalculatorPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BreakEvenCalculatorPage />)
    expect(wrapper).toHaveLength(1)
  })

  it('calls dashio to get data', async () => {
    global.nodeId = '123'

    fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockReturnValue({})

    const { getByTestId } = render(<BreakEvenCalculatorPage />)
    await waitForElement(() => getByTestId('breakevencalc'))

    expect(fetchRestContentStub).toBeCalledTimes(1)
  })
})
