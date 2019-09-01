import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { Button, SocialMediaLink } from 'atoms'
import { CallToAction, NewsletterForm } from 'molecules'
import { Hero, EventResult, NewsReleases, Results } from 'organisms'
import { fetchSiteContent } from '../../../fetch-content-helper'
import twitterThumbnail from 'assets/images/footer/twitter.png'
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
    if (items && items.length > 0) {
      const events = items.slice(0, 5)
      this.setState({ events })
    }
  }

  // Validate that the officeServices field is a valid String with content
  validateOfficeServices(office) {
    const { officeServices } = office
    return officeServices && typeof officeServices === 'string' && officeServices.length > 0
  }

  render() {
    const { events } = this.state
    const { office } = this.props
    const { twitterLink } = office

    return (
      <div>
        <HeroBanner office={office} />
        <div className={styles.section} data-testid="office-information-section">
          <div className={styles.officeInfo}>
            <h2>Office Information</h2>
            {this.validateOfficeServices(office) && <ServicesProvided office={office} />}
          </div>
        </div>
        {typeof twitterLink === 'string' && (
          <div className={styles.content}>
            <SocialMedia twitterLink={twitterLink} />
          </div>
        )}
        <div className={styles.section} data-testid="news-release-section">
          <NewsReleases officeId={office.id} />
        </div>
        <div className={styles.content}>
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

const ServicesProvided = ({ office }) => {
  const { officeServices } = office
  return (
    <div data-testid="office-services-section">
      <h3>Services Provided</h3>
      <div dangerouslySetInnerHTML={{ __html: officeServices }} />
    </div>
  )
}

const HeroBanner = ({ office }) => {
  const heroProps = {
    alt: null,
    buttons: null,
    imageUrl: null,
    message: null,
    title: null
  }

  heroProps.message = typeof office.summary === 'string' && office.summary
  heroProps.title = typeof office.title === 'string' && office.title

  if (!isEmpty(office.bannerImage)) {
    if (!isEmpty(office.bannerImage.link)) {
      heroProps.buttons = typeof office.bannerImage.link.url === 'string' && [
        {
          url: office.bannerImage.link.url,
          btnText: 'Learn More'
        }
      ]
    }
    if (!isEmpty(office.bannerImage.image)) {
      heroProps.alt = typeof office.bannerImage.image.alt === 'string' && office.bannerImage.image.alt
      heroProps.imageUrl = typeof office.bannerImage.image.url === 'string' && office.bannerImage.image.url
    }
  }

  return <Hero {...heroProps} />
}

const SocialMedia = ({ twitterLink }) => {
  const altText = 'link to twitter'
  return (
    <div data-testid="social-media-section" className={styles.socialMedia}>
      <h4>Follow us</h4>
      <SocialMediaLink image={twitterThumbnail} altText={altText} url={twitterLink} />
    </div>
  )
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
