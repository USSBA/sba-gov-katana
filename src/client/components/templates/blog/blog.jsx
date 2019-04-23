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
        <ByLine blogData={blogData} />
        <p>{JSON.stringify(blogData)}</p>
        <br />
        <p>AuthorCard.border=true</p>
        <AuthorCard {...blogData.author} />
        <br />
        <br />
        <div className={styles.greyBackgroundForAuthorCardDemo}>
          <p>AuthorCard.border=false</p>
          <AuthorCard {...blogData.author} border={false} />
        </div>
        <br />
        <br />
        <br />
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
        By <a href={blogData.author.url}>{blogData.author.name}</a>
      </span>{' '}
      <span data-testid={'postDate'}>on {moment.unix(blogData.created).format('MM/DD/YYYY')}</span>
      <br />
      <span data-testid={'postCategory'}>Category: {blogData.blogCategory}</span>
    </p>
  </div>
)

export default Blog
