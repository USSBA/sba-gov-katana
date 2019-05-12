/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/reducers'
import 'jest-dom/extend-expect'
import BlogPage from 'pages/blog-page/blog-page.jsx'
import * as fetchContentHelper from 'client/fetch-content-helper.js'

const mockBlogData = {
  author: 18024,
  blogBody: [
    {
      id: 20260,
      type: 'blogPost',
      blogSectionImage: {},
      blogSectionText:
        '<p>Working in the <a href="https://www.sba.gov/offices/headquarters/oit">Office of International Trade</a> at the <a href="https://www.sba.gov/">Small Business Administration</a> (SBA), we are inspired every time we hear a successful export story from an U.S. small business. &nbsp;This is particularly true when they have used the services of SBA or one of our Federal or state partners in export promotion.&nbsp;</p>\r\n\r\n<p>That is one of the reasons why the SBA will be participating in the 2019 National Small Business Exporter Summit taking place April 9 in Savannah, Georgia.&nbsp; The National Small Business Exporter Summit is a unique training and networking event that features actual small business exporters sharing their success stories with other small businesses, educators, counselors, and stakeholders.</p>\r\n\r\n<p>It is an excellent forum to learn about international trade from <a href="///C:/Users/JHDavis/AppData/Local/Packages/Microsoft.MicrosoftEdge_8wekyb3d8bbwe/TempState/Downloads/nasbite.org/annual-conference/wp-content/uploads/2019/03/2019-Summit-Presenter-Honoree-Writeups-3-23-19.pdf">top small and medium-sized exporters</a> from across the United States. &nbsp;Sessions will highlight best-practices and lessons learned that have contributed to each company’s export success. &nbsp;Summit attendees will leave armed with insights into practical tools, techniques, strategies, and resources they can leverage to guide export expansion.&nbsp;</p>\r\n\r\n<p>Federal government agencies that promote exporting opportunities provide impactful services for small businesses selling to international customers.&nbsp;&nbsp; Still, as much as we try to get the word out, the best testimony for our services come from real small business exporters.&nbsp; And there are several Commerce Export Award winners and SBA Exporters of the Year in the mix of honorees and presenters at this year’s event.</p>\r\n\r\n<p>Again, SBA will be there, along with other Federal export service providers.&nbsp; So, if you do make it, please come visit us in the exhibition area.&nbsp; We look forward to partnering with you to reach new markets and find global customers.&nbsp;</p>\r\n\r\n<p>If you are interested, <a href="https://nasbite.org/annual-conference/registration/">register online here</a>.</p>\r\n\r\n<p>If you cannot attend, the SBA and our federal partners have programs to help you expand into new markets.&nbsp; Here are a few resources to assist you with growing your business through international sales:</p>\r\n\r\n<ul>\r\n\t<li>To assess your current export readiness, check out these <a href="https://www.mbda.gov/news/blog/2013/09/export-readiness-assessment-tools">Export Readiness Assessment Tools</a>.</li>\r\n\t<li>Visit <a href="https://www.export.gov/How-to-Export">Export.gov</a> for videos with tips to getting started and links to other resources available to small business exporters and those aspiring to sell products and services overseas.</li>\r\n\t<li>Need help with your export business planning?&nbsp; Consult with your local <a href="https://www.sba.gov/local-assistance/find/?type=Small%20Business%20Development%20Center&amp;pageNumber=1">Small Business Development Center</a> (SBDC).</li>\r\n\t<li>Are you an established exporter looking to expand into new foreign markets?&nbsp; The Department of Commerce staffs <a href="https://2016.export.gov/usoffices/index.asp">U.S. Export Assistance Centers</a> around the country that provide assistance with market research and entry.</li>\r\n\t<li>Already have export business that needs financing?&nbsp; Reach out to one of our <a href="https://www.sba.gov/managing-business/exporting/us-export-assistance-centers%20">SBA International Trade Finance Specialists</a> at U.S. Export Assistance Centers around the country.</li>\r\n</ul>\r\n'
    }
  ],
  blogCategory: 'SBA News and Views',
  blogTags: 'International',
  office: {},
  summary: 'Some stuff',
  type: 'blog',
  title: 'Fearless',
  id: 1,
  updated: 1554483661,
  created: 1554414745,
  langCode: 'en',
  url: '/blog/18343'
}

const mockAuthorData = {
  bio: '<p>this is a bio</p>\r\n',
  emailAddress: 'everett.woodeljr@sba.gov',
  fax: '202-481-4845',
  firstName: 'Everette',
  highResolutionPhoto:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Linda_McMahon_official_photo.jpg/440px-Linda_McMahon_official_photo.jpg',
  lastName: 'Woodel',
  office: 6443,
  phone: '614-469-6860 ext 287',
  picture: {},
  shortBio: 'this is a short bio',
  title: 'District Director',
  type: 'person',
  url: '/person/everett-m-woodel-jr',
  name: 'Everett M. Woodel Jr.',
  id: 18024,
  updated: 1556029460,
  created: 1549300944,
  langCode: 'en'
}

const fetchRestContentStubCallback = ({ node, id }) => {
  let result
  if (id === 18024) {
    result = Object.assign({}, mockAuthorData)
  } else {
    result = Object.assign({}, mockBlogData)
  }
  return result
}

afterEach(cleanup)

describe('Blog page', () => {
  it('renders blog content when BlogPage receives data back from the api', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockImplementation(fetchRestContentStubCallback)

    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )

    expect(fetchRestContentStub).toHaveBeenCalledTimes(1)

    const content = await waitForElement(() => getByTestId('blog-content'))
    expect(content).toBeInTheDocument()

    fetchRestContentStub.mockRestore()
  })

  it('renders error page when BlogPage receives null data back from the api', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
    fetchRestContentStub.mockImplementation(() => Promise.resolve(null))

    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )

    expect(fetchRestContentStub).toHaveBeenCalledTimes(1)

    const content = await waitForElement(() => getByTestId('blog-error'))
    expect(content).toBeInTheDocument()

    fetchRestContentStub.mockRestore()
  })

  it('renders loader when BlogPage is waiting for an api response', async () => {
    const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')

    const initialState = undefined
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, initialState, enhancer)

    const { getByTestId } = render(
      <Provider store={store}>
        <BlogPage id="1" />
      </Provider>
    )

    expect(fetchRestContentStub).toHaveBeenCalledTimes(1)
    expect(getByTestId('blog-loader')).toBeInTheDocument()
  })
  describe('Byline', () => {
    it('should exist', async () => {
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(fetchRestContentStubCallback)

      const initialState = undefined
      const enhancer = applyMiddleware(thunk)
      const store = createStore(reducers, initialState, enhancer)

      const { getByTestId } = render(
        <Provider store={store}>
          <BlogPage id="1" />
        </Provider>
      )

      const content = await waitForElement(() => getByTestId('byline'))
      expect(content).toBeInTheDocument()
    })
    it('should contain postAuthor, postDate and postCategory', async () => {
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(fetchRestContentStubCallback)

      const initialState = undefined
      const enhancer = applyMiddleware(thunk)
      const store = createStore(reducers, initialState, enhancer)

      const { getByTestId } = render(
        <Provider store={store}>
          <BlogPage id="1" />
        </Provider>
      )

      let content = await waitForElement(() => getByTestId('byline'))
      expect(content).toBeInTheDocument()
      content = await waitForElement(() => getByTestId('postAuthor'))
      expect(content).toBeInTheDocument()
      content = await waitForElement(() => getByTestId('postDate'))
      expect(content).toBeInTheDocument()
      content = await waitForElement(() => getByTestId('postCategory'))
      expect(content).toBeInTheDocument()
    })
    it('should contain postTitle, postSummary and postAuthorSectionTitle', async () => {
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(fetchRestContentStubCallback)

      const initialState = undefined
      const enhancer = applyMiddleware(thunk)
      const store = createStore(reducers, initialState, enhancer)

      const { getByTestId } = render(
        <Provider store={store}>
          <BlogPage id="1" />
        </Provider>
      )

      let content = await waitForElement(() => getByTestId('postTitle'))
      expect(content).toBeInTheDocument()
      content = await waitForElement(() => getByTestId('postSummary'))
      expect(content).toBeInTheDocument()
      content = await waitForElement(() => getByTestId('postAuthorSectionTitle'))
      expect(content).toBeInTheDocument()
    })
  })
  describe('AuthorCard', () => {
    it('should exist', async () => {
      const fetchRestContentStub = jest.spyOn(fetchContentHelper, 'fetchRestContent')
      fetchRestContentStub.mockImplementation(fetchRestContentStubCallback)

      const initialState = undefined
      const enhancer = applyMiddleware(thunk)
      const store = createStore(reducers, initialState, enhancer)

      const { getByTestId } = render(
        <Provider store={store}>
          <BlogPage id="1" />
        </Provider>
      )

      const content = await waitForElement(() => getByTestId('authorCard'))
      expect(content).toBeInTheDocument()
    })
  })
})
