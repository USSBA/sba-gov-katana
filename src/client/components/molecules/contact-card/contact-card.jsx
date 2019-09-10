import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import styles from './contact-card.scss'
import classNames from 'classnames'
import { Link } from 'atoms'

const formatHours = hoursOfOperation => {
  let hours
  if (hoursOfOperation && hoursOfOperation.length > 0) {
    hours = hoursOfOperation.replace(/\r\n/g, '<br />')
  }
  return hours
}

// TODO: The link card component has overlapping functionality and should be
// combined with the contact card.
const ContactCard = props => {
  const {
    border,
    city,
    email,
    fax,
    hoursOfOperation,
    link,
    message,
    office,
    personTitle,
    phoneNumber,
    state,
    streetAddress,
    title,
    zipCode,
    className: cn,
    testId
  } = props
  const linkText = 'Visit website'

  const address = breakOrNewLine => {
    return `${streetAddress}${breakOrNewLine}${city}, ${state} ${zipCode}`
  }

  const fields = [
    {
      name: 'person title',
      text: personTitle,
      icon: 'user'
    },
    {
      name: 'person office',
      text: office,
      icon: 'building'
    },
    {
      name: 'contact address',
      text: streetAddress && city && state && zipCode && address('<br />'),
      icon: 'map-marker',
      href: `https://maps.google.com?q=${encodeURIComponent(address('\n'))}`
    },
    {
      name: 'contact phone',
      text: phoneNumber,
      icon: 'phone',
      href: `tel:${phoneNumber}`
    },
    {
      name: 'contact fax',
      text: fax,
      icon: 'fax'
    },
    {
      name: 'contact link',
      text: linkText,
      icon: 'external-link-square',
      href: link
    },
    {
      name: 'contact email',
      text: email,
      icon: 'envelope-o',
      href: `mailto:${email}`
    },
    {
      name: 'hours of operation',
      text: formatHours(hoursOfOperation),
      icon: 'clock-o'
    }
  ]

  const contactCardClassName = classNames({
    'contact-card': true,
    [styles.box]: border,
    [styles.contactCard]: true
  })

  // This will filter out empty fields for contact cards.
  // Since website text is assigned "Visit Website" in the above code, we check for an empty href instead for filtering.
  // Discovered strange behavior where the href sometimes comes back as an empty object, so this is also filtering that out.
  function emptyFieldFilter(field) {
    const { href, name, text } = field

    // Checks if this field is a website field.
    const isNotAWebsiteField = text !== linkText

    // If it is a website field, it better have an href.
    const isNotAnEmptyWebsiteLink = isNotAWebsiteField || href

    // Only keeps hrefs that are empty or is a string. Hrefs are sometimes coming back as empty objects.
    const isValidHref = !href || typeof href === 'string'

    return text && isNotAnEmptyWebsiteLink && isValidHref
  }

  return (
    <div data-testid={testId} className={contactCardClassName}>
      <h6 data-testid="contact card title" data-cy="contact card title">
        {title}
      </h6>
      {/* TODO: cleanup double filter */}
      {fields
        .filter(emptyFieldFilter)
        .filter(({ text }) => !isEmpty(text))
        .map(({ href, icon, name, text }, index) => (
          <div data-testid={name} data-cy={name} className={styles.row} key={index}>
            <div className={styles.firstColumn}>
              <i alt={text} aria-hidden="true" className={`fa fa-${icon}`} />
            </div>
            <div className={styles.secondColumn}>
              {isEmpty(href) ? (
                <span dangerouslySetInnerHTML={{ __html: text }} tabIndex="0" />
              ) : (
                <Link dangerouslySetInnerHTML={{ __html: text }} to={href} />
              )}
            </div>
          </div>
        ))}
      {message && <p>{message}</p>}
    </div>
  )
}

ContactCard.propTypes = {
  city: PropTypes.string,
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fax: PropTypes.string,
  hoursOfOperation: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  message: PropTypes.string,
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  state: PropTypes.string,
  streetAddress: PropTypes.string,
  title: PropTypes.string,
  zipCode: PropTypes.number,
  testId: PropTypes.string
}

ContactCard.defaultProps = {
  border: true,
  testId: 'contact-card'
}

export { formatHours }

export default ContactCard
