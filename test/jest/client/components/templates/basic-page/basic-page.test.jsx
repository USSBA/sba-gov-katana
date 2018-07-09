/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { TitleSection, Breadcrumb, PreviousNextSection } from 'molecules'
import { SectionNav } from 'organisms'
import BasicPage from 'templates/basic-page/basic-page.jsx'

const title = 'My Basic Page'
const summary = 'My Basic Page Summary'

describe('BasicPage', () => {
  test('renders default data', () => {
    const component = shallow(<BasicPage title="" summary="" />)
    expect(component.find('.basicpage-mobilenav')).toHaveLength(1)
    expect(component.find('.basicpage-previousnext')).toHaveLength(1)
    expect(component.find('.basicpage-sectionnavigation')).toHaveLength(1)
    expect(component.find('.basicpage-titlesection')).toHaveLength(1)
  })

  test('creates a TitleSection component with appropriate props', () => {
    const component = shallow(<BasicPage title={title} summary={summary} />)
    expect(
      component
        .find('.basicpage-titlesection')
        .childAt(0)
        .type()
    ).toBe(TitleSection)
    expect(
      component
        .find('.basicpage-titlesection')
        .childAt(0)
        .prop('title')
    ).toBe(title)
    expect(
      component
        .find('.basicpage-titlesection')
        .childAt(0)
        .prop('summary')
    ).toBe(summary)
  })

  test('creates a Breadcrumb component with appropriate props', () => {
    const component = shallow(
      <BasicPage
        title={title}
        summary={summary}
        lineage={[{ title: 'lineage1', fullUrl: 'http://example.com/lineage1' }]}
      />
    )
    expect(
      component
        .find('.basicpage-breadcrumb')
        .childAt(0)
        .type()
    ).toBe(Breadcrumb)
    expect(
      component
        .find('.basicpage-breadcrumb')
        .childAt(0)
        .prop('items')
    ).toHaveLength(1)
    expect(
      component
        .find('.basicpage-breadcrumb')
        .childAt(0)
        .prop('items')[0].title
    ).toBe('lineage1')
    expect(
      component
        .find('.basicpage-breadcrumb')
        .childAt(0)
        .prop('items')[0].url
    ).toBe('http://example.com/lineage1')
  })
  test('creates an empty breadcrumb div without a lineage', () => {
    const component = shallow(<BasicPage title={title} summary={summary} />)
    expect(
      component
        .find('.basicpage-breadcrumb')
        .childAt(0)
        .type()
    ).toBe('div')
    expect(
      component
        .find('.basicpage-breadcrumb')
        .childAt(0)
        .children()
    ).toHaveLength(0)
  })

  test('has a section navigation when there is a lineage', () => {
    const lineage = [{ title: 'lineage1', fullUrl: 'http://example.com/lineage1' }]
    const component = shallow(<BasicPage title={title} summary={summary} lineage={lineage} />)
    const sectionNav = component.find(SectionNav)

    expect(sectionNav.prop('lineage')).toEqual(lineage)

    expect(sectionNav.prop('position')).toEqual(component.state('currentPosition'))

    expect(sectionNav.prop('displayMobileNav')).toEqual(component.state('displayMobileNav'))

    expect(sectionNav.prop('handleSectionNavigationEnter')).toEqual(
      component.instance.handleSectionNavigationEnter
    )
  })

  test('has no section navigation when there is no lineage', () => {
    const component = shallow(<BasicPage title={title} summary={summary} />)
    const sectionNav = component.find(SectionNav)

    expect(sectionNav.length).toEqual(0)
  })

  test('has previous and next buttons when there is a lineage', () => {
    const lineage = [{ title: 'lineage1', fullUrl: 'http://example.com/lineage1' }]
    const component = shallow(<BasicPage title={title} summary={summary} lineage={lineage} />)
    const sectionNav = component.find(PreviousNextSection)

    expect(sectionNav.length).toEqual(1)

    expect(sectionNav.prop('lineage')).toEqual(lineage)
  })

  test('has no previous and next buttons when there is no lineage', () => {
    const component = shallow(<BasicPage title={title} summary={summary} />)
    const sectionNav = component.find(PreviousNextSection)

    expect(sectionNav.length).toEqual(0)
  })
})
