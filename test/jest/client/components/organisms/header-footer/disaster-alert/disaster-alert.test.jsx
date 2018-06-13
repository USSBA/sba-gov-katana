import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { DisasterAlert } from 'organisms'
import Main from 'client/components/templates/main.jsx'

const alertProps1 = {
  buttonText: 'Learn more',
  description: 'This is an alert',
  link: 'https://www.sba.gov',
  onClose: () => {
    alert('closed')
  },
  visible: true
}

const alertProps2 = {
  buttonText: 'Click here',
  description: 'This is a message',
  link: 'https://www.code.gov',
  onClose: () => {
    alert('close')
  },
  visible: false
}

describe('Disaster Alert', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<DisasterAlert {...alertProps1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render with its elements', () => {
    const component = mount(<DisasterAlert {...alertProps1} />)
    expect(component.find('#disaster-alert').exists()).toEqual(true)
    expect(component.find('img').exists()).toEqual(true)
    expect(component.find('.alertLink').text()).toEqual('Learn more')
  })

  test('should not render', () => {
    const component = mount(<DisasterAlert {...alertProps2} />)
    expect(component.find('#disaster-alert').exists()).toEqual(false)
    expect(component.find('img').exists()).toEqual(false)
    expect(component.find('.alertLink').exists()).toEqual(false)
  })

  test('should handle click event when pressing on the X image', () => {
    window.alert = jest.fn()
    const component = shallow(<DisasterAlert {...alertProps1} />)
    component.find('img').simulate('click')
    expect(window.alert).toHaveBeenCalledWith('closed')
  })
})
