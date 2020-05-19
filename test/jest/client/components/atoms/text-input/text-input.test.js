import React from 'react'
import { TextInput } from 'atoms'
import { shallow, mount } from 'enzyme'

describe('TextInput', () => {
  const onBlurMock = jest.fn()
  const onFocusMock = jest.fn()
  const onChangeMock = jest.fn()
  const validationMock = jest.fn()
  const mockProps = {
    id: 'zip',
    errorText: 'All your base are belong to me',
    label: 'Zip Code',
    name: 'zip',
    onChange: onChangeMock,
    value: '',
    onBlur: onBlurMock,
    onFocus: onFocusMock,
    validationFunction: validationMock
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Events', () => {
    it('calls the passed onChange function with event', () => {
      const wrapper = shallow(<TextInput {...mockProps} />)
      wrapper.find('input').simulate('change', { target: { value: '20012' } })
      expect(onChangeMock).toHaveBeenCalledWith({ target: { value: '20012' } })
    })

    it('sets the component state with new value', () => {
      const wrapper = shallow(<TextInput {...mockProps} />)
      wrapper.find('input').simulate('change', { target: { value: '20012' } })
      expect(wrapper.state('value')).toEqual('20012')
    })

    it('calls the passed onFocus handler', () => {
      const wrapper = shallow(<TextInput {...mockProps} />)
      wrapper.find('input').prop('onFocus')()
      expect(onFocusMock).toHaveBeenCalledTimes(1)
    })

    it('calls sets isFocused in component state', () => {
      const wrapper = shallow(<TextInput {...mockProps} />)
      wrapper.find('input').prop('onFocus')()
      expect(wrapper.state('isFocused')).toBe(true)
    })
  })

  describe('Validation', () => {
    it('calls the validation function on mount', () => {
      const wrapper = shallow(<TextInput {...mockProps} />)
      expect(validationMock).toHaveBeenCalledWith('')
      expect(validationMock).toHaveBeenCalledTimes(1)
    })

    describe('icons', () => {
      it('Shows success icon based on validation state', () => {
        const wrapper = shallow(<TextInput {...mockProps} validationState="success" />)
        const validationIcon = wrapper.find('ValidationIcon')
        expect(validationIcon.prop('showSuccessIcon')).toBe(true)
        expect(validationIcon.dive().find('.fa-check-circle')).toHaveLength(1)
      })

      it('Does not show success icon when showSuccessIcon is set to false', () => {
        const wrapper = shallow(
          <TextInput {...mockProps} validationState="success" showSuccessIcon={false} />
        )
        const validationIcon = wrapper.find('ValidationIcon')
        expect(validationIcon.prop('showSuccessIcon')).toBe(false)
        expect(validationIcon.dive().find('.fa-check-circle')).toHaveLength(0)
      })

      it('Does not show success icon when validation state is empty string', () => {
        const wrapper = shallow(<TextInput {...mockProps} validationState="" showSuccessIcon={false} />)
        const validationIcon = wrapper.find('ValidationIcon')
        expect(validationIcon.prop('showSuccessIcon')).toBe(false)
        expect(validationIcon.dive().find('.fa-check-circle')).toHaveLength(0)
      })

      it('Shows error icon based on validation state', () => {
        const wrapper = mount(<TextInput {...mockProps} validationState="error" showErrorIcon={true} />)
        const validationIcon = wrapper.find('ValidationIcon')
        expect(validationIcon.prop('showErrorIcon')).toBe(true)
        expect(wrapper.find('.fa-exclamation-circle')).toHaveLength(1)
        wrapper.setProps({ validationState: 'success' })
        wrapper.update()
        expect(wrapper.find('.fa-exclamation-circle')).toHaveLength(0)
      })
    })

    describe('error message', () => {
      it('Returns error message if validation state is error', () => {
        const wrapper = shallow(<TextInput {...mockProps} validationState="error" />)
        expect(wrapper.find('FormErrorMessage')).toHaveLength(1)
      })

      it('Returns error message when isValid state is false', () => {
        const wrapper = shallow(<TextInput {...mockProps} />)
        wrapper.setState({ isValid: false })
        expect(wrapper.find('FormErrorMessage')).toHaveLength(1)
      })

      it('Shows the passed error message', () => {
        const wrapper = shallow(<TextInput {...mockProps} />)
        wrapper.setState({ isValid: false })
        expect(wrapper.find('FormErrorMessage').prop('errorText')).toEqual(mockProps.errorText)
      })

      it('Doesn not show error message by default', () => {
        const wrapper = shallow(<TextInput {...mockProps} />)
        expect(wrapper.find('FormErrorMessage')).toHaveLength(0)
      })
    })
  })
  describe('Views', () => {
    it('doesn not render html if isVisible is set to false', () => {
      const wrapper = shallow(<TextInput {...mockProps} isVisible={false} />)
      expect(wrapper.find('div')).toHaveLength(0)
    })
  })
})
