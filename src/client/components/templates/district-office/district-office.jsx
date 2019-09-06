import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { Button, SocialMediaLink } from 'atoms'
import { AuthorCard, ContactCard, CallToAction, NewsletterForm, QuickLinks, Card } from 'molecules'
import { GenericCardCollection, Hero, NewsReleases, EventResult, Results } from 'organisms'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper'
import twitterThumbnail from 'assets/images/footer/twitter.png'
import styles from './district-office.scss'

class DistrictOfficeTemplate extends React.Component {
  constructor() {
    super()
    this.state = {
      events: [],
      leaders: [],
      blogs: []
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

    let { blogs = [] } = await fetchSiteContent('blogs', {
      category: 'Success Story',
      office: office.id
    })

    if (blogs.length > 0) {
      blogs = blogs.slice(0, 3)
    }
    
    this.setState({ events, leaders, blogs })
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
            <h2>Office Information</h2>
            <div className={styles.servicesAndSocialMediaContainer}>
              {this.validateOfficeServices(office) && <ServicesProvided office={office} />}
              {typeof twitterLink === 'string' && <SocialMedia twitterLink={twitterLink} />}
            </div>
          </div>
          <div className={styles.section}>
            <LocationInfo office={office} />
          </div>
          {leaders.length > 0 && (
            <div className={styles.section}>
              <Leadership items={leaders} />
            </div>
          )}
        </div>
        {blogs.length > 0 && <div className={styles.content}>
          <div className={styles.section}>
            <SuccessStories items={blogs} />
          </div>
        </div>}
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
      <h3>Services Provided</h3>
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

const SuccessStories = ({ items }) => {
  const cards = items.map(({ title, summary, blogBody, created, url }, index) => {

    const item = {
      image: {
        alt: blogBody[0].blogSectionImage.alt,
        url: blogBody[0].blogSectionImage.url
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
        <Card
          index={index}
          item={item}
          numCards={3}
        />
      </div>
    )
  })
  return (
    <div data-testid={'success-stories'} className={styles.leadership}>
      <h2>Success Stories</h2>
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

const LocationInfo = ({ office }) => {
  const cardsContent = []

  if (Array.isArray(office.location) && office.location.length > 0) {
    const mainLocation = office.location[0]
    const mainContactCardProps = {
      testId: 'main-location',
      border: false
    }

    typeof mainLocation.city === 'string' && (mainContactCardProps.city = mainLocation.city)
    typeof mainLocation.email === 'string' && (mainContactCardProps.email = mainLocation.email)
    typeof mainLocation.fax === 'string' && (mainContactCardProps.fax = mainLocation.fax)
    typeof mainLocation.hoursOfOperation === 'string' &&
      (mainContactCardProps.hoursOfOperation = mainLocation.hoursOfOperation)
    typeof mainLocation.name === 'string' && (mainContactCardProps.title = mainLocation.name)
    typeof mainLocation.phoneNumber === 'string' &&
      (mainContactCardProps.phoneNumber = mainLocation.phoneNumber)
    typeof mainLocation.state === 'string' && (mainContactCardProps.state = mainLocation.state)
    typeof mainLocation.streetAddress === 'string' &&
      (mainContactCardProps.streetAddress = mainLocation.streetAddress)
    typeof mainLocation.zipCode === 'number' && (mainContactCardProps.zipCode = mainLocation.zipCode)

    const mainContactCard = <ContactCard {...mainContactCardProps} />

    // ensures that main location will be the first element in the array
    cardsContent.unshift(mainContactCard)
  }

  if (cardsContent.length > 0) {
    return (
      <div data-testid="location-info" className={styles.locationInfo}>
        <h3>Location Information</h3>
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
