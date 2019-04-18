import React, { PropTypes } from 'react'
import renderer from 'react-test-renderer'
import sinon from 'sinon'
import { mount, shallow } from 'enzyme'

import * as helper from 'client/fetch-content-helper'
import PersonLookupPage from 'pages/person-lookup-page/person-lookup-page'

const offices = [
  {
    leadership: {},
    location: [
      {
        id: 7834,
        type: 'location',
        city: 'Anniston',
        email: null,
        fax: null,
        geocode: {
          id: 11250,
          type: 'geocode',
          latitude: '33.6287355',
          longitude: '-85.7899686'
        },
        hoursOfOperation: 'Monday through Friday from 8:00 AM to 4:30 PM',
        name: 'Northeast Alabama Entrepreneurial System (NEAES)',
        phoneNumber: '256-831-5315',
        state: 'AL',
        streetAddress: '1400 Commerce Blvd, NE',
        zipCode: 36207
      }
    ],
    mediaContact: {},
    officeService: {},
    officeType: 'SCORE Business Mentor',
    pims: {},
    relatedDisaster: {},
    summary: {},
    website: {},
    type: 'office',
    title: 'Anniston SCORE',
    id: 5864,
    updated: 1512486691,
    created: 1512486624,
    langCode: 'en'
  },
  {
    leadership: null,
    location: [
      {
        id: 9881,
        type: 'location',
        city: 'Birmingham',
        email: 'alabama@sba.gov',
        fax: '205-290-7404',
        geocode: {
          id: 17739,
          type: 'geocode',
          latitude: '33.4332812',
          longitude: '-86.847321'
        },
        hoursOfOperation: 'Monday through Friday from 8 a.m. to 4:30 p.m.',
        name: 'Birmingham District Office',
        phoneNumber: '205-290-7101',
        state: 'AL',
        streetAddress: '2 North 20th Street Suite #325',
        zipCode: 35203
      },
      {
        id: 9883,
        type: 'location',
        city: 'Mobile',
        email: null,
        fax: null,
        geocode: {
          id: 17835,
          type: 'geocode',
          latitude: '30.6676914',
          longitude: '-88.1324229'
        },
        hoursOfOperation: 'Monday through Friday from 8 a.m. to 4:30 p.m.',
        name: 'Mobile Alternate Work Site',
        phoneNumber: '270-816-3543',
        state: 'AL',
        streetAddress: '1141 Montlimar Drive suite 1007 ',
        zipCode: 36609
      }
    ],
    mediaContact: 6381,
    officeService: {},
    officeType: 'SBA District Office',
    pims: {
      id: null,
      type: 'pims',
      location: null
    },
    relatedDisaster: {},
    summary: {},
    website: {
      url: '/offices/district/al/birmingham',
      title: ''
    },
    type: 'office',
    title: 'Alabama District Office',
    id: 6386,
    updated: 1548954819,
    created: 1526587109,
    langCode: 'en'
  }
]

const persons = [
  {
    bio: {},
    emailAddress: 'sabrina.abousaleh@sba.gov',
    fax: '202-481-0249',
    firstName: 'Sabrina',
    highResolutionPhoto: {},
    lastName: 'Abousaleh',
    office: {
      id: 6452,
      name: 'Nevada District Office',
      type: 'SBA District Office'
    },
    phone: '702-388-6683',
    picture: {},
    title: 'Administrative Officer',
    type: 'person',
    name: 'Sabrina Abousaleh ',
    id: 6861,
    updated: 1551806327,
    created: 1527675968,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Elizabeth.abreu@sba.gov',
    fax: {},
    firstName: 'Elizabeth',
    highResolutionPhoto: {},
    lastName: 'Abreu',
    office: {
      id: 6444,
      name: 'New York District Office',
      type: 'SBA District Office'
    },
    phone: '212-264-2736',
    picture: {},
    title: 'Economic Development Specialist',
    type: 'person',
    name: 'Elizabeth Abreu',
    id: 6907,
    updated: 1551805206,
    created: 1527676002,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Eric.adams@sba.gov',
    fax: {},
    firstName: 'Eric',
    highResolutionPhoto: {},
    lastName: 'Adams',
    office: {
      id: 6406,
      name: 'San Francisco District Office',
      type: 'SBA District Office'
    },
    phone: '415-744-8440',
    picture: {},
    title: 'District Counsel',
    type: 'person',
    name: 'Eric Adams',
    id: 6560,
    updated: 1551900198,
    created: 1527675743,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'james.aldea@sba.gov',
    fax: {},
    firstName: 'James',
    highResolutionPhoto: {},
    lastName: 'Aldea',
    office: {
      id: 6404,
      name: 'Sacramento District Office',
      type: 'SBA District Office'
    },
    phone: '916-735-1707',
    picture: {},
    title: 'Business Opportunity Specialist',
    type: 'person',
    name: 'James Aldea',
    id: 6530,
    updated: 1551900459,
    created: 1527675721,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'gary.alexander@sba.gov',
    fax: '202-481-6565',
    firstName: 'Gary',
    highResolutionPhoto: {},
    lastName: 'Alexander',
    office: {
      id: 6427,
      name: 'St. Louis District Office',
      type: 'SBA District Office'
    },
    phone: '314-539-6612',
    picture: {},
    title: 'Business Opportunity Specialist',
    type: 'person',
    name: 'Gary Alexander',
    id: 6842,
    updated: 1551806640,
    created: 1527675954,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: {},
    fax: {},
    firstName: 'Rina',
    highResolutionPhoto: {},
    lastName: 'Alston',
    office: {
      id: 6403,
      name: 'Los Angeles District Office',
      type: 'SBA District Office'
    },
    phone: '818-552-3201',
    picture: {},
    title: 'Administrative Officer',
    type: 'person',
    name: 'Rina Alston',
    id: 6516,
    updated: 1551901062,
    created: 1527675710,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'michael.altamirano@sba.gov',
    fax: {},
    firstName: 'Michael',
    highResolutionPhoto: {},
    lastName: 'Altamirano',
    office: {
      id: 6450,
      name: 'New Mexico District Office',
      type: 'SBA District Office'
    },
    phone: '505-248-8243',
    picture: {},
    title: 'Lender Relations Specialist',
    type: 'person',
    name: 'Michael Altamirano ',
    id: 6890,
    updated: 1551805927,
    created: 1527675990,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Frank.Alvarado@sba.gov',
    fax: '202-481-3540',
    firstName: 'Frank',
    highResolutionPhoto: {},
    lastName: 'Alvarado',
    office: {
      id: 6408,
      name: 'Connecticut District Office',
      type: 'SBA District Office'
    },
    phone: '203-335-0427',
    picture: {},
    title: 'Sr. Area Manager / Veterans Affairs Officer',
    type: 'person',
    name: 'Frank Alvarado',
    id: 6590,
    updated: 1551899910,
    created: 1527675765,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Joseph.Amato@sba.gov',
    fax: '202-481-0028',
    firstName: 'Joseph',
    highResolutionPhoto: {},
    lastName: 'Amato',
    office: {
      id: 6452,
      name: 'Nevada District Office',
      type: 'SBA District Office'
    },
    phone: '702-388-6611',
    picture: {},
    title: 'District Director',
    type: 'person',
    name: 'Joseph P. Amato',
    id: 6859,
    updated: 1551806342,
    created: 1527675967,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Romualdo.ancog@sba.gov',
    fax: '313-226-4769',
    firstName: 'Romualdo',
    highResolutionPhoto: {},
    lastName: 'Ancog',
    office: {
      id: 6424,
      name: 'Michigan District Office ',
      type: 'SBA District Office'
    },
    phone: '313-324-3604',
    picture: {},
    title: 'Lead Lender Relations Specialist',
    type: 'person',
    name: 'Romualdo Ancog',
    id: 6798,
    updated: 1551809644,
    created: 1527675920,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'martin.anderson@sba.gov',
    fax: {},
    firstName: 'Martin',
    highResolutionPhoto: {},
    lastName: 'Anderson',
    office: {
      id: 6415,
      name: 'Indiana District Office',
      type: 'SBA District Office'
    },
    phone: '317-226-7272 x111 ',
    picture: {},
    title: 'Deputy District Director',
    type: 'person',
    name: 'Martin Anderson',
    id: 6711,
    updated: 1551898500,
    created: 1527675855,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Billie.Anderson@sba.gov',
    fax: {},
    firstName: 'Billie',
    highResolutionPhoto: {},
    lastName: 'Anderson',
    office: {
      id: 6388,
      name: 'Arizona District Office',
      type: 'SBA District Office'
    },
    phone: '928-532-0034',
    picture: {},
    title: 'Senior Area Manager Northern Arizona',
    type: 'person',
    name: 'Billie Anderson  ',
    id: 6483,
    updated: 1551901550,
    created: 1527675685,
    langCode: 'en'
  },
  {
    bio: {},
    emailAddress: 'Billie.Anderson@sba.gov',
    fax: {},
    firstName: 'Billie',
    highResolutionPhoto: {},
    lastName: 'Anderson',
    office: {
      id: 6388,
      name: 'Arizona District Office',
      type: 'SBA District Office'
    },
    phone: '928-532-0034',
    picture: {},
    title: 'Senior Area Manager Northern Arizona',
    type: 'person',
    name: 'Billie Anderson  ',
    id: 6484,
    updated: 1551901550,
    created: 1527675685,
    langCode: 'en'
  }
]

const location = { pathname: '/person' }

describe('PersonLookupPage', () => {
  let stub

  beforeEach(() => {
    stub = sinon.stub(helper, 'fetchSiteContent')
    stub.withArgs('persons').resolves(persons)
  })

  afterEach(() => stub.restore())

  it('should render correctly', () => {
    const component = renderer.create(<PersonLookupPage location={location} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render 12 results by default', () => {
    const component = mount(<PersonLookupPage location={location} />)
    component.setState({ isLoading: false, initialPersons: persons, persons })

    const expectedLength = 12
    expect(component.find('DetailCardCollection').children()).toHaveLength(expectedLength)
  })

  it('should add query parameters to the pathname after applying filters', () => {
    history.pushState = jest.fn()

    const component = shallow(<PersonLookupPage location={location} />)
    component.setState({ persons })
    component.find('form').simulate('submit', { preventDefault: () => ({}) })

    const expectedPathname = '/person?pageNumber=1&pageSize=12&office=all&order=ascending'
    // compare the third argument to history.pushState() (or the only argument
    // to browserHistory.push) with the expected argument
    expect(history.pushState.mock.calls[0][2]).toEqual(expectedPathname)
  })
})
