import React, { PureComponent } from 'react'
import moment from 'moment'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { Button } from 'atoms'
import { Card } from 'molecules'
import styles from './success-stories.scss'

class SuccessStories extends PureComponent {
  constructor() {
    super()
    this.state = {
      blogs: []
    }
  }

  async componentDidMount() {
    const { officeId } = this.props

    let { blogs = [] } = await fetchSiteContent('blogs', {
      category: 'Success Story',
      office: officeId
    })

    if (blogs.length > 0) {
      blogs = blogs.slice(0, 3)
    }

    this.setState({ blogs })
  }

  render() {
    const { blogs } = this.state
    const { officeId } = this.props

    const cards = blogs.map(({ title, summary, featuredImage, created, url }, index) => {
      const item = {
        image: {
          alt: featuredImage.alt,
          url: featuredImage.url
        },
        italicText: moment.unix(created).format('MMMM D, YYYY'),
        link: {
          url,
          title: 'Read full post'
        },
        subtitleText: summary,
        titleText: title
      }
      return (
        <div data-testid={`success-story-card`} key={index}>
          <Card index={index} item={item} numCards={3} />
        </div>
      )
    })
    return (
      <div>
        {cards.length > 0 && (
          <div data-testid={'success-stories'} className={styles.successStories}>
            <h2>Success Story posts</h2>
            {cards}
            <div className={styles.clear} />
            <div className={styles.button} data-testid="success-stories-button">
              <a href={`/blogs/success-stories/${officeId}`}>
                <Button primary>View All Posts</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SuccessStories
