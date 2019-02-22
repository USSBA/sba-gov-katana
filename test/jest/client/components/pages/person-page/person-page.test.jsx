import React from 'react'
import renderer from 'react-test-renderer'
import { render, shallow } from 'enzyme'
var sinon = require('sinon')

import * as helper from 'client/fetch-content-helper'
import PersonPage from 'pages/person-page/person-page.jsx'

const officeProps = [
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

const personProps = [
  {
    bio:
      'Mr. Brandon Ton (pronounced “ton”) is the District Director for the SBA’s Alabama District Office, which is based in Birmingham.  He began his duties as District Director in June 2008.\r\n\r\nIn his role as District Director, Mr. Todt oversees a professional staff of 10 in the delivery of SBA’s Financial Assistance, Entrepreneurial Development, Business Training, Government Contracting and other marketing and outreach programs throughout Alabama’s 67 counties. This delivery network includes 10 Small Business Development Centers, six SCORE chapters, three Women’s Business Centers, four Certified Development Companies and dozens of lending institutions.\r\n\r\nBefore his appointment as Alabama District Director, Mr. Todt served as a contractor performing geographic information systems analysis at the Alabama Army National Guard Training Center at Fort McClellan.  He is a former US Army Officer, having served for almost twelve years on active duty in armor, military police and personnel administration roles, with duty assignments in Colorado, Texas, Alabama and Germany. His military and civilian awards include the Meritorious Service Medal and the Alabama Commendation Medal.\r\n\r\nHe also has twelve years experience in community and economic development including Manager of Marketing, Research and Economic Development, and later as Executive Vice President for a county-wide chamber of commerce in Alabama. He was also the Executive Director for a city-wide retail and commercial recruitment/promotion entity.\r\n\r\nAn Anniston native, Mr. Todt is a former small business person, having owned and operated a full service marketing firm in northeast Alabama, as well as working in several sales and marketing positions with small businesses.   He holds a Bachelor’s Degree in Marketing from the University of Alabama, and is a graduate of Leadership Calhoun County and the US Chamber of Commerce Institutes for Organization Management. \r\n\r\nMr. Todt has served as chair of the State of Alabama Business Education Advisory Committee, a member of the Vocational Education State Courses of Study Committee, and a board member of the Alabama Chamber of Commerce Executives Association, as well as many other business, chamber of commerce and community initiatives.',
    emailAddress: 'thomas.todt@sba.gov',
    fax: '202-292-3808',
    firstName: {},
    lastName: {},
    office: 6386,
    officeTitle: 'Alabama District Office',
    phone: '205-290-7009',
    picture: {
      alt: 'image of Thomas Todt',
      src: '/sites/default/files/2019-02/Bio_Photo2.jpg'
    },
    title: 'District Director',
    type: 'person',
    url: '/person/thomas-todt',
    name: 'Thomas A. Todt',
    id: 6375,
    updated: 1550178957,
    created: 1526585495,
    langCode: 'en'
  }
]

describe('Person page', () => {
  let fetchSiteContentStub
  beforeEach(done => {
    fetchSiteContentStub = sinon.stub(helper, 'fetchSiteContent')
    done()
  })

  afterEach(done => {
    fetchSiteContentStub.restore()
    done()
  })

  test('renders person page correctly', async () => {
    // fetchSiteContentStub.returns(Promise.resolve(personProps))
    fetchSiteContentStub.withArgs('officesRaw').returns(Promise.resolve(officeProps))
    fetchSiteContentStub.withArgs('persons').returns(Promise.resolve(personProps))
    const component = await shallow(<PersonPage location={{ pathname: '/person/thomas-todt/' }} />)
    // const tree = component.toJSON()
    expect(component).toMatchSnapshot()
  })
})
