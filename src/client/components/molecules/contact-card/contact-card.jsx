import React from 'react'
import PropTypes from 'prop-types'

import styles from './contact-card.scss'
import classNames from 'classnames'
import { Link } from 'atoms'

// TODO: The link card component has overlapping functionality and should be
// combined with the contact card.
const ContactCard = props => {
  const { city, email, fax, link, phoneNumber, state, streetAddress, title, zipCode, className: cn } = props
  const linkText = 'Visit website'

  const address = breakOrNewLine => {
    return `${streetAddress}${breakOrNewLine}${city}, ${state} ${zipCode}`
  }

  const fields = [
    {
      text: streetAddress && city && state && zipCode && address('<br />'),
      icon: 'map-marker',
      href: `https://maps.google.com?q=${encodeURIComponent(address('\n'))}`
    },
    {
      text: phoneNumber,
      icon: 'phone',
      href: `tel:${phoneNumber}`
    },
    {
      text: fax,
      icon: 'fax'
    },
    {
      text: linkText,
      icon: 'external-link-square',
      href: link
    },
    {
      text: email,
      icon: 'envelope-o',
      href: `mailto:${email}`
    }
  ]

  const contactCardClassName = classNames(
    Object.assign(
      {
        'contact-card': true,
        [styles.contactCard]: true
      },
      cn
    )
  )

  return (
    <div className={contactCardClassName}>
      <h6>{title}</h6>
      {fields.map(({ href, icon, text }, index) => {
        if (!text || (text === linkText && !href)) {
          return null
        }

        return (
          <div className={styles.row} key={index}>
            <div className={styles.firstColumn}>
              <i alt={text} aria-hidden="true" className={`fa fa-${icon}`} />
            </div>
            <div className={styles.secondColumn}>
              <Link dangerouslySetInnerHTML={{ __html: text }} to={href} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

ContactCard.propTypes = {
  city: PropTypes.string,
  className: PropTypes.string,
  email: PropTypes.string,
  fax: PropTypes.string,
  link: PropTypes.string,
  phoneNumber: PropTypes.string,
  state: PropTypes.string,
  streetAddress: PropTypes.string,
  title: PropTypes.string,
  zipCode: PropTypes.number
}

export default ContactCard
