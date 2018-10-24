import React from 'react'
import renderer from 'react-test-renderer'
import sinon from 'sinon'
import { mount } from 'enzyme'

import { DropdownMenu } from 'organisms'
import { TEN_STEPS_CALLOUTS_TRANSLATIONS } from 'client/translations'

const props = {
  links: [
    {
      linkTitle: 'Plan your business',
      link: '/business-guide/plan-your-business'
    }
  ]
}

describe('dropdown menu', () => {
  const { navigation: NAV_TRANSLATION } = TEN_STEPS_CALLOUTS_TRANSLATIONS

  it('renders with the 10 steps CTA in English', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?lang=en'
    })

    const component = mount(<DropdownMenu {...props} />)
    const headline = component.find('.callToAction h6').text()
    const expected = NAV_TRANSLATION['en']['headline']
    expect(headline).toBe(expected)
  })

  it('renders with the 10 steps CTA in Spanish', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?lang=es'
    })

    const component = mount(<DropdownMenu {...props} />)
    const headline = component.find('.callToAction h6').text()
    const expected = NAV_TRANSLATION['es']['headline']
    expect(headline).toBe(expected)
  })
})
