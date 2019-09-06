import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, fireEvent, render, waitForElement, wait } from 'react-testing-library'
import { shallow } from 'enzyme'
import axiosMock from 'axios'
import 'jest-dom/extend-expect'
import Person from 'templates/person/person.jsx'

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
  const mockBlogData = []

  for (let i = 0; i < size; i++) {
    const mockBlog = {
      id: i,
      author: 6386,
      blogBody: [],
      blogCategory: 'Industry Word',
      blogTags: 'Starting a Business',
      summary: 'Seventh blog summary. Some stuff goes here for description.',
      type: 'blog',
      title: `Test Blog Title ${i}`,
      updated: 1556828290,
      created: 1556828259,
      langCode: 'en',
      url: '/blog/test-blog-title'
    }
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
    const headingText = heading.getElement().props.children
    expect(headingText).toEqual('Thomas A. Todt')
  })

  test('Subcomponent, ContactCard, renders correctly', () => {
    const component = shallow(<Person personData={personPropsWithoutPhoto} />)
    const subComponent = component.find('ContactCard')
    const subComponentProps = subComponent.getElement().props

    expect(Object.keys(subComponentProps).length).toEqual(4)
    expect(subComponentProps.phoneNumber).toEqual('205-290-7009')
    expect(subComponentProps.email).toEqual('thomas.todt@sba.gov')
  })

  test('renders person image and alt text', () => {
    const component = shallow(<Person personData={personPropsWithPhoto} />)
    const imgProps = component.find('.person-page img').getElement().props

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
      const mockBlogResponse = {
        response: 200,
        data: { total: 0, blogs: [] }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { queryByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      expect(queryByTestId('blog-section')).toBeNull()
    })

    test('renders the blog section when the person is a blog author', async () => {
      const blogData = makeAnySizeBlogArray(1)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getAllByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogSection = await waitForElement(() => getAllByTestId('blog-section'))

      expect(blogSection.length).toEqual(1)
    })

    test('displays header titled "Blog posts"', async () => {
      const blogData = makeAnySizeBlogArray(1)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogHeader = await waitForElement(() => getByTestId('blog-section-header'))

      expect(blogHeader).toHaveTextContent('Blog posts')
    })

    // first card collection will render row 1 with 3 cards
    test('displays number of blog posts returned from api when posts are between 1 - 3 (inclusive)', async () => {
      const blogData = makeAnySizeBlogArray(3)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getAllByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogSection = await waitForElement(() => getAllByTestId('card'))

      expect(blogSection.length).toEqual(mockBlogResponse.data.total)
    })

    // second card collection will render row 2 with 3 cards
    test('displays number of blog posts returned from api when posts are between 4 - 6 (inclusive)', async () => {
      const blogData = makeAnySizeBlogArray(6)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getAllByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const blogSection = await waitForElement(() => getAllByTestId('card'))

      expect(blogSection.length).toEqual(mockBlogResponse.data.total)
    })

    test('paginates forward and back', async () => {
      const blogData = makeAnySizeBlogArray(7)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const paginationText = await waitForElement(() => getByTestId('showing results text'))
      const paginationPrevious = await waitForElement(() => getByTestId('previous button'))
      const paginationNext = await waitForElement(() => getByTestId('next button'))

      const expectedTextPage1 = /^Showing 1 - 6 of 7$/
      const expectedTextPage2 = /^Showing 7 - 7 of 7$/

      // Paging forward
      expect(paginationText).toHaveTextContent(expectedTextPage1)
      fireEvent.click(paginationNext)
      await wait(() => getByTestId('showing results text'))
      expect(paginationText).toHaveTextContent(expectedTextPage2)

      // Paging back
      fireEvent.click(paginationPrevious)
      await wait(() => getByTestId('showing results text'))
      expect(paginationText).toHaveTextContent(expectedTextPage1)
    })

    test('prevents pagination back from page 1', async () => {
      const blogData = makeAnySizeBlogArray(1)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const paginationText = await waitForElement(() => getByTestId('showing results text'))
      const paginationPrevious = await waitForElement(() => getByTestId('previous button'))

      const expectedTextPage1 = /^Showing 1 - 1 of 1$/

      // Paging back
      fireEvent.click(paginationPrevious)
      await wait(() => getByTestId('showing results text'))
      expect(paginationText).toHaveTextContent(expectedTextPage1)
    })

    test('prevents pagination forward from last page of results', async () => {
      const blogData = makeAnySizeBlogArray(1)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)

      const { getByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const paginationText = await waitForElement(() => getByTestId('showing results text'))
      const paginationNext = await waitForElement(() => getByTestId('next button'))

      const expectedTextPage1 = /^Showing 1 - 1 of 1$/

      // Paging forward
      fireEvent.click(paginationNext)
      await wait(() => getByTestId('showing results text'))
      expect(paginationText).toHaveTextContent(expectedTextPage1)
    })

    test('displays different blog posts on each page', async () => {
      const blogData = makeAnySizeBlogArray(12)
      const mockBlogResponse = {
        response: 200,
        data: { total: blogData.length, blogs: blogData }
      }

      axiosMock.get.mockResolvedValueOnce(mockBlogResponse)
      const { getAllByTestId, getByTestId } = render(<Person personData={personPropsWithoutPhoto} />)
      const paginationNext = await waitForElement(() => getByTestId('next button'))
      let titles = await waitForElement(() => getAllByTestId('card title'))

      // page 1 should show first set of 6 blog posts numbered 0 - 5
      titles.forEach((title, index) => {
        const expectedBlogTitle = `Test Blog Title ${index}`
        expect(title).toHaveTextContent(expectedBlogTitle)
      })

      // paginate to page 2 and wait for titles to update
      fireEvent.click(paginationNext)
      titles = await waitForElement(() => getAllByTestId('card title'))

      // page 2 should show second set of 6 blog posts numbered 6 - 11
      titles.forEach((title, index) => {
        const indexOffset = index + 6
        const expectedBlogTitle = `Test Blog Title ${indexOffset}`
        expect(title).toHaveTextContent(expectedBlogTitle)
      })
    })
  })
})
