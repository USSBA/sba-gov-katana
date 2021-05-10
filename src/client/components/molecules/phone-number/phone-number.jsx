import React from 'react'
import PropTypes from 'prop-types'
//todo: use own style sheet
import styles from '../contact-card/contact-card.scss'
import addressStyles from '../address/address.scss'
import { SmallIcon } from 'atoms'

class PhoneNumber extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { phoneNumber, iconName } = this.props
    let { link } = this.props

    link = link ? link : 'tel:' + phoneNumber

    if (!phoneNumber) {
      return null
    }
    return (
      <div className={'phone-number ' + addressStyles.phoneMarginTop}>
        {iconName ? (
          <div className={styles.icon + ' ' + addressStyles.smallIcon}>
            <SmallIcon
              fontAwesomeIconClassName={iconName}
              altText={phoneNumber}
              tabbable={false}
              href={link}
            />
          </div>
        ) : null}
        <a href={link}>
          <div data-cy="contact phone" className={addressStyles.address}>
            {phoneNumber ? <div>{phoneNumber}</div> : null}
          </div>
        </a>
      </div>
    )
  }
}

PhoneNumber.propTypes = {
  iconName: PropTypes.string,
  phoneNumber: PropTypes.string,
  link: PropTypes.string
}
PhoneNumber.defaultProps = {
  iconName: 'phone',
  phoneNumber: '',
  link: ''
}
export default PhoneNumber
