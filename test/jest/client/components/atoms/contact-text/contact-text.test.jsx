import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { ContactText } from 'atoms'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

const mockPersonData = {
  emailAddress: {},
  phone: {},
  name: 'U.S. Small Business Administration',
  id: 999
}

let fetchRestContentStub

beforeEach(function() {
  fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
  fetchRestContentStub.mockReturnValue(mockPersonData)
})

afterEach(function() {
  fetchRestContentStub.mockReset()
  cleanup()
})

afterAll(function() {
  fetchRestContentStub.mockRestore()
})

describe('ContactText', () => {
  it('should make a fetchRestContent call for articleContacts is an array containing an id', async () => {
    const articleContacts = [123]

    const { getByTestId } = render(<ContactText articleContacts={articleContacts} />)
    await waitForElement(() => getByTestId('contact info'))

    expect(fetchRestContentStub).toBeCalledTimes(1)
    expect(fetchRestContentStub).toBeCalledWith(articleContacts[0])
  })

  it('should make MULTIPLE fetchRestContent calls for media contact data when the [article] data contains MULTIPLE mediaContacts array of ids', async () => {
    const articleContacts = [123, 456]

    const { getByTestId } = render(<ContactText articleContacts={articleContacts} />)
    await waitForElement(() => getByTestId('contact info'))

    expect(fetchRestContentStub).toBeCalledTimes(2)
    expect(fetchRestContentStub).toHaveBeenNthCalledWith(1, articleContacts[0])
    expect(fetchRestContentStub).toHaveBeenNthCalledWith(2, articleContacts[1])
  })

  it('should default to making a fetchRestContent call using articleContacts instead of officeContact when articleContacts exists', async () => {
    const articleContacts = [123]
    const officeContact = 456

    const { getByTestId } = render(
      <ContactText articleContacts={articleContacts} officeContact={officeContact} />
    )
    await waitForElement(() => getByTestId('contact info'))

    expect(fetchRestContentStub).toBeCalledTimes(1)
    expect(fetchRestContentStub).toBeCalledWith(articleContacts[0])
  })

  it('should make a fetchRestContent call for contact data via the officeContact when articleContacts does not exist', async () => {
    const officeContact = 456

    const { getByTestId } = render(<ContactText officeContact={officeContact} />)
    await waitForElement(() => getByTestId('contact info'))

    expect(fetchRestContentStub).toBeCalledTimes(1)
    expect(fetchRestContentStub).toBeCalledWith(officeContact)
  })

  it('should make a fetchRestContent call for contact data via the officeContact when articleContacts is an empty array', async () => {
    const articleContacts = []
    const officeContact = 456

    const { getByTestId } = render(
      <ContactText articleContacts={articleContacts} officeContact={officeContact} />
    )
    await waitForElement(() => getByTestId('contact info'))

    expect(fetchRestContentStub).toBeCalledTimes(1)
    expect(fetchRestContentStub).toBeCalledWith(officeContact)
  })
})
