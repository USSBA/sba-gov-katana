import React from 'react'
//todo: use own style sheet
import styles from '../contact-card/contact-card.scss'
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
      <div className={styles.container}>
        {iconName ? (
          <div className={styles.icon}>
            <SmallIcon
              fontAwesomeIconClassName={iconName}
              altText={phoneNumber}
              tabbable={false}
              href={link}
            />
          </div>
        ) : null}
        <a href={link}>
          <div className={styles.address}>{phoneNumber ? <div>{phoneNumber}</div> : null}</div>
        </a>
      </div>
    )
  }
}

PhoneNumber.propTypes = {
  iconName: React.PropTypes.string,
  phoneNumber: React.PropTypes.string,
  link: React.PropTypes.string
}
PhoneNumber.defaultProps = {
  iconName: 'phone',
  phoneNumber: '',
  link: ''
}
export default PhoneNumber
