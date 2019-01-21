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

  // This will filter out empty fields for contact cards.
  // Since website text is assigned "Visit Website" in the above code, we check for an empty href instead for filtering.
  // Discovered strange behavior where the href sometimes comes back as an empty object, so this is also filtering that out.
  function emptyFieldFilter(field) {
    const { href, text } = field

    // Checks if this field is a website field.
    const isNotAWebsiteField = text !== linkText

    // If it is a website field, it better have an href.
    const isNotAnEmptyWebsiteLink = isNotAWebsiteField || href

    // Only keeps hrefs that are empty or is a string. Hrefs are sometimes coming back as empty objects.
    const isValidHref = !href || typeof href === 'string'

    return text && isNotAnEmptyWebsiteLink && isValidHref
  }

  return (
    <div className={contactCardClassName}>
      <h6>{title}</h6>
      {fields.filter(emptyFieldFilter).map(({ href, icon, text }, index) => {
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
  email: PropTypes.string,
  fax: PropTypes.string,
  // TODO: link should be PropTypes.string,
  // but currently if link is not supplied then an empty object is getting assigned to link instead
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  phoneNumber: PropTypes.string,
  state: PropTypes.string,
  streetAddress: PropTypes.string,
  title: PropTypes.string,
  zipCode: PropTypes.number
}

export default ContactCard
