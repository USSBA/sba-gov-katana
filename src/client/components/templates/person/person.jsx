import React, { Component } from 'react'
import classNames from 'classnames'
import { isEmpty, omitBy } from 'lodash'
import moment from 'moment'

import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './person.scss'
import { CardCollection } from 'organisms'
import { Breadcrumb, ContactCard, Paginator } from 'molecules'
import { Label } from 'atoms'

const numBlogsPerPage = 6

class Person extends Component {
  constructor() {
    super()
    this.state = {
      blogCards: null,
      blogCardsTotal: null,
      isPersonBlogAuthor: false,
      pageNumber: 1
    }
  }

  componentDidMount() {
    return this.fetchBlogs()
  }

  async fetchBlogs() {
    const {
      personData: { id }
    } = this.props

    // reformats the blog object for Card component through CardCollection component
    const reformatBlog = blog => {
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

    const data = await fetchSiteContent('blogs', { author: 7097 })

    if (data.total > 0) {
      this.setState({
        blogCards: data.blogs.map(blog => reformatBlog(blog)),
        blogCardsTotal: data.total,
        isPersonBlogAuthor: true
      })
    }
  }

  // callback function sets the state with the new pageNumber
  // prevents pageNumber from being less than 1
  handleBack() {
    this.setState({
      pageNumber: Math.max(1, this.state.pageNumber - 1)
    })
  }

  // callback function sets the state with the new pageNumber
  // prevents pageNumber from exceeding total number of pages
  handleForward() {
    const { blogCardsTotal, pageNumber } = this.state
    const numTotalPages = Math.ceil(blogCardsTotal / numBlogsPerPage)

    this.setState({
      pageNumber: Math.min(numTotalPages, pageNumber + 1)
    })
  }

  // renders 2 rows of CardCollection each displaying 3 cards
  renderBlogCardCollection() {
    const { blogCards, pageNumber } = this.state
    const startIndex = 6 * (pageNumber - 1)
    const middleIndex = startIndex + 3
    const endIndex = startIndex + 6
    return (
      <div>
        <CardCollection
          cards={blogCards.slice(startIndex, middleIndex)}
          parentIndex={1}
          numberOverride={3}
        />
        <CardCollection cards={blogCards.slice(middleIndex, endIndex)} parentIndex={2} numberOverride={3} />
      </div>
    )
  }

  renderPaginator(location) {
    const { blogCardsTotal, pageNumber } = this.state
    const divClassName = classNames({
      [styles.paginator]: true,
      [styles.topPaginator]: location === 'top' && true,
      [styles.bottomPaginator]: location === 'bottom' && true
    })

    if (location === 'top') {
      console.log('TOP')
      console.log(divClassName)
    } else if (location === 'bottom') {
      console.log('BOTTOM')
      console.log(divClassName)
    }

    return (
      <div className={divClassName} data-testid="paginator">
        <Paginator
          pageNumber={pageNumber}
          pageSize={numBlogsPerPage}
          total={blogCardsTotal}
          onBack={this.handleBack.bind(this)}
          onForward={this.handleForward.bind(this)}
        />
      </div>
    )
  }

  render() {
    const { isPersonBlogAuthor } = this.state
    const {
      personData: {
        bio,
        emailAddress: email,
        fax,
        name,
        office: { name: officeName },
        picture,
        phone: phoneNumber,
        title
      },
      pathname
    } = this.props

    const className = classNames({
      'person-page': true,
      [styles.personPage]: true
    })

    const contentClassName = classNames({
      [styles.content]: true,
      [styles.hasPicture]: !isEmpty(picture)
    })

    const contact = omitBy({ email, fax, phoneNumber }, isEmpty)

    return (
      <div className={className}>
        {/* Breadcrumb will release in future update
        <div className={styles.breadcrumb}>
          <Breadcrumb
            items={[
              {
                title: 'About SBA',
                url: '/about-sba'
              },
              {
                title: 'People',
                url: '/person'
              },
              {
                title: name,
                url: pathname
              }
            ]}
          />
        </div>
        */}
        <Label large type="Person" />
        <div className={styles.header}>
          <div>
            <h1>{name}</h1>
            {!isEmpty(title) && <h5>{title}</h5>}
            {!isEmpty(officeName) && <p className={styles.officeName}>{officeName}</p>}
          </div>
          {!isEmpty(contact) && (
            <div className={styles.contact}>
              <ContactCard {...contact} />
            </div>
          )}
        </div>
        <div className={contentClassName}>
          {!isEmpty(picture) && <img alt={picture.alt} className={styles.avatar} src={picture.src} />}
          {!isEmpty(bio) && <div dangerouslySetInnerHTML={{ __html: bio }} />}
        </div>
        {isPersonBlogAuthor && (
          <div className={styles.blogContainer} data-testid="blog-section">
            <h2 className={styles.blogHeader} data-testid="blog-section-header">
              Blog posts
            </h2>
            {this.renderPaginator('top')}
            {this.renderBlogCardCollection()}
            {this.renderPaginator('bottom')}
          </div>
        )}
      </div>
    )
  }
}

export default Person
