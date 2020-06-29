import React from 'react'
import { shallow } from 'enzyme'
import styles from '../../../../client/components/organisms/accordion/accordion.scss'

import Accordion from 'organisms/accordion/accordion.jsx'

describe('Accordion', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('sets class to active when clicked and the accordion is closed', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { scrollHeight: 0 } })
    const component = shallow(<Accordion>Content</Accordion>)
    component
      .find('.accordion')
      .first()
      .simulate('click')
    expect(component.find('.active')).toHaveLength(1)
  })

  it('removes the class active when clicked and the accordion is open', () => {
    jest
      .spyOn(React, 'useRef')
      .mockReturnValue({ current: { scrollHeight: 0 } })
      .mockReturnValue({ current: { scrollHeight: 10 } })
    const component = shallow(<Accordion>Content</Accordion>)
    component
      .find('.accordion')
      .first()
      .simulate('click') // open accordion to close it
    component
      .find('.accordion')
      .first()
      .simulate('click') // close accordion.
    expect(component.find('.active')).toHaveLength(0)
  })
})
