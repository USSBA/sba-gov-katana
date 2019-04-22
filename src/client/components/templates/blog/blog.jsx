import React, { Component, PropTypes } from 'react'
import { AuthorCard } from 'molecules'
import styles from './blog.scss'
import { fetchRestContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'
import moment from 'moment'

class Blog extends Component {
  constructor() {
    super()
    this.state = {
      authorData: null
    }
  }
  async componentWillMount() {
    const { author: id } = this.props.blogData
    const authorData = await fetchRestContent('node', id)
    this.setState({ authorData })
  }
  render() {
    const { authorData } = this.state
    const { blogData } = this.props
    return (
      <div className={styles.container}>
        {!isEmpty(authorData) && <ByLine authorData={authorData} blogData={blogData} />}
        <p>{JSON.stringify(blogData)}</p>
        {!isEmpty(authorData) && <AuthorCard {...authorData} />}
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

const ByLine = ({ authorData, blogData }) => (
  <div data-testid={'byline'}>
    <p>
      <span data-testid={'postAuthor'}>
        By <a href="#">{authorData.name}</a>
      </span>{' '}
      <span data-testid={'postDate'}>on {moment.unix(blogData.created).format('MM/DD/YYYY')}</span>
      <br />
      <span data-testid={'postCategory'}>Category: {blogData.blogCategory}</span>
    </p>
  </div>
)

export default Blog
