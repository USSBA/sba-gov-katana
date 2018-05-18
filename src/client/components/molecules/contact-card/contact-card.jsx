import React, { PropTypes } from 'react'

import styles from './contact-card.scss'
import { Link } from 'atoms'

// TODO: The link card component has overlapping functionality and should be
// combined with the contact card.
const ContactCard = props => {
  const { city, email, fax, link, phoneNumber, state, streetAddress, title, zipCode } = props
  const linkText = 'Visit website'

  const address = breakOrNewLine => `${streetAddress}${breakOrNewLine}${city}, ${state} ${zipCode}`

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

  return (
    <div className={`contact-card ${styles.contactCard}`}>
      <h6>{title}</h6>
      {fields.map(({ href, icon, text }, index) => {
        if (!text || (text === linkText && !href)) {
          return null
        }

        return (
          <div className={styles.row} key={index}>
            <i alt={text} aria-hidden="true" className={`fa fa-${icon}`} />
            <Link dangerouslySetInnerHTML={{ __html: text }} to={href} />
          </div>
        )
      })}
    </div>
  )
}

ContactCard.propTypes = {
  city: PropTypes.string,
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
