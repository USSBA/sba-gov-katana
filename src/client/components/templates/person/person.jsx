import React, { Component } from 'react'
import classNames from 'classnames'
import { isEmpty, omitBy } from 'lodash'
import moment from 'moment'

import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './person.scss'
import { Label } from 'atoms'
import { Breadcrumb, ContactCard } from 'molecules'
import { ClientPagingMultiviewLayout, CardCollection } from 'organisms'

class Person extends Component {
  constructor() {
    super()
    this.state = {
      blogCards: null,
      isPersonBlogAuthor: false
    }
  }

  componentDidMount() {
    return this.fetchBlogs()
  }

  async fetchBlogs() {
    const {
      personData: { id }
    } = this.props

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

    const data = await fetchSiteContent('blogs', { author: id })

    if (data.total > 0) {
      this.setState({
        blogCards: data.blogs.map(blog => reformatBlog(blog)),
        isPersonBlogAuthor: true
      })
    }
  }

  makeGridRenderer() {
    const { blogCards } = this.state
    return (
      <div>
        <CardCollection cards={blogCards} />
        {/* <CardCollection cards={blogCards.slice(0, 4)} parentIndex={1} numberOverride={3} />
        <CardCollection cards={blogCards.slice(3, 6)} parentIndex={2} numberOverride={3} /> */}
      </div>
    )
  }

  render() {
    const { blogCards, isPersonBlogAuthor } = this.state
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
          <div className={styles.blogContainer}>
            <h2 className={styles.blogHeader}>Blog posts</h2>
            <ClientPagingMultiviewLayout
              className={styles.paginationContainer}
              // onReset={onReset}
              items={blogCards}
              pageSize={6}
              rendererOne={this.makeGridRenderer.bind(this)}
              type="blogs"
            />
          </div>
        )}
      </div>
    )
  }
}

export default Person
