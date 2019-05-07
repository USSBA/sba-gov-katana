import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { Paginator } from 'molecules'
import { CardCollection } from 'organisms'
import ErrorPage from '../error-page/error-page.jsx'

import styles from './blog-category-page.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'

class BlogCategoryPage extends Component {
  constructor() {
    super()

    this.state = {
      page: 1,
      start: 1,
      end: 12,
      blogs: [],
      total: 0
    }
  }

  setPagination() {
    const pageSize = 12
    const start = (this.state.page - 1) * pageSize + 1
    const end = this.state.page * pageSize
    this.setState({
      start: start,
      end: end,
      pageSize: pageSize
    })
    // return { start, end }
  }

  blogCategoryCorrection(categoryParam) {
    let category = ''
    if (categoryParam === 'news-and-views') {
      category = 'News and Views'
    } else if (categoryParam === 'industry-word') {
      category = 'Industry Word'
    }
    return category
  }

  async fetchBlogs() {
    this.setPagination()
    // return await fetchSiteContent('blogs', { category: this.blogCategoryCorrection(this.props.params.category), start: this.state.start, end: this.state.end })
    return await fetchSiteContent('blogs')
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

  async componentDidMount() {
    const { total = 0, blogs = [] } = await this.fetchBlogs()
    this.setState({
      total: total,
      blogs: blogs
    })
  }

  reformatBlog(blog) {
    return {
      italicText: moment.unix(blog.created).format('MMMM D, YYYY'),
      link: {
        title: 'Read full post',
        uri: blog.url
      },
      subtitleText: blog.summary,
      titleText: blog.title
    }
  }

  render() {
    const { title, subtitle } = this.setHeader()
    // const { total, blogs } = this.state
    let blogDeck = []
    console.log('state')
    console.log(this.state)

    if (this.state.blogs.length !== 0) {
      blogDeck = this.state.blogs.map(blog => this.reformatBlog(blog))
    }

    if (this.categoryValidation()) {
      return (
        <div>
          <div className={styles.blog_category_title}>
            <h1>{title}</h1>
            <h5>{subtitle}</h5>
          </div>
          <div className="blog-content">
            <div className={styles.blog_paginator}>
              <Paginator id="blog-paginator-top" pageSize={12} total={this.state.total} />
            </div>
            <CardCollection cards={blogDeck} cardAriaLabel="latest blog posts" />
            <div className={styles.blog_paginator}>
              <Paginator id="blog-paginator-bottom" pageSize={12} total={this.state.total} />
            </div>
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
