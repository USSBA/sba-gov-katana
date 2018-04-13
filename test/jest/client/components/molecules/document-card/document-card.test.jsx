/*global expect*/

import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { DetailCard } from 'molecules'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

test('DetailCard renders default data', () => {
  const component = renderer.create(<DetailCard />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('DetailCard renders the title', () => {
  const component = renderer.create(<DetailCard title={'This is a different title'} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('DetailCard renders the summary', () => {
  const component = renderer.create(<DetailCard summary={'This is a different summary'} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('DetailCard renders no activitys when none are given', () => {
  const component = renderer.create(<DetailCard activitys={[]} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('DetailCard renders a single activity', () => {
  const component = renderer.create(<DetailCard activitys={['test1']} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('DetailCard renders a single program', () => {
  const component = renderer.create(<DetailCard programs={['test1']} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
