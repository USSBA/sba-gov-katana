import React from 'react'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import ErrorPage from 'pages/error-page/error-page.jsx'

const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

describe('Error Page', () => {
  let fetchRestContentStub
  beforeAll(() => {
    fetchRestContentStub = sinon.stub(fetchContentHelper, 'fetchRestContent')
  })

  beforeEach(() => {})

  afterEach(() => {
    fetchRestContentStub.reset()
  })

  afterAll(() => {
    fetchRestContentStub.restore()
  })

  test('should render the general error message when no error type is provided', () => {
    const component = shallow(<ErrorPage />)
    const thing = "<a href='/'>home page</a>"
    expect(component.containsMatchingElement(thing))
  })
  test('should render the event error message when the event error type is provided', () => {
    const component = shallow(<ErrorPage type="event" />)
    const thing = "<a href='/events/find'>find events page</a>"
    expect(component.containsMatchingElement(thing))
  })
  test('should render the general error message when an undefined error type is provided', () => {
    const component = shallow(<ErrorPage type="foo" />)
    const thing = "<a href='/'>home page</a>"
    expect(component.containsMatchingElement(thing))
  })
})
