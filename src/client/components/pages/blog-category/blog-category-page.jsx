import React, { Component, PropTypes } from 'react'
import { Paginator, TitleSection } from 'molecules'
import styles from './blog-category-page.scss'
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
    return fetchSiteContent('blogs', { blogCategory: this.props.params.category })
  }

  categoryValidation() {
    return this.props.params.category === 'news-and-views' || this.props.params.category === 'industry-word'
  }

  setHeader() {
    let title = ''
    let subtitle = ''
    if (this.props.params.category === 'news-and-views') {
      title = 'SBA News and Views posts'
      subtitle = "Insights and updates from SBA's small business experts."
    } else if (this.props.params.category === 'industry-word') {
      title = 'Industry Word posts'
      subtitle = 'Commentary and advice from leaders in the small business industry.'
    }
    return { title, subtitle }
  }

  render() {
    const category = this.props.params.category
    const { title, subtitle } = this.setHeader()
    const { total = 0, blogs = [] } = this.fetchBlogs()

    if (this.categoryValidation) {
      return (
        <div>
          <div className={styles.blog_category_title}>
            <h1>{title}</h1>
            <h5>{subtitle}</h5>
          </div>
          <div className="blog-content">
            <Paginator id="blog-paginator-top" pageSize={12} total={total} />
            <h3>Total: {total}</h3>
            <p>{blogs}</p>
            <Paginator id="blog-paginator-bottom" pageSize={12} total={total} />
          </div>
        </div>
      )
    } else {
      return <ErrorPage linkUrl="/blogs" linkMessage="blogs page" />
    }
  }
}

BlogCategoryPage.defaultProps = {
  category: null
}

BlogCategoryPage.propTypes = {
  category: PropTypes.string
}

export default BlogCategoryPage
