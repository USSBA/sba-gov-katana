import React, { Component, PropTypes } from 'react'
import { AuthorCard } from 'molecules'
import styles from './blog.scss'
import { fetchRestContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'
import moment from 'moment'

class Blog extends Component {
  render() {
    const { blogData } = this.props
    return (
      <div className={styles.container}>
        {!isEmpty(blogData) && !isEmpty(blogData.author) && <ByLine blogData={blogData} />}
        <p>{JSON.stringify(blogData)}</p>
        {!isEmpty(blogData) && !isEmpty(blogData.author) && <AuthorCard {...blogData.author} />}
      </div>
    )
  }
}

Blog.defaultProps = {
  blogData: null
}

Blog.propTypes = {
  blogData: PropTypes.object
}

const ByLine = ({ blogData }) => (
  <div data-testid={'byline'}>
    <p>
      <span data-testid={'postAuthor'}>
        By <a href="#">{blogData.author.name}</a>
      </span>{' '}
      <span data-testid={'postDate'}>on {moment.unix(blogData.created).format('MM/DD/YYYY')}</span>
      <br />
      <span data-testid={'postCategory'}>Category: {blogData.blogCategory}</span>
    </p>
  </div>
)

export default Blog
