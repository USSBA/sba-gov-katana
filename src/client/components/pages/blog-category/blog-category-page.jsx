import React, { Component, PropTypes } from 'react'
import { fetchSiteContent } from '../../../fetch-content-helper'

class BlogCategoryPage extends Component {
  constructor() {
    super()

    this.state = {
      page: 1
    }
  }

  setPagination() {
    const pageSize = 12
    const start = (this.state.page - 1) * pageSize + 1
    const end = this.state.page * pageSize
    return { start, end }
  }

  fetchBlogs() {
    // setPagination()
    // return fetchSiteContent('blogs', { category: this.props.category, start: this.state.start, end: this.state.end })
    return fetchSiteContent('blogs', { category: this.props.category })
  }

  categoryValidation() {
    return this.props.category === 'news-and-views' || this.props.category === 'industry-word'
  }

  setHeader() {
    let title = ''
    let subtitle = ''
    if (this.props.category === 'news-and-views') {
      title = 'SBA News and Views posts'
      subtitle = "Insights and updates from SBA's small business experts."
    } else if (this.props.category === 'industry') {
      title = 'Industry Word posts'
      subtitle = 'Commentary and advice from leaders in the small business industry.'
    }
    return { title, subtitle }
  }

  render() {
    const { title, subtitle } = this.setHeader()
    const { total, blogs } = this.fetchBlogs()

    if (this.categoryValidation) {
      return (
        <div>
          <div>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
          </div>
          <div>
            <h3>Total: {total}</h3>
            <p>{blogs}</p>
          </div>
        </div>
      )
    } else {
      return <ErrorPage linkUrl="/blogs" linkMessage="blogs page" />
    }
  }
}

BlogCategoryPage.defaultProps = {
  category: ''
}

BlogCategoryPage.propTypes = {
  category: React.PropTypes.string
}

export default BlogCategoryPage
