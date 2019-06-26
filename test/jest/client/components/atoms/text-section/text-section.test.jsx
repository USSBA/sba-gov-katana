/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import { TextSection } from 'atoms'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

describe('TextSection', () => {
  test('should render a simple paragraph', () => {
    const text = '<p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render several paragraphs', () => {
    const text = '<p>test</p><p>test</p><p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render several paragraphs with an unordered list in the middle', () => {
    const text = '<p>test</p><ul><li>1</li>1<li></li></ul><p>test</p>'
    const component = renderer.create(<TextSection text={text} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('.parseTables(text)', () => {
    test('should add classes onto table tag', () => {
      const text =
        '<p>You\'ll need to get a federal license or permit if your business activities are regulated by a federal agency.</p> <table> <thead> <tr> <th scope="col">Business activity</th> <th scope="col">Description</th> <th scope="col">Issuing agency</th> </tr> </thead> <tbody> <tr> <td>Agriculture</td> <td>If you import or transport animals, animal products, biologics, biotechnology or plants across state line.</td> <td><a href="https://www.aphis.usda.gov/aphis/resources/permits">U.S. Department of Agriculture</a></td> </tr> <tr> <td>Alcoholic beverages</td> <td>If you manufacture, wholesale, import, or sell alcoholic beverages at a retail location.</td> <td> <p><a href="https://www.ttb.gov/ponl/permits-online.shtml">Alcohol and Tobacco Tax and Trade Bureau</a></p> <p><a href="http://www.ttb.gov/wine/control_board.shtml">Local Alcohol Beverage Control Board</a></p> </td> </tr> </tbody> </table> <p>Check to see if any of your business activities are listed here.</p>'
      const expected =
        '<p>You\'ll need to get a federal license or permit if your business activities are regulated by a federal agency.</p> <table class="text-section-table"> <thead> <tr> <th scope="col">Business activity</th> <th scope="col">Description</th> <th scope="col">Issuing agency</th> </tr> </thead> <tbody> <tr> <td><div class="table-header-label">Business activity:</div><div class="table-data-wrapper">Agriculture</div></td> <td><div class="table-header-label">Description:</div><div class="table-data-wrapper">If you import or transport animals, animal products, biologics, biotechnology or plants across state line.</div></td> <td><div class="table-header-label">Issuing agency:</div><div class="table-data-wrapper"><a href="https://www.aphis.usda.gov/aphis/resources/permits">U.S. Department of Agriculture</a></div></td> </tr> <tr> <td><div class="table-header-label">Business activity:</div><div class="table-data-wrapper">Alcoholic beverages</div></td> <td><div class="table-header-label">Description:</div><div class="table-data-wrapper">If you manufacture, wholesale, import, or sell alcoholic beverages at a retail location.</div></td> <td><div class="table-header-label">Issuing agency:</div><div class="table-data-wrapper"> <p><a href="https://www.ttb.gov/ponl/permits-online.shtml">Alcohol and Tobacco Tax and Trade Bureau</a></p> <p><a href="http://www.ttb.gov/wine/control_board.shtml">Local Alcohol Beverage Control Board</a></p> </div></td> </tr> </tbody> </table> <p>Check to see if any of your business activities are listed here.</p>'
      const result = TextSection.prototype.parseTables(text)
      expect(result).toEqual(expected)
    })

    test('should add external-link-marker onto anchor tag with a non-government link', () => {
      const text =
        '<p>You\'ll need to get a federal license or permit if your business activities are regulated by a federal agency. <a href="https://www.google.com">External Link</a></p>'
      const expected =
        '<p>You\'ll need to get a federal license or permit if your business activities are regulated by a federal agency. <a href="https://www.google.com" class="external-link-marker">External Link</a></p>'
      const result = TextSection.prototype.parseTables(text)
      expect(result).toEqual(expected)
    })
  })
})
