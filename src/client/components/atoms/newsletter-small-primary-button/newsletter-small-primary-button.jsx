import React from 'react'
import styles from './newsletter-small-primary-button.scss'

const NewsletterSmallPrimaryButton = props => (
  <ButtonBase
    {...props}
    buttonClassName={styles.NewsletterSmallPrimaryButton}
  />
)

export default NewsletterSmallPrimaryButton
