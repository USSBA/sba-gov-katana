import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow } from 'enzyme'
import CounselingEventsPage from 'pages/counseling-events-page/counseling-events-page.jsx'

describe('CounselingEventsPage', () => {
  test('contains one search bar', () => {
    const component = shallow(<CounselingEventsPage />)

    expect(component.find('CounselingEventsSearchBar').length).toEqual(1)
  })
})
