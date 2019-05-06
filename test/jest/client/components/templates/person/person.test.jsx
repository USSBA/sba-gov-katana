import React from 'react'
import renderer from 'react-test-renderer'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { shallow } from 'enzyme'

import Person from 'templates/person/person.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

const personPropsWithPhoto = {
  bio:
    'Mr. Brandon Ton (pronounced “ton”) is the District Director for the SBA’s Alabama District Office, which is based in Birmingham.  He began his duties as District Director in June 2008.\r\n\r\nIn his role as District Director, Mr. Todt oversees a professional staff of 10 in the delivery of SBA’s Financial Assistance, Entrepreneurial Development, Business Training, Government Contracting and other marketing and outreach programs throughout Alabama’s 67 counties. This delivery network includes 10 Small Business Development Centers, six SCORE chapters, three Women’s Business Centers, four Certified Development Companies and dozens of lending institutions.\r\n\r\nBefore his appointment as Alabama District Director, Mr. Todt served as a contractor performing geographic information systems analysis at the Alabama Army National Guard Training Center at Fort McClellan.  He is a former US Army Officer, having served for almost twelve years on active duty in armor, military police and personnel administration roles, with duty assignments in Colorado, Texas, Alabama and Germany. His military and civilian awards include the Meritorious Service Medal and the Alabama Commendation Medal.\r\n\r\nHe also has twelve years experience in community and economic development including Manager of Marketing, Research and Economic Development, and later as Executive Vice President for a county-wide chamber of commerce in Alabama. He was also the Executive Director for a city-wide retail and commercial recruitment/promotion entity.\r\n\r\nAn Anniston native, Mr. Todt is a former small business person, having owned and operated a full service marketing firm in northeast Alabama, as well as working in several sales and marketing positions with small businesses.   He holds a Bachelor’s Degree in Marketing from the University of Alabama, and is a graduate of Leadership Calhoun County and the US Chamber of Commerce Institutes for Organization Management. \r\n\r\nMr. Todt has served as chair of the State of Alabama Business Education Advisory Committee, a member of the Vocational Education State Courses of Study Committee, and a board member of the Alabama Chamber of Commerce Executives Association, as well as many other business, chamber of commerce and community initiatives.',
  emailAddress: 'thomas.todt@sba.gov',
  fax: '202-292-3808',
  firstName: {},
  lastName: {},
  office: {
    id: 6386,
    name: 'Alabama District Office',
    type: 'SBA District Office'
  },
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

const personPropsWithoutPhoto = {
  bio: 'Bio of Thomas Todt',
  emailAddress: 'thomas.todt@sba.gov',
  office: {
    id: 6386,
    name: 'Alabama District Office',
    type: 'SBA District Office'
  },
  picture: {},
  phone: '205-290-7009',
  title: 'District Director',
  type: 'person',
  url: '/person/thomas-todt',
  name: 'Thomas A. Todt',
  id: 6375,
  updated: 1550178957,
  created: 1526585495,
  langCode: 'en'
}

function makeAnySizeBlogArray(size) {
  const mockBlog = {
    author: 6386,
    blogBody: [],
    blogCategory: 'Industry Word',
    blogTags: 'Starting a Business',
    summary: 'Seventh blog summary. Some stuff goes here for description.',
    type: 'blog',
    title: 'Test Blog Title',
    id: 18746,
    updated: 1556828290,
    created: 1556828259,
    langCode: 'en',
    url: '/blog/test-blog-title'
  }

  const mockBlogData = []
  let i
  for (i = 0; i < size; i++) {
    mockBlogData.push(mockBlog)
  }

  return mockBlogData
}

afterEach(cleanup)

describe('Person page', () => {
  test('renders correctly', () => {
    const component = renderer.create(<Person personData={personPropsWithPhoto} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('heading renders correct text', () => {
    const component = shallow(<Person personData={personPropsWithPhoto} />)
    const heading = component.find('h1')
    const headingText = heading.node.props.children
    expect(headingText).toEqual('Thomas A. Todt')
  })

  test('Subcomponent, ContactCard, renders correctly', () => {
    const component = shallow(<Person personData={personPropsWithoutPhoto} />)
    const subComponent = component.find('ContactCard')
    const subComponentProps = subComponent.node.props
    expect(Object.keys(subComponentProps).length).toEqual(3)
    expect(subComponentProps.phoneNumber).toEqual('205-290-7009')
    expect(subComponentProps.email).toEqual('thomas.todt@sba.gov')
  })

  test('renders person image and alt text', () => {
    const component = shallow(<Person personData={personPropsWithPhoto} />)
    const imgProps = component.find('.person-page img').node.props

    expect(component.find('.person-page img').length).toEqual(1)
    expect(imgProps.alt).toEqual('image of Thomas Todt')
    expect(imgProps.src).toEqual('/sites/default/files/2019-02/Bio_Photo2.jpg')
  })

  test("doesn't render person image", () => {
    const component = shallow(<Person personData={personPropsWithoutPhoto} />)
    expect(component.find('.person-page img').length).toEqual(0)
  })

  describe('Blog section', () => {
    test('does NOT render the blog section when the person is NOT a blog author', async () => {
      const mockBlogResponse = { total: 0, blogs: [] }

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub.mockImplementation(() => Promise.resolve(mockBlogResponse))

      const { queryByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      expect(queryByTestId('blog-section')).toBeNull()
    })

    test('renders the blog section when the person is a blog author', async () => {
      const blogData = makeAnySizeBlogArray(1)
      const mockBlogResponse = { total: blogData.length, blogs: blogData }

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub.mockImplementation(() => Promise.resolve(mockBlogResponse))

      const { getAllByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogSection = await waitForElement(() => getAllByTestId('blog-section'))

      expect(blogSection.length).toEqual(1)
    })

    test('blog section contains header titled "Blog posts"', async () => {
      const blogData = makeAnySizeBlogArray(1)
      const mockBlogResponse = { total: blogData.length, blogs: blogData }

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub.mockImplementation(() => Promise.resolve(mockBlogResponse))

      const { getByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogHeader = await waitForElement(() => getByTestId('blog-section-header'))

      expect(blogHeader.innerHTML).toBe('Blog posts')
    })

    test('blog section displays number of posts returned from api when posts are between 1 - 3 (inclusive)', async () => {
      const blogData = makeAnySizeBlogArray(3)
      const mockBlogResponse = { total: blogData.length, blogs: blogData }

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub.mockImplementation(() => Promise.resolve(mockBlogResponse))

      const { getAllByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogSection = await waitForElement(() => getAllByTestId('card'))

      expect(blogSection.length).toEqual(mockBlogResponse.total)
    })

    test('blog section displays number of posts returned from api when posts are between 4 - 6 (inclusive)', async () => {
      const blogData = makeAnySizeBlogArray(6)
      const mockBlogResponse = { total: blogData.length, blogs: blogData }

      const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
      fetchSiteContentStub.mockImplementation(() => Promise.resolve(mockBlogResponse))

      const { getAllByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogSection = await waitForElement(() => getAllByTestId('card'))

      expect(blogSection.length).toEqual(mockBlogResponse.total)
    })
  })
})
