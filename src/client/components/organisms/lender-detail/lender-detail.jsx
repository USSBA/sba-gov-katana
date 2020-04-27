import React from 'react'
import classNames from 'classnames'
import styles from './lender-detail.scss'
import { ContactCard } from 'molecules'

class LenderDetail extends React.PureComponent {
  componentDidMount() {
    if (document !== null && document.getElementById('lender-detail') !== null) {
      document.getElementById('lender-detail').focus()
    }
  }

  formatStreetAddress(address1, address2) {
    const addressLines = []
    address1 && addressLines.push(address1)
    address2 && addressLines.push(address2)
    return addressLines.join(' ')
  }

  formatName(firstName, lastName) {
    const names = []
    firstName && names.push(firstName)
    lastName && names.push(lastName)
    return names.join(' ')
  }

  render() {
    const {
      item: { fields }
    } = this.props

    const address1 = fields.address ? fields.address[0] : ''
    const address2 = fields.address_additional ? fields.address_additional[0] : ''
    const firstName = fields.contact_first_name ? fields.contact_first_name[0] : ''
    const lastName = fields.contact_last_name ? fields.contact_last_name[0] : ''

    const contactProps = {
      city: fields.city ? fields.city[0] : '',
      streetAddress: this.formatStreetAddress(address1, address2),
      state: fields.state ? fields.state[0] : '',
      zipCode: fields.zipcode ? fields.zipcode[0] : '',
      personTitle: this.formatName(firstName, lastName),
      email: '',
      phoneNumber: fields.bank_phone ? fields.bank_phone[0] : '',
      fax: fields.contact_fax ? fields.contact_fax[0] : '',
      link: fields.website ? fields.website[0] : '',
      border: false
    }

    const lenderDetailClassName = classNames({
      [styles.detailView]: true
    })

    return (
      <div id="lender-detail" className={lenderDetailClassName} tabIndex="0">
        <div>
          <div>
            <div className={styles.close}></div>
            <h2 tabIndex="0" role="heading" className="lender-name">
              {this.props.item.fields.lender_name[0]}
            </h2>
          </div>
        </div>
        <ContactCard {...contactProps} />
      </div>
    )
  }
}

export default LenderDetail
