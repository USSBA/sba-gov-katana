/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { ProgramDetailsCardCollection } from 'organisms'

function makeTestDataItem(itemNumber) {
  return {
    title: `Title ${itemNumber}`,
    url: `title-${itemNumber}`,
    fullUrl: `/section/subsction/title-${itemNumber}`,
    description: null,
    summary: `Summary ${itemNumber}`,
    node: `10${itemNumber}`,
    weight: -50,
    spanishTranslation: {
      title: `Título ${itemNumber}`,
      fullUrl: `titulo-${itemNumber}`,
      description: null,
      summary: `Resumen ${itemNumber}`
    }
  }
}

const testData = [makeTestDataItem(0), makeTestDataItem(1), makeTestDataItem(2), makeTestDataItem(3)]

describe('ProgramDetailsCardCollection', () => {
  test('should render the default cards', () => {
    const component = renderer.create(<ProgramDetailsCardCollection />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render nothing when given nothing', () => {
    const component = shallow(<ProgramDetailsCardCollection cards={null} />)
    expect(component.contains('CardCollection')).toEqual(false)
  })

  test('should render english by default', () => {
    const component = shallow(<ProgramDetailsCardCollection cards={testData} />)
    const cardsPropertyToCardCollection = component.find('CardCollection').prop('cards')
    // eslint-disable-next-line no-magic-numbers
    expect(cardsPropertyToCardCollection.length).toEqual(4)
    expect(cardsPropertyToCardCollection[0].titleText).toEqual('Title 0')
    expect(cardsPropertyToCardCollection[0].subtitleText).toEqual('Summary 0')
  })

  test('should render the spanish translation when the language is set', () => {
    const component = shallow(<ProgramDetailsCardCollection cards={testData} currentLanguage="es" />)
    const cardsPropertyToCardCollection = component.find('CardCollection').prop('cards')
    // eslint-disable-next-line no-magic-numbers
    expect(cardsPropertyToCardCollection.length).toEqual(4)
    expect(cardsPropertyToCardCollection[0].titleText).toEqual('Título 0')
    expect(cardsPropertyToCardCollection[0].subtitleText).toEqual('Resumen 0')
  })
})
