/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Waypoint from 'react-waypoint'

import {
  TitleSection,
  BizzieChatbotWidget,
  Breadcrumb,
  PreviousNextSection,
  RemoveMainLoader
} from 'molecules'
import { SectionNav } from 'organisms'
import { listenForOverlap as mockListenForOverlap } from 'element-overlap'
import { BasicPage } from 'templates/basic-page/basic-page.jsx'

const title = 'My Basic Page'
const summary = 'My Basic Page Summary'
const firstPath = { pathname: '/about-sba' }
const secondPath = { pathname: '/business-guide' }
const thirdPath = { pathname: '/funding-programs' }

jest.mock('element-overlap')

describe('BasicPage', () => {
  beforeAll(() => {
    history.pushState({}, null, '?lang=en')
  })

  test('renders default data', () => {
    const component = shallow(<BasicPage title="" summary="" location="" />)
    expect(component.find('.basicpage-mobilenav')).toHaveLength(1)
    expect(component.find('.basicpage-previousnext')).toHaveLength(1)
    expect(component.find('.basicpage-sectionnavigation')).toHaveLength(1)
    expect(component.find('.basicpage-titlesection')).toHaveLength(1)
  })

  test('renders the mobilenav when displayMobileNav state is true', () => {
    const BasicPageComponent = shallow(<BasicPage title="" summary="" location="" />)
    BasicPageComponent.setState({ displayMobileNav: true })
    expect(BasicPageComponent.find('.basicpage-mobilenav').hasClass('hideContainer')).toEqual(true)
  })

  test("doesn't render the mobilenav when displayMobileNav state is false", () => {
    const BasicPageComponent = shallow(<BasicPage title="" summary="" location="" />)
    BasicPageComponent.setState({ displayMobileNav: false })
    expect(BasicPageComponent.find('.basicpage-mobilenav').hasClass('container')).toEqual(true)
  })

  test('render a TitleSection component', () => {
    const BasicPageComponent = shallow(<BasicPage title={title} summary={summary} location={firstPath} />)
    expect(BasicPageComponent.find(TitleSection).length).toEqual(1)
    expect(BasicPageComponent.find(TitleSection).prop('title')).toEqual(title)
    expect(BasicPageComponent.find(TitleSection).prop('summary')).toEqual(summary)
  })

  test("doesn't render a Breadcrumb component when no lineage prop is passed", () => {
    const BasicPageComponent = shallow(<BasicPage title={title} summary={summary} location={secondPath} />)
    expect(BasicPageComponent.find(Breadcrumb).length).toEqual(0)
  })

  test('renders a Breadcrumb component when no lineage prop is passed', () => {
    const lineage = [{ title: 'onelineage', fullUrl: 'http://good.com/good' }]
    const BasicPageComponent = shallow(
      <BasicPage title={title} summary={summary} lineage={lineage} location={firstPath} />
    )
    expect(BasicPageComponent.find(Breadcrumb).length).toEqual(1)
    expect(BasicPageComponent.find(Breadcrumb).prop('items')).toBeDefined()
  })

  test('renders RemoveMainLoader component', () => {
    const BasicPageComponent = shallow(<BasicPage title={title} summary={summary} location={thirdPath} />)
    expect(BasicPageComponent.find(RemoveMainLoader).length).toEqual(1)
  })

  test('renders Waypoint library', () => {
    const BasicPageComponent = shallow(<BasicPage title={title} summary={summary} location={firstPath} />)
    expect(BasicPageComponent.find(Waypoint).length).toEqual(1)
  })

  test('has a section navigation when there is a lineage', () => {
    const lineage = [{ title: 'lineage1', fullUrl: 'http://example.com/lineage1' }]
    const component = shallow(
      <BasicPage title={title} summary={summary} lineage={lineage} location={secondPath} />
    )
    const sectionNav = component.find(SectionNav)

    expect(sectionNav.prop('lineage')).toEqual(lineage)

    expect(sectionNav.prop('position')).toEqual(component.state('currentPosition'))

    expect(sectionNav.prop('displayMobileNav')).toEqual(component.state('displayMobileNav'))

    expect(sectionNav.prop('handleSectionNavigationEnter')).toEqual(
      component.instance.handleSectionNavigationEnter
    )
  })

  test('has no section navigation when there is no lineage', () => {
    const component = shallow(<BasicPage title={title} summary={summary} location={thirdPath} />)
    const sectionNav = component.find(SectionNav)

    expect(sectionNav.length).toEqual(0)
  })

  test('has previous and next buttons when there is a lineage', () => {
    const lineage = [{ title: 'lineage1', fullUrl: 'http://example.com/lineage1' }]
    const component = shallow(
      <BasicPage title={title} summary={summary} lineage={lineage} location={firstPath} />
    )
    const sectionNav = component.find(PreviousNextSection)

    expect(sectionNav.length).toEqual(1)

    expect(sectionNav.prop('lineage')).toEqual(lineage)
  })

  test('has no previous and next buttons when there is no lineage', () => {
    mockListenForOverlap.mockImplementation(() => null)
    const component = shallow(<BasicPage title={title} summary={summary} location={secondPath} />)
    const sectionNav = component.find(PreviousNextSection)

    expect(sectionNav.length).toEqual(0)
  })

  test('has Bizzie Chatbot Widget component rendered on Contact page', () => {
    const component = shallow(
      <BasicPage
        title={title}
        summary={summary}
        location={{ pathname: '/about-sba/organization/contact-sba' }}
      />
    )
    const bizzieChatbot = component.find(BizzieChatbotWidget)

    expect(component.state('displayBizzieBot')).toEqual(true)
    expect(bizzieChatbot.length).toEqual(1)
  })

  test('has Bizzie Chatbot Widget component not rendered when not on Contact page', () => {
    const component = shallow(<BasicPage title={title} summary={summary} location={thirdPath} />)
    const bizzieChatbot = component.find(BizzieChatbotWidget)

    expect(component.state('displayBizzieBot')).toEqual(false)
    expect(bizzieChatbot.length).toEqual(0)
  })
})
