import React from 'react'
import styles from './newsletter-small-primary-button.scss'
import { ButtonBase } from 'atoms'

const NewsletterSmallPrimaryButton = props => (
  <ButtonBase {...props} buttonClassName={styles.NewsletterSmallPrimaryButton} />
)

export default NewsletterSmallPrimaryButton
