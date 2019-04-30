import React, { Component, PropTypes } from 'react'
import { AuthorCard } from 'molecules'
import { ImageSection } from 'atoms'
import styles from './blog.scss'
import { fetchRestContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'
import moment from 'moment'

class Blog extends Component {
  render() {
    const { blogData } = this.props
    const blogParagraphs = blogData.blogBody
    const blogPage = blogParagraphs.map(function(item, index) {
      return (
        <div>
          {!isEmpty(blogData.blogBody[index].blogSectionImage.url) && (
            <ImageSection class={styles.center} src={blogData.blogBody[index].blogSectionImage.url} />
          )}
          <div dangerouslySetInnerHTML={{ __html: blogData.blogBody[index].blogSectionText }} />
        </div>
      )
    })

    return (
      <div className={styles.container}>
        <h1>{blogData.title}</h1>
        <ByLine blogData={blogData} />
        <h5>{blogData.summary}</h5>
        <hr className={styles.hr} />
        {blogPage}
        <br />
        <hr className={styles.hr} />
        <h3>About the Author</h3>
        <AuthorCard {...blogData.author} />
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
