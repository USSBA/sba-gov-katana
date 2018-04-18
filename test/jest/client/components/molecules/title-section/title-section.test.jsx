import React, { PropTypes } from 'react'
import { mount } from 'enzyme'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { TitleSection } from 'molecules/title-section/title-section'
// Quiet warnings about OnTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const f = () => {}
const options = {
  context: {
    router: {
      createHref: f,
      getCurrentLocation: () => ({ pathname: '' }),
      go: f,
      goBack: f,
      goForward: f,
      isActive: f,
      push: f,
      replace: f,
      setRouteLeaveHook: f
    }
  },
  childContextTypes: { router: PropTypes.object }
}

describe('Content section', () => {
  test("should render 'Content' word and subject header link texts", () => {
    const component = mount(
      <TitleSection
        location={{ pathname: '/' }}
        title={'List of for partners'}
        summary={'This is a test to check and maintain.'}
        sectionHeaders={[
          { id: 'section-header-0', text: 'Find interlink' },
          { id: 'section-header-2', text: 'Found two' },
          { id: 'section-header-4', text: 'Since 10' }
        ]}
      />,
      options
    )
    const para = component.find('#titleSectionContentId').first()
    const li1 = component.find('#titleSectionLinkId0')
    const li2 = component.find('#titleSectionLinkId1')
    const li3 = component.find('#titleSectionLinkId2')

    expect(para.text()).toBe('Content')
    expect(li1.text()).toBe('Find interlink')
    expect(li2.text()).toBe('Found two')
    expect(li3.text()).toBe('Since 10')
  })
})

describe('Content section', () => {
  test("should not render 'Content' word and any subject header links", () => {
    const component = shallow(
      <TitleSection
        location={{ pathname: '/' }}
        title={'List of for partners'}
        summary={'This is a test to check and maintain.'}
        sectionHeaders={[]}
      />
    )
    const para = component.find('#titleSectionContentId').first()
    const li = component.find('#titleSectionLinkId0')

    expect(para.text()).toBe('')
    expect(li).toHaveLength(0)
  })
})
