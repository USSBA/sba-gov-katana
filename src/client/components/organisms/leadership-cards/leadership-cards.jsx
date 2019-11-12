import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AuthorCard } from 'molecules'
import { GenericCardCollection } from 'organisms'
import styles from './leadership-cards.scss'
import { fetchRestContent } from '../../../fetch-content-helper'
import { compact, chunk } from 'lodash'

class LeadershipCards extends PureComponent {
  constructor() {
    super()
    this.state = {
      leaders: []
    }
  }

  async componentDidMount() {
    const { data } = this.props

    const leaders = []
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        leaders.push(await fetchRestContent(data[item].person))
      }
    }
    this.setState({ leaders })
  }

  render() {
    const { leaders } = this.state
    const items = compact(leaders)
    const cardsContent = items.map(({ name, title, shortBio, url }, index) => {
      return (
        <div data-testid={'leader-card'} className={styles.leaderCard} key={index}>
          <AuthorCard name={name} title={title} shortBio={shortBio} url={url} border={false} />
        </div>
      )
    })

    let html = null
    if (cardsContent.length === 4) {
      const cardsContentSections = chunk(cardsContent, 2)
      html = (
        <div>
          <h3>Leadership</h3>
          {cardsContentSections.map((cardsContentSection, index) => (
            <div key={index}>
              <GenericCardCollection cardsContent={cardsContentSection} />
            </div>
          ))}
        </div>
      )
    } else {
      html = (
        <div>
          <h3>Leadership</h3>
          <GenericCardCollection cardsContent={cardsContent} />
        </div>
      )
    }

    return html
  }
}

LeadershipCards.propTypes = {
  data: PropTypes.array
}

export default LeadershipCards
