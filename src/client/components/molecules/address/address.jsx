import React from 'react'
import PropTypes from 'prop-types'

//todo: use own style sheet
import styles from '../contact-card/contact-card.scss'
import addressStyles from './address.scss'
import { SmallIcon } from 'atoms'

class Address extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  generateGoogleMapsLink(address) {
    return 'https://maps.google.com?q=' + encodeURIComponent(address)
  }

  render() {
    const { iconName, streetAddress, city, state, zipCode } = this.props
    let { link } = this.props
    const address =
      this.props.streetAddress && this.props.city && this.props.state && this.props.zipCode
        ? this.props.streetAddress +
          '\n' +
          this.props.city +
          ',' +
          this.props.state +
          ' ' +
          this.props.zipCode
        : null

    link = link ? link : this.generateGoogleMapsLink(address)

    return (
      <div className={'office-address'}>
        {iconName ? (
          <div className={styles.icon + ' ' + addressStyles.smallIcon + ' ' + addressStyles.iconMarginTop}>
            <SmallIcon fontAwesomeIconClassName={iconName} altText={address} tabbable={false} href={link} />
          </div>
        ) : null}
        <a href={link}>
          <div className={addressStyles.address}>
            {streetAddress ? <div className={styles.streetAddress}>{this.props.streetAddress}</div> : null}
            {city && state && zipCode ? (
              <div className={styles.cityStateZip}>
                {city}, {state} {zipCode}
              </div>
            ) : null}
          </div>
        </a>
      </div>
    )
  }
}

Address.propTypes = {
  iconName: PropTypes.string,
  streetAddress: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  link: PropTypes.string
}
Address.defaultProps = {
  iconName: 'map-marker',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  link: ''
}
export default Address
