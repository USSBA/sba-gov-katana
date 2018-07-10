/* eslint-env jest */
import React from 'react' // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme'

import { Main } from 'client/components/templates/main.jsx'
import { Header } from 'organisms'

let props = {
  location: {
    pathname: '/something'
  }
}

describe('Main', () => {
  test('should render the happy path', () => {
    const tree = shallow(<Main {...props} />)
    expect(tree).toMatchSnapshot()
  })

  test('should render with a header', () => {
    const tree = shallow(<Main {...props} />)
    expect(tree.find(Header).length).toEqual(1)
  })
})
