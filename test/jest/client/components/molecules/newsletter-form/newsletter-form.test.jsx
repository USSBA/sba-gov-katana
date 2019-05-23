/* eslint-disable no-undefined */

import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import userEvent from 'user-event'
import { mount, shallow } from 'enzyme'
import { fireEvent, render, wait } from 'react-testing-library'

import { postMiscAction as mockPostMiscAction } from 'client/fetch-content-helper'
import { NewsletterForm } from 'molecules'

jest.mock('client/fetch-content-helper', () => {
  return {
    postMiscAction: jest.fn()
  }
})

jest.mock('client/services/utils')
import { getLanguageOverride } from 'client/services/utils'
getLanguageOverride.mockImplementation(() => 'en')

function setup(state = { isValid: false }) {
  const utils = render(<NewsletterForm />)
  const emailInput = utils.getByLabelText(/email address/i)
  const zipInput = utils.getByLabelText(/zip code/i)

  return {
    emailInput,
    zipInput,
    ...utils
  }
}

describe('NewsletterForm', () => {
  it('should have a title', () => {
    const titleText = 'Sign up for SBA email updates'
    const { getByTestId, getByText } = render(<NewsletterForm title={titleText} />)

    const form = getByTestId('newsletter-form')
    expect(form).toBeInTheDocument()

    const title = getByText(new RegExp(titleText, 'i'))
    expect(title).toBeInTheDocument()
  })

  it('should be disabled with invalid input', () => {
    const { emailInput, zipInput, getByText } = setup()

    fireEvent.change(emailInput, { target: { value: 'mail@mail.com' } })
    // invalid zip code
    fireEvent.change(zipInput, { target: { value: '123' } })

    const button = getByText(/subscribe/i)
    expect(button).toBeDisabled()
  })

  // TODO: Get testing-library to work here instead of Enzyme
  it('should display success state on valid input', async () => {
    // jest.mock('client/fetch-content-helper', () => {
    //   return {
    //     postMiscAction: jest.fn(() => Promise.resolve({ subscriber: 'id' }))
    //   }
    // })

    // const { debug, getByTestId, getByText, emailInput, zipInput, getByLabelText } = setup()
    // const button = getByTestId('button')
    //
    // const mail = 'mail@mail.com'
    //
    // userEvent.type(emailInput, mail)
    //
    // wait for button to be enabled when form is valid
    // await wait(() => expect(button).toBeEnabled())
    //
    // fireEvent.click(button)
    //
    // expect(mockPostMiscAction).toHaveBeenCalled()
    //
    // await wait(() => getByText(/you\'re all done here!/i))

    const wrapper = mount(<NewsletterForm />)
    wrapper.find('#newsletter-email-address').simulate('change', { target: { value: 'mail@mail.com' } })

    // TODO: state does not update with simulate('change', ...)
    wrapper.setState({ isEmailAddressValid: true })

    wrapper.find('form').simulate('submit', { preventDefault: () => ({}) })
    mockPostMiscAction.mockImplementation(() => Promise.resolve({ subscriber: '123' }))
    expect(mockPostMiscAction).toHaveBeenCalled()

    // TODO: state does not update with simulate('submit', ...)
    wrapper.setState({ formState: 'success' })

    expect(wrapper.find('h3').text()).toMatch(/you're all done here!/i)
  })

  it('should display error state on network error', () => {
    const wrapper = mount(<NewsletterForm />)
    wrapper.find('#newsletter-email-address').simulate('change', { target: { value: 'mail@mail.com' } })

    // TODO: state does not update with simulate('change', ...)
    wrapper.setState({ isEmailAddressValid: true })

    wrapper.find('form').simulate('submit', { preventDefault: () => ({}) })
    mockPostMiscAction.mockImplementation(() => {
      throw Error()
    })
    expect(mockPostMiscAction).toThrow()

    // TODO: state does not update with simulate('submit', ...)
    wrapper.setState({ formState: 'error' })

    expect(wrapper.find('h3').text()).toMatch(/sorry, we're having issues/i)
  })
})
