import React from 'react'
import PropTypes from 'prop-types'

import styles from './lender-result-card.scss'

const LenderResultCard = props => {
  const { link, phoneNumber, streetAddress, title, className: cn, testId } = props

  const fields = {
    address: {
      name: 'contact address',
      text: streetAddress,
      icon: 'map-marker',
      ariaLabel: 'address icon'
    },
    phoneNumber: {
      name: 'contact phone',
      text: phoneNumber,
      icon: 'phone',
      href: `tel:${phoneNumber}`,
      ariaLabel: 'phone icon'
    },
    website: {
      name: 'contact link',
      text: 'Website',
      icon: 'globe',
      href: link,
      ariaLabel: 'website icon'
    }
  }

  return (
    <div data-testid={testId} className={styles.lenderResultCard}>
      <div className={styles.firstColumn}>
        {title && (
          <h4
            data-testid="lender card title"
            data-cy="lender card title"
            tabIndex="0"
            className={styles.h4}
          >
            {title}
          </h4>
        )}
        <div
          data-testid={fields.address.name}
          data-cy={fields.address.name}
          className={styles.row}
          key={Math.random()}
        >
          <span dangerouslySetInnerHTML={{ __html: fields.address.text }} tabIndex="0" />
        </div>
        <div
          data-testid={fields.phoneNumber.name}
          data-cy={fields.phoneNumber.name}
          className={styles.row}
          key={Math.random()}
        >
          <span dangerouslySetInnerHTML={{ __html: fields.phoneNumber.text }} tabIndex="0" />
        </div>
      </div>
      <div className={styles.secondColumn}>
        <a className={styles.websiteLink} href={fields.website.href}>
          <i
            aria-label={fields.website.ariaLabel}
            className={`fa fa-${fields.website.icon}`}
            tabIndex="0"
          />
          <span tabIndex="0">{fields.website.text}</span>
        </a>
        <a className={styles.phoneNumber} href={fields.phoneNumber.href}>
          <i
            aria-label={fields.phoneNumber.ariaLabel}
            className={`fa fa-${fields.phoneNumber.icon}`}
            tabIndex="0"
          />
          <span tabIndex="0">Call</span>
        </a>
      </div>
    </div>
  )
}

LenderResultCard.propTypes = {
  city: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  streetAddress: PropTypes.string,
  title: PropTypes.string,
  testId: PropTypes.string
}

LenderResultCard.defaultProps = {
  border: true,
  testId: 'lender-card'
}

export default LenderResultCard
