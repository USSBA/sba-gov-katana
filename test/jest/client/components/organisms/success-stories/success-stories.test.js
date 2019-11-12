import React from 'react'
import { render, cleanup, waitForElement, within } from 'react-testing-library'
import { when, resetAllWhenMocks } from 'jest-when'
import 'jest-dom/extend-expect'
import * as fetchContentHelper from 'client/fetch-content-helper.js'
import { SuccessStories } from 'organisms'
import eventsTestData from '../../test-data/events.json'
import blogsTestData from '../../test-data/district-office-blogs.json'

afterEach(cleanup)

describe('Sucess Stories Component', () => {
  it('should exist', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs')
      .mockImplementationOnce(props => {
        return Promise.resolve(blogsTestData)
      })

    const { queryByTestId } = render(<SuccessStories officeId={1000} />)
    const content = await waitForElement(() => queryByTestId('success-stories'))
    expect(content).toBeInTheDocument()
  })
  it('should have a length of 3', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs')
      .mockImplementationOnce(props => {
        return Promise.resolve(blogsTestData)
      })

    const { getByTestId, getAllByTestId } = render(<SuccessStories officeId={1000} />)
    let content = await waitForElement(() => getByTestId('success-stories'))
    expect(content).toBeInTheDocument()

    content = await waitForElement(() => getAllByTestId('success-story-card'))
    expect(content.length).toEqual(3)
  })
  it('should not render because there is no blogs data', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs')
      .mockImplementationOnce(props => {
        return Promise.resolve({
          blogs: []
        })
      })

    const { queryByTestId } = render(<SuccessStories officeId={1000} />)
    const content = queryByTestId('success-stories')
    expect(content).not.toBeInTheDocument()
  })
  it('should have "View All Posts" button', async () => {
    const fetchSiteContentStub = jest.spyOn(fetchContentHelper, 'fetchSiteContent')
    when(fetchSiteContentStub)
      .calledWith('blogs')
      .mockImplementationOnce(props => {
        return Promise.resolve(blogsTestData)
      })

    const { getByTestId } = render(<SuccessStories officeId={1000} />)
    const content = await waitForElement(() => getByTestId('success-stories-button'))
    expect(content).toBeInTheDocument()
  })
})
