import React, { Component, PropTypes } from 'react'
import { AuthorCard } from 'molecules'
import styles from './blog.scss'
import { fetchRestContent } from '../../../fetch-content-helper'
import { isEmpty } from 'lodash'
import moment from 'moment'

class Blog extends Component {
  render() {
    const { blogData } = this.props
    const blogParagraphs = blogData.blogBody
    const categoryLink =
      blogData.blogCategory === 'SBA News and Views' ? '/blogs/news-and-views' : '/blogs/industry-word'
    const blogPage = blogParagraphs.map(function(item, index) {
      return (
        <div key={index.toString()} data-testid={'postBlogSection'}>
          {!isEmpty(blogData.blogBody[index].blogSectionImage.url) && (
            <img
              className={styles.center}
              data-testid={'postSectionImage'}
              src={blogData.blogBody[index].blogSectionImage.url}
              alt={blogData.blogBody[index].blogSectionImage.alt}
              tabIndex="0"
            />
          )}
          <div
            data-testid={'postSectionText'}
            tabIndex="0"
            dangerouslySetInnerHTML={{ __html: blogData.blogBody[index].blogSectionText }}
          />
        </div>
      )
    })

    return (
      <div className={styles.container}>
        <h1 data-testid={'postTitle'} tabIndex="0">
          {blogData.title}
        </h1>
        <ByLine blogData={blogData} categoryLink={categoryLink} />
        <h5 data-testid={'postSummary'} tabIndex="0">
          {blogData.summary}
        </h5>
        <hr className={styles.hr} />
        <div data-testid={'postBlogBody'} className={styles.postBlogBody} tabIndex="0">
          {blogPage}
        </div>
        <br />
        <hr className={styles.hr} />
        <h3 data-testid={'postAuthorSectionTitle'}>About the author</h3>
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

const ByLine = ({ blogData, categoryLink }) => (
  <div data-testid={'byline'}>
    <p>
      <span data-testid={'postAuthor'}>
        By <a href={blogData.author.url}>{blogData.author.name}</a>
      </span>{' '}
      <span data-testid={'postDate'}>on {moment.unix(blogData.created).format('MMMM DD, YYYY')}</span>
      <br />
      <span data-testid={'postCategory'}>
        Category: <a href={categoryLink}>{blogData.blogCategory}</a>
      </span>
    </p>
  </div>
)

export default Blog
