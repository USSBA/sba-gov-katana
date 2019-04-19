import React, { Component, PropTypes } from 'react'

import { fetchRestContent } from '../../../fetch-content-helper'
import { Loader } from 'atoms'
import Hero from '../../organisms/hero/hero.jsx'

class BlogsLandingPage extends Component {
  // constructor() {
  //   super()
  // }

  async componentDidMount() {
    return this.fetchBlogs()
  }

  async componentWillReceiveProps(nextProps) {}

  async fetchBlogs() {
    return {}
  }

  render() {
    const heroData = {
      title: 'SBA Blog',
      message: 'Perspectives, news, and practical information for small businesses',
      buttons: null,
      imageURL: null,
      alt: null
    }
    return (
      <Hero
        title={heroData.title}
        message={heroData.message}
        button={heroData.buttons}
        imageURL={heroData.imageURL}
        alt={heroData.alt}
        data-testid={'blogs-hero'}
      />
    )
  }
}

export default BlogsLandingPage
