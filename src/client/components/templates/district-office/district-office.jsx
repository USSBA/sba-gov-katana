import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { Button, SocialMediaLink } from 'atoms'
import { AuthorCard, ContactCard, CallToAction, NewsletterForm, QuickLinks, Card } from 'molecules'
import { GenericCardCollection, Hero, NewsReleases, EventResult, Results, SuccessStories } from 'organisms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper'
import twitterThumbnail from 'assets/images/footer/twitter.png'
import styles from './district-office.scss'

function getContactCardProps(locationInfo, testId) {
  const cardProps = {
    testId: testId,
    border: false
  }

  typeof locationInfo.city === 'string' && (cardProps.city = locationInfo.city)
  typeof locationInfo.email === 'string' && (cardProps.email = locationInfo.email)
  typeof locationInfo.fax === 'string' && (cardProps.fax = locationInfo.fax)
  typeof locationInfo.hoursOfOperation === 'string' &&
    (cardProps.hoursOfOperation = locationInfo.hoursOfOperation)
  typeof locationInfo.name === 'string' && (cardProps.title = locationInfo.name)
  typeof locationInfo.phoneNumber === 'string' && (cardProps.phoneNumber = locationInfo.phoneNumber)
  typeof locationInfo.state === 'string' && (cardProps.state = locationInfo.state)
  typeof locationInfo.streetAddress === 'string' && (cardProps.streetAddress = locationInfo.streetAddress)
  typeof locationInfo.zipCode === 'number' && (cardProps.zipCode = locationInfo.zipCode)

  return cardProps
}

class DistrictOfficeTemplate extends React.Component {
  constructor() {
    super()
    this.state = {
      alternateLocations: [],
      region: null,
      events: [],
      leaders: []
    }
  }

  async componentDidMount() {
    const { office } = this.props

    const alternateLocations = []
    if (office.alternateLocations && office.alternateLocations.length > 0) {
      const alternateOfficeIds = office.alternateLocations.slice(0, 2)
      for (let i = 0; i < alternateOfficeIds.length; i++) {
        alternateLocations[i] = await fetchRestContent(alternateOfficeIds[i])
      }
    }

    let region
    if (office.office && typeof office.office === 'number') {
      region = await fetchRestContent(office.office)
    }

    const { items } = await fetchSiteContent('events', {
      pageSize: 5,
      officeId: office.id
    })
    // when the events content api is set to D8, then pageSize=5 will do the work for us
    // but since the events content api is set to D7, slice the first 5 items off the response
    let events = []
    if (items && items.length > 0) {
      events = items.slice(0, 5)
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
    const { events, leaders, blogs } = this.state
    const { office } = this.props
    const { twitterLink } = office

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
            <LocationInfo office={office} alternateLocations={alternateLocations} region={region} />
          </div>
          {leaders.length > 0 && <div className={styles.section}>
              <Leadership items={leaders} />
          </div>}
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <SuccessStories officeId={office.id} />
          </div>
        </div>
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
    return (
      <div data-testid={`leader-card`} key={index} className={styles.threeColumn}>
        <AuthorCard name={name} title={title} shortBio={shortBio} url={url} />
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

const LocationInfo = ({ office, alternateLocations, region }) => {
  const officesForCards = []

  /*eslint-disable no-param-reassign*/
  office.testId = 'main-location'
  officesForCards.push(office)

  if (alternateLocations.length > 0) {
    alternateLocations.forEach(alternateLocation => {
      alternateLocation.testId = 'alternate-location'
      officesForCards.push(alternateLocation)
    })
  }

  if (region) {
    region.testId = 'region-location'
    officesForCards.push(region)
  }
  /*eslint-enable no-param-reassign*/

  const cardsContent = []
  officesForCards.forEach(officeInfo => {
    if (Array.isArray(officeInfo.location) && officeInfo.location.length > 0) {
      const cardProps = getContactCardProps(officeInfo.location[0], officeInfo.testId)
      cardsContent.push(<ContactCard {...cardProps} />)
    }
  })

  if (cardsContent.length > 0) {
    return (
      <div data-testid="location-info" className={styles.locationInfo}>
        <h3>Location information</h3>
        <GenericCardCollection cardsContent={cardsContent} />
      </div>
    )
  } else {
    return null
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
