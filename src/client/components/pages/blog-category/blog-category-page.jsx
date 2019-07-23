import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      blogs: [],
      total: 0
    }
  }

  blogCategoryCorrection(categoryParam) {
    let category = ''
    if (categoryParam === 'news-and-views') {
      category = 'SBA News and Views'
    } else if (categoryParam === 'industry-word') {
      category = 'Industry Word'
    }
    return category
  }

  async fetchBlogs(start, end) {
    const { total = 0, blogs = [] } = await fetchSiteContent('blogs', {
      category: this.blogCategoryCorrection(this.props.params.category),
      start: start,
      end: end
    })
    this.setState({
      total: total,
      blogs: blogs
    })
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

  componentDidMount() {
    this.fetchBlogs(0, 12)
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

  onBack() {
    const newPage = Math.max(1, this.state.page - 1)
    const start = (newPage - 1) * this.props.pageSize
    const end = newPage * this.props.pageSize

    this.fetchBlogs(start, end)
    this.setState({
      page: newPage
    })
  }

  onForward() {
    const totalPages = Math.max(1, Math.ceil(this.state.total / this.props.pageSize))
    const newPage = Math.min(totalPages, this.state.page + 1)
    const start = (newPage - 1) * this.props.pageSize
    const end = newPage * this.props.pageSize

    this.fetchBlogs(start, end)
    this.setState({
      page: newPage
    })
  }

  renderPaginator() {
    return (
      <Paginator
        pageNumber={this.state.page}
        pageSize={this.props.pageSize}
        total={this.state.total}
        onBack={this.onBack.bind(this)}
        onForward={this.onForward.bind(this)}
      />
    )
  }

  formatCardDeck(blogDeck) {
    const firstRow = blogDeck.slice(0, 3)
    const secRow = blogDeck.slice(3, 6)
    const thirdRow = blogDeck.slice(6, 9)
    const fourthRow = blogDeck.slice(9, 12)
    return (
      <div data-testid={'blog-card-collections'}>
        <CardCollection
          cards={firstRow}
          parentIndex={1}
          cardAriaLabel="first row blog posts"
          numberOverride={3}
        />
        <CardCollection
          cards={secRow}
          parentIndex={2}
          cardAriaLabel="second row blog posts"
          numberOverride={3}
        />
        <CardCollection
          cards={thirdRow}
          parentIndex={3}
          cardAriaLabel="third row blog posts"
          numberOverride={3}
        />
        <CardCollection
          cards={fourthRow}
          parentIndex={4}
          cardAriaLabel="fourth row blog posts"
          numberOverride={3}
        />
      </div>
    )
  }

  render() {
    const { title, subtitle } = this.setHeader()
    let blogDeck = []

    if (this.state.blogs.length !== 0) {
      blogDeck = this.state.blogs.map(blog => this.reformatBlog(blog))
    }

    if (this.categoryValidation()) {
      return (
        <div>
          <div className={styles.blog_category_title}>
            <h1 data-testid={'blog-category-title'}>{title}</h1>
            <h5 data-testid={'blog-category-subtitle'}>{subtitle}</h5>
          </div>
          <div className={styles.blog_content}>
            <div className={styles.blog_paginator} data-testid={'blog-top-paginator'}>
              {this.renderPaginator()}
            </div>
            {this.formatCardDeck(blogDeck)}
            <div className={styles.blog_paginator} data-testid={'blog-bottom-paginator'}>
              {this.renderPaginator()}
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
  category: null,
  pageSize: 12
}

BlogCategoryPage.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default BlogCategoryPage
