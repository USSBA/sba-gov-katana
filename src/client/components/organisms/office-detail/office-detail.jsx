import React from 'react'
import { ContactCard } from 'molecules'
import styles from './office-detail.scss'
import officeResultStyles from '../office-result/office-result.scss'
import marker from 'assets/svg/marker.svg'
import exitIcon from 'assets/svg/icons/close-icon-sm-blue.svg'
import { isEmpty } from 'lodash'

const OfficeDetail = ({ selectedItem, hideDetailState }) => {
  const { item, distance } = selectedItem
  const officeType = item.office_type ? item.office_type[0] : ''
  const officeSummary = '' //item.summary && item.summary.length ? item.summary[0] : ''
  const contactProps = {
    city: item.location_city ? item.location_city[0] : '',
    streetAddress: item.location_street_address ? item.location_street_address[0] : '',
    state: item.location_state ? item.location_state[0] : '',
    zipCode: item.location_zipcode ? Number(item.location_zipcode[0]) : '',
    email: item.location_email ? item.location_email[0] : '',
    phoneNumber: item.location_phone_number ? item.location_phone_number[0] : '',
    fax: item.location_fax ? item.location_fax[0] : '',
    link: item.location_website ? item.location_website[0] : ''
  }

  return (
    <div className={styles.detailView}>
      <div>
        <div>
          <div className={styles.close}>
            <img
              onClick={() => hideDetailState()}
              onKeyDown={e => {
                // Key code 13 equals Enter and 32 equals Spacebar
                if (e.keyCode === 13 || e.keyCode === 32) {
                  e.preventDefault()
                  return hideDetailState()
                }
              }}
              src={exitIcon}
              alt="close"
              tabIndex="3"
              aria-label="click to close alert"
            />
          </div>
          <div className={'office-distance ' + officeResultStyles.distance}>
            <div>
              <img src={marker} className={officeResultStyles.marker} />
            </div>
            <div id="office-miles" className={officeResultStyles.miles}>{`${Number(distance).toFixed(
              1
            )} miles`}</div>
            <div className={officeResultStyles.clear} />
          </div>
          <h2 className="office-title">{item.title[0]}</h2>
        </div>
        <div id="office-type">
          <div className={officeResultStyles.officeType}>
            <span>{officeType}</span>
          </div>
        </div>
      </div>
      <div>
        {item.office_service ? (
          <div className={officeResultStyles.serviceList + ' service-list'}>
            {' '}
            <h3>Services</h3>
            <div>{item.office_service.join(', ')}</div>
          </div>
        ) : null}
      </div>
      {!isEmpty(officeSummary) && (
        <div>
          <div className={officeResultStyles.hr}>
            <hr />
          </div>
          <div className="office-summary">
            <p>{item.summary && item.summary.length ? item.summary[0] : ''}</p>
          </div>
          <div className={officeResultStyles.hr}>
            <hr />
          </div>
        </div>
      )}
      <ContactCard
        {...contactProps}
        className={{
          [styles.contactCard]: true
        }}
      />
    </div>
  )
}

export default OfficeDetail
