import React from 'react'
import { NewsletterForm, CallToAction } from 'molecules'
import { Button } from 'atoms'
import styles from './district-office.scss'

class DistrictOfficeTemplate extends React.Component {
  render() {
    const { office } = this.props
    return (
      <div>
        <p>{office.title}</p>
        <NewsletterSignup />
        <LenderMatch />
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

export default DistrictOfficeTemplate
