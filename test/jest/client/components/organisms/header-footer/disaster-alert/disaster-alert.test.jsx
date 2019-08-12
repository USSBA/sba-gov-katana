import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { DisasterAlert } from 'organisms'
import Main from 'client/components/templates/main'

const alertProps1 = {
  buttonText: 'Learn more',
  description: 'This is an alert',
  link: 'https://www.sba.gov',
  onClose: () => {
    alert('closed')
  },
  visible: true,
  spanishTranslation: {
    buttonText: 'Aprende más',
    description: 'Esto es una alerta',
    link: 'https://www.sba.gov'
  }
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
  it('should render correctly', () => {
    const tree = renderer.create(<DisasterAlert {...alertProps1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render with its elements', () => {
    const component = mount(<DisasterAlert {...alertProps1} />)
    expect(component.find('#disaster-alert').exists()).toEqual(true)
    expect(component.find('img').exists()).toEqual(true)
    expect(
      component
        .find('.alertLink')
        .at(0)
        .text()
    ).toEqual('Learn more')
  })

  it('should not render', () => {
    const component = mount(<DisasterAlert {...alertProps2} />)
    expect(component.find('#disaster-alert').exists()).toEqual(false)
    expect(component.find('img').exists()).toEqual(false)
    expect(component.find('.alertLink').exists()).toEqual(false)
  })

  it('should handle click event when pressing on the X image', () => {
    window.alert = jest.fn()
    const component = shallow(<DisasterAlert {...alertProps1} />)
    component.find('img').simulate('click')
    expect(window.alert).toHaveBeenCalledWith('closed')
  })

  it('should match snapshot with Spanish content', () => {
    history.pushState({}, null, '?lang=es')

    const component = renderer.create(<DisasterAlert {...alertProps1} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
