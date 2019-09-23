import React, { Component } from 'react'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper'
import { AuthorCardCollection, BlogCategoryDeck, Hero, SuccessStories } from 'organisms'
import { compact } from 'lodash'

class BlogsLandingPage extends Component {
  constructor() {
    super()
    this.state = {
      categorySections: [],
      authors: []
    }
  }

  async componentDidMount() {
    this.fetchBlogs()
    this.fetchAuthors()
  }

  async fetchBlogs() {
    // order of categories inside the categorySections array
    // will determine order that category sections are displayed on the page
    const categorySections = [
      {
        category: 'SBA News and Views',
        title: 'SBA News & Views posts',
        subtitle: "Insights and updates from SBA's small business experts.",
        url: '/blogs/news-and-views',
        cards: []
      },
      {
        category: 'Industry Word',
        title: 'Industry Word posts',
        subtitle: 'Commentary and advice from leaders in the small business industry.',
        url: '/blogs/industry-word',
        cards: []
      },
      {
        category: 'Success Story',
        title: 'Success Stories posts',
        subtitle: 'Stories from small business owners across the country.',
        url: '/blogs/success-stories',
        cards: []
      }
    ]

    // returns query parameters
    const getQueryParams = category => {
      return {
        category,
        end: 3,
        order: 'desc'
      }
    }

    // add blog data to cards key inside each category section.
    // note: map function preserves order of categorySections array
    let updatedCategorySections = categorySections.map(async section => {
      const { category, title, subtitle, url } = section
      const data = await fetchSiteContent('blogs', getQueryParams(category))
      return {
        category,
        title,
        subtitle,
        url,
        cards: data && data.blogs ? data.blogs : []
      }
    })

    // map function returns promises from fetchSiteContent calls
    // so we need to wait for all promises to resolve before setting the state
    updatedCategorySections = await Promise.all(updatedCategorySections)
    this.setState({ categorySections: updatedCategorySections })
  }

  async fetchAuthors() {
    // fetch author ids from content search api
    // then fetch author objects from content node api by ids
    const authors = []
    const nodeIds = await fetchSiteContent('authors')
    nodeIds.forEach(async nodeId => {
      const author = await fetchRestContent(nodeId)
      authors.push(author)
      if (nodeIds.length === authors.length) {
        this.setState({ authors: compact(authors) })
      }
    })
  }

  render() {
    const { categorySections, authors } = this.state

    const heroData = {
      title: 'SBA Blog',
      message: 'Perspectives, news, and practical information for small businesses',
      buttons: null,
      imageURL: null,
      alt: null
    }

    return (
      <div>
        <div data-testid={'blogs-hero'}>
          <Hero
            title={heroData.title}
            message={heroData.message}
            button={heroData.buttons}
            imageURL={heroData.imageURL}
            alt={heroData.alt}
          />
        </div>
        {categorySections.map((section, index) => (
          <div data-testid={'blog category deck'} key={index}>
            <BlogCategoryDeck
              cards={section.cards}
              categoryTitle={section.title}
              categorySubtitle={section.subtitle}
              categoryUrl={section.url}
            />
          </div>
        ))}
        {authors.length > 0 && (
          <div data-testid={'authorSection'}>
            <AuthorCardCollection data={authors} />
          </div>
        )}
      </div>
    )
  }
}

export default BlogsLandingPage
