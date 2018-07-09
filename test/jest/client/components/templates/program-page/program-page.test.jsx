/* eslint-env jest */
import React from 'react' // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme'

import ProgramPage from 'client/components/templates/program-page/program-page.jsx'
import data from './program-page-test-data.json'

describe('ProgramPage', () => {
  test('should render several common paragraphs', () => {
    let heroData = {
      title: data.title,
      summary: data.summary,
      buttons: data.buttons,
      bannerImage: data.bannerImage
    }
    const component = shallow(
      <ProgramPage lineage={[]} heroData={heroData} title={data.title} paragraphs={data.paragraphs} />
    )
    expect(component).toMatchSnapshot()

    // assert that the program page
    let cardData = data.paragraphs.find(paragraph => paragraph.type === 'cardCollection')
    const result = component.find('CardCollection')
    expect(result.length).toEqual(1)
    expect(result.prop('cards')).toEqual(cardData.cards)
  })

  test('should display a Hero with no image', () => {
    let heroData = {
      title: data.title,
      summary: data.summary,
      buttons: data.buttons,
      bannerImage: null
    }
    const tree = shallow(
      <ProgramPage lineage={[]} heroData={heroData} title={data.title} paragraphs={[]} />
    )
    expect(tree).toMatchSnapshot()
  })

  test('should display a Hero with an image', () => {
    let heroData = {
      title: data.title,
      summary: data.summary,
      buttons: data.buttons,
      bannerImage: data.buttons
    }
    const tree = shallow(
      <ProgramPage lineage={[]} heroData={heroData} title={data.title} paragraphs={[]} />
    )
    expect(tree).toMatchSnapshot()
  })
})
