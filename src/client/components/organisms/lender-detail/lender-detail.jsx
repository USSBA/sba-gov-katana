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

  render() {
    const { selectedItem, hideDetailState } = this.props
    const { item, distance } = selectedItem

    const contactProps = {
      city: item.city ? item.city[0] : '',
      streetAddress: item.address ? item.address[0] : '',
      state: item.state ? item.state[0] : '',
      zipCode: item.zipcode ? Number(item.zipcode[0]) : '',
      email: item.contact_email ? item.contact_email[0] : '',
      phoneNumber: item.contact_phone ? item.contact_phone[0] : '',
      fax: item.contact_fax ? item.contact_fax[0] : '',
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
            <h2 tabIndex="0" role="heading" className="lender-title">
              {item.title[0]}
            </h2>
          </div>
        </div>
        <ContactCard {...contactProps} />
      </div>
    )
  }
}

export default LenderDetail
