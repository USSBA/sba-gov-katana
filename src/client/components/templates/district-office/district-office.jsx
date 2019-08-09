import React from 'react'
import { NewsletterForm } from 'molecules'
import styles from './district-office.scss'

class DistrictOfficeTemplate extends React.Component {
  renderSignUpComponent() {
    return (
      <div className={styles.officeNewsletter}>
        <NewsletterForm />
      </div>
    )
  }

  render() {
    const { office } = this.props
    return (
      <div>
        <p>{office.title}</p>
        {this.renderSignUpComponent()}
      </div>
    )
  }
}

export default DistrictOfficeTemplate
