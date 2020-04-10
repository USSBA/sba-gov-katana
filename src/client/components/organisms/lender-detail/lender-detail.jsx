import React from 'react'
import classNames from 'classnames'
import marker from 'assets/svg/marker.svg'
import exitIcon from 'assets/svg/icons/close-icon-sm-blue.svg'
import styles from './lender-detail.scss'
import lenderResultStyles from '../lender-result/lender-result.scss'
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
    const { selectedItem, hideDetailState } = this.props
    const { item, distance } = selectedItem

    const address1 = item.address ? item.address[0] : ''
    const address2 = item.address_additional ? item.address_additional[0] : ''
    const firstName = item.contact_first_name ? item.contact_first_name[0] : ''
    const lastName = item.contact_last_name ? item.contact_last_name[0] : ''

    const contactProps = {
      city: item.city ? item.city[0] : '',
      streetAddress: this.formatStreetAddress(address1, address2),
      state: item.state ? item.state[0] : '',
      zipCode: item.zipcode ? item.zipcode[0] : '',
      personTitle: this.formatName(firstName, lastName),
      //email: item.contact_email ? item.contact_email[0] : '',
      email: '',
      phoneNumber: item.bank_phone ? item.bank_phone[0] : '',
      fax: item.contact_fax ? item.contact_fax[0] : '',
      website: item.website ? item.website[0] : '',
      border: false
    }

    const lenderDetailClassName = classNames({
      [styles.detailView]: true,
      [styles.additionalTitleMargin]: distance === null
    })

    return (
      <div id="lender-detail" className={lenderDetailClassName} tabIndex="0">
        <div>
          <div>
            <div className={styles.close}>
              <img
                onClick={() => hideDetailState()}
                onKeyUp={obj => {
                  const enterKeyCode = 13
                  if (obj.keyCode === enterKeyCode) {
                    hideDetailState()
                  }
                }}
                src={exitIcon}
                alt="close"
                tabIndex="0"
                aria-label="Closing this panel will take you back to the results list"
                data-cy="close detail"
              />
            </div>
            {distance !== null && (
              <div className={'lender-distance ' + lenderResultStyles.distance}>
                <div>
                  <img src={marker} className={lenderResultStyles.marker} />
                </div>
                <div
                  id="lender-miles"
                  className={lenderResultStyles.miles}
                  tabIndex="0"
                  role="text"
                >{`${Number(distance).toFixed(1)} miles`}</div>
                <div className={lenderResultStyles.clear} />
              </div>
            )}
            <h2 tabIndex="0" role="heading" className="lender-name">
              {item.lender_name[0]}
            </h2>
          </div>
        </div>
        <ContactCard {...contactProps} />
      </div>
    )
  }
}

export default LenderDetail
