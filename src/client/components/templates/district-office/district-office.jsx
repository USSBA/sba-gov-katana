import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'atoms'
import { CallToAction, NewsletterForm } from 'molecules'
import { EventResult, Results } from 'organisms'
import { fetchSiteContent } from '../../../fetch-content-helper'
import styles from './district-office.scss'

class DistrictOfficeTemplate extends React.Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    const { office } = this.props
    const { items } = await fetchSiteContent('events', {
      pageSize: 5,
      officeId: office.id
    })
    // when the events content api is set to D8, then pageSize=5 will do the work for us
    // but since the events content api is set to D7, slice the first 5 items off the response
    const events = items.slice(0, 5)
    this.setState({ events })
  }
  render() {
    const { events } = this.state
    const { office } = this.props
    return (
      <div>
        <div className={styles.content}>
          <p>{office.title}</p>

          <div className={styles.section}>
            <NewsletterSignup />
          </div>
        </div>
        <div className={styles.section}>
          <Events items={events} />
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <CTA />
          </div>
          <div className={styles.section}>
            <LenderMatch />
          </div>
        </div>
      </div>
    )
  }
}

const NewsletterSignup = () => {
  const newsletterTitle = 'Sign up for national and local SBA newsletters'
  return (
    <div className={styles.officeNewsletter} data-testid={'office-newsletter'}>
      <NewsletterForm title={newsletterTitle} />
    </div>
  )
}

const Events = ({ items }) => {
  return (
    <div data-testid="events" className={styles.events}>
      <h2>Upcoming events and workshops</h2>
      {items.length > 0 && (
        <Results items={items}>
          <EventResult />
        </Results>
      )}
      <div className={styles.button} data-testid="events-button">
        <a href="/events/find/">
          <Button primary>Find More Events</Button>
        </a>
      </div>
    </div>
  )
}

const CTA = () => {
  const buttonAction = {
    link: {
      title: 'Search Nearby',
      url: '/local-assistance/find'
    },
    type: 'link'
  }
  const image = {
    url: '/assets/images/local-assistance/Planning2.png',
    alt: 'Two women at a computer talking'
  }
  return (
    <CallToAction
      size="Large"
      headline="Need help? Get free business counseling from local resources"
      blurb="SBA has resource partners like SCORE, Small Business Development Centers and Women's Business Centers that provide additional business counseling and training."
      buttonAction={buttonAction}
      image={image}
    />
  )
}

const LenderMatch = () => {
  const lenderHeadline = 'Lender Match'
  const lenderBlurb =
    'Lender Match is a free online referral tool that connects small businesses with particpating SBA-approved lenders.'
  const lenderButton = {
    url: '/lendermatch',
    title: 'Learn More'
  }

  return (
    <div className={styles.lenderMatch} data-testid={'office-lender-match'}>
      <h3>{lenderHeadline}</h3>
      <p>{lenderBlurb}</p>
      <Button primary alternate url={lenderButton.url}>
        {lenderButton.title}
      </Button>
    </div>
  )
}

DistrictOfficeTemplate.propTypes = {
  office: PropTypes.object.isRequired
}

export default DistrictOfficeTemplate
