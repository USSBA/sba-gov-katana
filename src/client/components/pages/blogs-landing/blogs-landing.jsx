import React, { Component, PropTypes } from 'react'

import { fetchSiteContent } from '../../../fetch-content-helper'
import { BlogCategoryDeck, Hero } from 'organisms'

class BlogsLandingPage extends Component {
  constructor() {
    super()
    this.state = {
      categorySections: []
    }
  }

  componentDidMount() {
    return this.fetchBlogs()
  }

  fetchBlogs() {
    const categorySections = [
      {
        category: 'News and Views',
        title: 'SBA News & Views posts',
        subtitle: "Insights and updates from SBA's small business experts.",
        cards: []
      },
      {
        category: 'Industry Word',
        title: 'Industry Word posts',
        subtitle: 'Commentary and advice from leaders in the small business industry.',
        cards: []
      }
    ]
    const categories = categorySections.map(section => section.category)
    const categoryData = []

    const getQueryParams = category => {
      return {
        category,
        end: 3,
        order: 'desc'
      }
    }

    const updateCards = () => {
      categoryData.forEach((data, index) => {
        categorySections[index].cards = data
      })
      this.setState({ categorySections })
    }

    categories.forEach(async category => {
      const data = await fetchSiteContent('blogs', getQueryParams(category))
      categoryData.push(data)

      if (categoryData.length === categories.length) {
        updateCards()
      }
    })
  }

  render() {
    const { categorySections } = this.state

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
          <BlogCategoryDeck
            cards={section.cards}
            categoryTitle={section.title}
            categorySubtitle={section.subtitle}
            key={index}
          />
        ))}
      </div>
    )
  }
}

export default BlogsLandingPage
