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
        <div key={index.toString()}>
          {!isEmpty(blogData.blogBody[index].blogSectionImage.url) && (
            <ImageSection className={styles.center} src={blogData.blogBody[index].blogSectionImage.url} />
          )}
          <div dangerouslySetInnerHTML={{ __html: blogData.blogBody[index].blogSectionText }} />
        </div>
      )
    })

    return (
      <div className={styles.container}>
        <h1 data-testid={'postTitle'}>{blogData.title}</h1>
        <ByLine blogData={blogData} />
        <h5 data-testid={'postSummary'}>{blogData.summary}</h5>
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

const ByLine = ({ blogData }) => (
  <div data-testid={'byline'}>
    <p>
      <span data-testid={'postAuthor'}>
        By <a href={blogData.author.url}>{blogData.author.name}</a>
      </span>{' '}
      <span data-testid={'postDate'}>on {moment.unix(blogData.created).format('MMMM DD, YYYY')}</span>
      <br />
      <span data-testid={'postCategory'}>
        Category:{' '}
        <a
          href={
            '/blogs/' +
            blogData.blogCategory
              .split(' ')
              .join('-')
              .toLowerCase()
          }
        >
          {blogData.blogCategory}
        </a>
      </span>
    </p>
  </div>
)

export default Blog
