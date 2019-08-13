import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'atoms'
import { CallToAction, NewsletterForm } from 'molecules'
import styles from './district-office.scss'

class DistrictOfficeTemplate extends React.Component {
  render() {
    const { office } = this.props
    return (
      <div className={styles.content}>
        <p>{office.title}</p>

        <div className={styles.section}>
          <NewsletterSignup />
        </div>
        <div className={styles.section}>
          <CTA />
        </div>
        <div className={styles.section}>
          <LenderMatch />
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
    'Lender Match is a free online referral tool that connects small businesses with particpating SBA-approved lenders'
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
