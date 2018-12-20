/*global expect*/

import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { map } from 'lodash'
import { CardGrid } from 'molecules'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

test('CardGrid renders a simple 3x3 grid', () => {
  const SIZE = 9
  const cards = map(Array(SIZE), (_, i) => ({ text: 'this is card #' + i }))
  const renderCard = ({ text }) => <p>{text}</p>
  const component = renderer.create(<CardGrid cards={cards} renderCard={renderCard} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
