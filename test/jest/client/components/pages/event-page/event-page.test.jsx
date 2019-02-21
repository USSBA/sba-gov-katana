import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import EventPage from 'pages/event-page/event-page.jsx'

const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

describe('Event Page', () => {
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

  test('should render the 404 if not id is given', () => {
    const component = shallow(<EventPage />)
    const result = component.find('ErrorPage')
    const expected = 1
    expect(result).toHaveLength(expected)
  })

  // test('should render the 404 if the event is not found', async () => {
  //   fetchRestContentStub.returns(null)
  //   const component = shallow(<EventPage id="12345" />)
  //   console.log(component.html())
  //   await waitForAsync();
  //   console.log(component.html())
  //   const result = component.find("ErrorPage")
  //   const expected = 1
  //   expect(result).toHaveLength(expected)
  // })

  // test('should render the 404 if the event is not found', async () => {
  //   let eventData = {title: "This is a title"};
  //   fetchRestContentStub.returns(eventData)
  //   const component = shallow(<EventPage id="12345" />)
  //   console.log(component.html())
  //   await waitForAsync();
  //   console.log(component.html())
  //   const result = component.find("EventData")
  //   const expected = 1
  //   expect(result.prop('eventData')).toBe(eventData)
  // })
})
