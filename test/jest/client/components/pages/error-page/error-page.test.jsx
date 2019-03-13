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
  test('should render the specified error message when passing in props to the error page', () => {
    const component = shallow(<ErrorPage linkUrl="/events/find" linkMessage="find events page" />)
    const thing = "<a href='/events/find'>find events page</a>"
    expect(component.containsMatchingElement(thing))
  })
})
