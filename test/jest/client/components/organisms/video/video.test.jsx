import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'
// const sinon = require('sinon')

import { Video } from 'organisms'

describe('Video Organism', () => {
  test('should render correctly', () => {
    const component = shallow(<Video />)
    expect(component).toMatchSnapshot()
  })

  test('should set title as h2', () => {
    const testProps = {
      id: 21768,
      type: 'video',
      size: 'small',
      title: 'videoTitleTest1',
      youtubeId: 'RW1JN8a30NE'
    }

    const component = renderer.create(
      <Video size={testProps.size} title={testProps.title} youtubeId={testProps.youtubeId} />
    )

    const tree = component.toJSON()
    expect(tree.children[0].type).toBe('h2')
    expect(tree.children[0].children[0]).toBe('videoTitleTest1')
  })

  test('should render with correct url and in an iframe', () => {
    const testProps = {
      id: 21768,
      type: 'video',
      size: 'large',
      title: 'videoTitleTest2',
      youtubeId: '4oE6nEt3uRM'
    }

    const component = renderer.create(
      <Video size={testProps.size} title={testProps.title} youtubeId={testProps.youtubeId} />
    )

    const tree = component.toJSON()
    expect(tree.children[1].children[0].type).toBe('iframe')
    expect(tree.children[1].children[0].props.src).toBe('https://www.youtube.com/embed/4oE6nEt3uRM')
  })

  test('should render with small size class name', () => {
    const testProps = {
      id: 21768,
      type: 'video',
      size: 'small',
      title: 'videoTitleTest3',
      youtubeId: 'EozeSDeV3Vo'
    }

    const component = renderer.create(
      <Video size={testProps.size} title={testProps.title} youtubeId={testProps.youtubeId} />
    )

    const tree = component.toJSON()
    expect(tree.children[1].props.className).toBe('video small')
  })

  test('should render with medium size class name', () => {
    const testProps = {
      id: 21768,
      type: 'video',
      size: 'medium',
      title: 'videoTitleTest4',
      youtubeId: 'EozeSDeV3Vo'
    }

    const component = renderer.create(
      <Video size={testProps.size} title={testProps.title} youtubeId={testProps.youtubeId} />
    )

    const tree = component.toJSON()
    expect(tree.children[1].props.className).toBe('video medium')
  })

  test('should render with large size class name', () => {
    const testProps = {
      id: 21768,
      type: 'video',
      size: 'large',
      title: 'videoTitleTest5',
      youtubeId: 'EozeSDeV3Vo'
    }

    const component = renderer.create(
      <Video size={testProps.size} title={testProps.title} youtubeId={testProps.youtubeId} />
    )

    const tree = component.toJSON()
    expect(tree.children[1].props.className).toBe('video')
  })
})
