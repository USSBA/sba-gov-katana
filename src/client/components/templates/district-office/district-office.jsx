import React from 'react'
import { NewsletterForm } from 'molecules'
import styles from './district-office.scss'

class DistrictOfficeTemplate extends React.Component {
  render() {
    const { office } = this.props
    return (
      <div>
        <p>{office.title}</p>
        <NewsletterSignup />
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

export default DistrictOfficeTemplate
