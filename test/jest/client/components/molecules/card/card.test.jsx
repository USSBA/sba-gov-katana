import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Card } from 'molecules'

const component = link => (
  <Card
    item={{
      image: {
        alt: 'kitten',
        url: 'https://placekitten.com/588/364'
      },
      link,
      subtitleText: 'A kitten, also known as a kitty or kitty cat, is a juvenile cat',
      titleText: 'Kitten',
      type: 'card'
    }}
    index={0}
    numCards={1}
    parentIndex={4}
  />
)

describe('Card', () => {
  test('to render correctly', () => {
    const tree = renderer
      .create(
        component({
          title: 'Learn more about kittens',
          url: 'https://en.wikipedia.org/wiki/Kitten'
        })
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('to render correctly with null link', () => {
    const tree = renderer
      .create(
        component({
          title: 'null',
          url: null
        })
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('does not error check malformed link', () => {
    const tree = renderer
      .create(
        component({
          title: 'dogs',
          url: 'https:\\dogs'
        })
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('to render correctly if the link is just a string', () => {
    const tree = renderer.create(component('/my-path/my-page')).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render the spanish version correctly if the link is just a string', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?lang=es'
    })

    const tree = renderer.create(component('/my-spanish-path/my-page')).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
