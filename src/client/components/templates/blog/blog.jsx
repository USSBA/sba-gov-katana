import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import moment from 'moment'

import { AuthorCard } from 'molecules'
import { TextSection } from 'atoms'
import styles from './blog.scss'

class Blog extends Component {
  render() {
    const { blogData } = this.props
    const blogParagraphs = blogData.blogBody
    const categoryLink =
      blogData.blogCategory === 'SBA News and Views' ? '/blogs/news-and-views' : '/blogs/industry-word'
    const { featuredImage } = this.props.blogData
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
          <div data-testid={'postSectionText'} tabIndex="0">
            <TextSection text={blogData.blogBody[index].blogSectionText} />
          </div>
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
        {!isEmpty(featuredImage) && (
          <img
            data-testid="featuredImage"
            className={styles.featuredImage}
            src={featuredImage.url}
            alt={featuredImage.alt}
          />
        )}
        <hr className={styles.hr} />
        <div data-testid={'postBlogBody'} className={styles.postBlogBody}>
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
  <div data-testid={'byline'} className={styles.byline}>
    <div>
      <p>
        <span data-testid={'postAuthor'} tabIndex="0">
          By <a href={blogData.author.url}>{blogData.author.name}</a>
        </span>{' '}
        <span data-testid={'postDate'} tabIndex="0">
          on {moment.unix(blogData.created).format('MMMM DD, YYYY')}
        </span>
      </p>
    </div>
    <div>
      <p>
        <span data-testid={'postCategory'} tabIndex="0">
          Category: <a href={categoryLink}>{blogData.blogCategory}</a>
        </span>
      </p>
    </div>
  </div>
)

export default Blog
