import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Button, SocialMediaLink } from 'atoms'
import { AuthorCard, CallToAction, NewsletterForm, QuickLinks } from 'molecules'
import { Hero, LocationInfoSection, NewsReleases, EventResult, Results, SuccessStories } from 'organisms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper'
import twitterThumbnail from 'assets/images/footer/twitter.png'
import styles from './district-office.scss'
import clientConfig from '../../../services/client-config.js'

class DistrictOfficeTemplate extends React.Component {
  constructor() {
    super()
    this.state = {
      events: [],
      leaders: []
    }
  }

  async componentDidMount() {
    const { office } = this.props

    const results = await fetchSiteContent('events', {
      pageSize: 5,
      office: office.id
    })
    let events = []
    if (clientConfig.useD8EventsBackend) {
      if (results && results.found > 0) {
        events = results.hit
      }
    } else {
      // when the events content api is set to D8, then pageSize=5 will do the work for us
      // but since the events content api is set to D7, slice the first 5 items off the response
      const { items } = results
      if (items && items.length > 0) {
        events = items.slice(0, 5)
      }
    }

    let leaders = []
    if (office.officeLeadership && office.officeLeadership.length > 0) {
      const officeLeadership = office.officeLeadership.slice(0, 3)
      for (let i = 0; i < officeLeadership.length; i++) {
        leaders[i] = await fetchRestContent(office.officeLeadership[i])
      }
    }

    leaders = leaders.filter(item => item)
    this.setState({ events, leaders })
  }

  // Validate that the officeServices field is a valid String with content
  validateOfficeServices(office) {
    const { officeServices } = office
    return officeServices && typeof officeServices === 'string' && officeServices.length > 0
  }

  render() {
    const { events, leaders } = this.state
    const { office } = this.props
    const { twitterLink } = office
    const officeRegion = !isEmpty(office.region) ? office.region : null

    return (
      <div>
        <HeroBanner office={office} />
        <div className={styles.content}>
          <div data-testid="office-information-section" className={styles.officeInfo}>
            <h2>Office information</h2>
            <div className={styles.servicesAndSocialMediaContainer}>
              {this.validateOfficeServices(office) && <ServicesProvided office={office} />}
              {typeof twitterLink === 'string' && <SocialMedia twitterLink={twitterLink} />}
            </div>
          </div>
          <div className={styles.section}>
            <LocationInfoSection office={office} />
            <div className={styles.clear} />
          </div>
          {leaders.length > 0 && (
            <div className={styles.section}>
              <Leadership items={leaders} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <SuccessStories officeId={office.id} />
          </div>
        </div>
        <div className={styles.section} data-testid="news-release-section">
          <NewsReleases officeId={office.id} national={true} region={officeRegion} />
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <NewsletterSignup />
          </div>
        </div>
        <div className={styles.section}>
          {clientConfig.useD8EventsBackend ? <Events items={events} /> : <EventsCTA />}
          <Events items={events} />
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <CTA />
          </div>
          <div className={styles.section}>
            <LenderMatch />
          </div>
          <div className={styles.section}>
            <Docs office={office} />
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
      <h3>Services provided</h3>
      <div className={styles.servicesProvidedList} dangerouslySetInnerHTML={{ __html: officeServices }} />
    </div>
  )
}

const Leadership = ({ items }) => {
  const cards = items.map(({ name, title, shortBio, url }, index) => {
    const authorCardProps = {
      name,
      title,
      shortBio
    }

    // only include the url for the first person (AuthorCard) in the list
    if (index === 0) {
      authorCardProps.url = url
    }

    return (
      <div data-testid={`leader-card`} key={index} className={styles.threeColumn}>
        <AuthorCard {...authorCardProps} />
      </div>
    )
  })

  return (
    <div data-testid={'office-leadership'} className={styles.leadership}>
      <h3>Leadership</h3>
      {cards}
      <div className={styles.clear} />
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

// TODO: Events component temporarily displays EventsCTA as per TA-3491. Remove flag when events backend is completed.
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
        <a href="/events/find/" className={styles.buttonLink}>
          Find More Events
        </a>
      </div>
    </div>
  )
}

// TODO: Events component temporarily displays EventsCTA as per TA-3491.
// Remove EventsCTA component when events backend is completed.
// Remove temp-events-section folder and image that's referenced here: /assets/images/temp-events-section
const EventsCTA = () => {
  const buttonAction = {
    link: {
      title: 'Find Events',
      url: '/events/find'
    },
    type: 'link'
  }
  const image = {
    url: '/assets/images/temp-events-section/Temporary_Events_CTA.jpg',
    alt: 'A pen on a contract'
  }
  return (
    <CallToAction
      size="Large"
      headline="Upcoming Events and Workshops"
      blurb="SBA and its resource partners host events to help you start, manage, and grow your business. Find events in your area."
      buttonAction={buttonAction}
      image={image}
    />
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

const Docs = ({ office }) => {
  const officeID = office.id
  const linkProps = {
    typeOfLinks: [
      {
        type: 'documentLookup',
        documentActivity: [],
        sectionHeaderText: 'Documents',
        documentProgram: [],
        documentOffice: officeID,
        documentType: []
      }
    ]
  }
  return (
    <div className={styles.documents} data-testid={'office-document-links'}>
      <QuickLinks data={linkProps} />
    </div>
  )
}

const LenderMatch = () => {
  const lenderHeadline = 'Lender match'
  const lenderBlurb =
    'Lender Match is a free online referral tool that connects small businesses with participating SBA-approved lenders.'
  const lenderButton = {
    url: '/lendermatch',
    title: 'Learn More'
  }

  return (
    <div className={styles.lenderMatch} data-testid={'office-lender-match'}>
      <h2 tabIndex="0">{lenderHeadline}</h2>
      <p tabIndex="0">{lenderBlurb}</p>
      <Button primary alternate url={lenderButton.url}>
        <span className={styles.accessibilityText}>{lenderBlurb}</span>
        {lenderButton.title}
      </Button>
    </div>
  )
}

DistrictOfficeTemplate.propTypes = {
  office: PropTypes.object.isRequired
}

export default DistrictOfficeTemplate
