/*global expect*/

import React from 'react'
import renderer from 'react-test-renderer'
import _ from 'lodash'
import { shallow } from 'enzyme'

import { DocumentArticleLookup } from 'organisms'
import { MultiSelect } from 'atoms'

const submit = jest.fn()
const reset = jest.fn()
const queryChange = jest.fn()
const pageChange = jest.fn()

const lookupProps = {
  title: 'This is a title',
  queryState: {},
  items: [
    {
      name: 'Obi-Wan Kenobi',
      title: 'Master',
      lightsaberColor: 'Green',
      age: '40',
      type: 'document'
    },
    {
      name: 'Luke Skywalker',
      title: 'Knight',
      lightsaberColor: 'Blue',
      age: '20',
      type: 'document'
    },
    {
      name: 'Yoda',
      title: 'Master',
      lightsaberColor: 'Green',
      age: '900',
      type: 'document'
    },
    {
      name: 'Bastilla Shan',
      title: 'Knight',
      lightsaberColor: 'Yellow',
      age: '24',
      type: 'document'
    }
  ],
  itemCount: 42,
  pageNumber: 2,
  pageSize: 4,
  taxonomies: [
    {
      name: 'Title',
      terms: ['Padawan', 'Knight', 'Master']
    },
    {
      name: 'LightsaberColor',
      terms: ['Red', 'Green', 'Blue', 'Yellow']
    },
    {
      name: 'Movie',
      terms: ['I', 'II', 'III', 'IV', 'V', 'VI']
    },
    {
      name: 'Status',
      terms: ['Alive', 'Dead', 'Force Ghost']
    }
  ],
  onSubmit: submit,
  onReset: reset,
  onQueryChange: queryChange,
  onPageChange: pageChange,
  isFetching: false,
  fieldsToShowInDetails: ['Name', 'LightsaberColor'],
  type: 'jedi'
}
describe('DocumentArticleLookup', () => {
  test('should render with all the information', () => {
    const props = _.clone(lookupProps)
    const component = renderer.create(<DocumentArticleLookup {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should fire the submit when the apply button is pressed ', () => {
    const props = _.clone(lookupProps)
    const component = shallow(<DocumentArticleLookup {...props} />)
    component.find('Button').simulate('click')
    expect(submit).toBeCalled()
  })

  test('should move All to the top of the MultiSelect options list', () => {
    const props = _.clone(lookupProps)
    props.taxonomies = [
      {
        name: 'Program',
        terms: ['Padawan', 'Knight', 'All', 'Master']
      }
    ]

    const component = shallow(<DocumentArticleLookup {...props} />)
    expect(component.find(MultiSelect)).toHaveLength(1)

    const options = component
      .find(MultiSelect)
      .first()
      .prop('options')
    expect(options[0].label).toBe('All')
    expect(options[0].value).toBe('All')
  })

  test('should sort All to the top of the MultiSelect options list', () => {
    const props = _.clone(lookupProps)
    props.taxonomies = [
      {
        name: 'Program',
        terms: ['All', 'Padawan', 'Knight', 'Master']
      }
    ]

    const component = shallow(<DocumentArticleLookup {...props} />)
    expect(component.find(MultiSelect)).toHaveLength(1)

    const options = component
      .find(MultiSelect)
      .first()
      .prop('options')
    expect(options[0].label).toBe('All')
    expect(options[0].value).toBe('All')
  })

  test('should not include All in the MultiSelect options list', () => {
    const props = _.clone(lookupProps)
    props.taxonomies = [
      {
        name: 'Program',
        terms: ['Padawan', 'Knight', 'Master']
      }
    ]

    const component = shallow(<DocumentArticleLookup {...props} />)
    expect(component.find(MultiSelect)).toHaveLength(1)

    const options = component
      .find(MultiSelect)
      .first()
      .prop('options')
    expect(options.map(term => term.label)).not.toContain('All')
    expect(options.map(term => term.value)).not.toContain('All')
  })
  //
  // test('should show important data properly ', () => {
  //   let props = _.clone(lookupProps);
  //   const component = shallow(<DocumentArticleLookup {...props}/>);
  //   expect(component.find("Paginator").prop("pageNumber")).toEqual(props.pageNumber);
  // });
  test('should render with SBA Offices when provided', () => {
    const props = _.clone(lookupProps)
    props.sbaOffices = [
      {
        value: 1,
        label: 'aaaaa'
      },
      {
        value: 2,
        label: 'bbbbb'
      }
    ]
    const component = renderer.create(<DocumentArticleLookup {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should properly render the page with SBA offices', () => {
    const props = _.clone(lookupProps)
    props.sbaOffices = [
      {
        value: 1,
        label: 'aaaaa'
      },
      {
        value: 2,
        label: 'bbbbb'
      }
    ]
    const component = shallow(<DocumentArticleLookup {...props} />)
    expect(component.find(MultiSelect)).toHaveLength(5)
    const options = component
      .find(MultiSelect)
      .last()
      .prop('options')
    expect(options[0].label).toBe('aaaaa')
    expect(options[0].value).toBe(1)
  })
})
