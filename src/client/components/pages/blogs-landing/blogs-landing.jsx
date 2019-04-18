import React, { Component, PropTypes } from 'react'

import { fetchRestContent } from '../../../fetch-content-helper'
import { Loader } from 'atoms'
import Hero from '../../organisms/hero/hero.jsx'

class BlogsLandingPage extends Component {
  // constructor() {
  //   super()
  // }

  async componentDidMount() {
    if (this.props.id) {
      return this.fetchBlogs()
    }
  }

  async componentWillReceiveProps(nextProps) {}

  async fetchBlogs() {
    return {}
  }

  render() {
    return (
      <Hero
        title="SBA Blog"
        message="Perspectives, news, and practical iformation for small businesses"
        buttons={null}
        imageURL={null}
        alt={null}
      />
    )
  }
}

export default BlogsLandingPage
