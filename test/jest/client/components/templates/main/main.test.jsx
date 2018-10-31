import React from 'react'
import { shallow } from 'enzyme'

import Main from 'client/components/templates/main'
import * as helper from 'client/fetch-content-helper'
import { Header } from 'organisms'

describe('Main', () => {
  const disasterAlert = {
    buttonText: 'Learn more',
    description: 'Get information about disaster assistance',
    link: '/disaster-assistance',
    visible: false
  }

  test('should render the happy path', () => {
    const tree = shallow(<Main />)
    tree.setState({ disasterAlert })
    expect(tree).toMatchSnapshot()
  })

  test('should render with a header', () => {
    const tree = shallow(<Main />)
    tree.setState({ disasterAlert })
    expect(tree.find(Header).length).toEqual(1)
  })
})
