import React from 'react'
import { QuickLinks } from 'client/components/molecules/quick-links/quick-links.jsx'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

jest.mock('client/services/client-config.js', function() {
  return {
    googleAnalytics: {
      enabled: false
    }
  }
})

const fetchContentIfNeeded = jest.fn()

describe('QuickLinks', () => {
  test('to match snapshot', () => {
    const testProps = {
      actions: {
        fetchContentIfNeeded: fetchContentIfNeeded
      },
      navigation: {
        locationChange: {}
      }
    }

    const mockItem = {
      type: 'quickLinks',
      typeOfLinks: [
        {
          type: 'documentLookup',
          documentActivity: [],
          documentProgram: ['CDC/504'],
          documentType: ['SOP'],
          sectionHeaderText: 'SOPs'
        },
        {
          type: 'documentLookup',
          documentActivity: [],
          documentProgram: ['7(a)'],
          documentType: ['Information notice'],
          sectionHeaderText: 'Policy guidance'
        },
        {
          type: 'ratesList',
          rate: [
            {
              type: 'rate',
              name: 'SBA LIBOR Base Rate',
              percent: 4.08
            },
            {
              type: 'rate',
              name: 'SBA Peg Rate',
              percent: 6.08
            },
            {
              type: 'rate',
              name: 'SBA FIXED Base Rate',
              percent: 2.625
            }
          ],
          sectionHeaderText: 'Rates'
        },
        {
          type: 'articleLookup',
          articleProgram: null,
          sectionHeaderText: 'Articles'
        }
      ]
    }

    const component = renderer.create(
      <QuickLinks data={mockItem} {...testProps} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
