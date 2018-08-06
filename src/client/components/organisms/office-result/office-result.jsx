import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import { Button } from 'atoms'
import PropTypes from 'prop-types'
import clientConfig from '../../../services/client-config.js'
import marker from 'assets/svg/marker.svg'
import classNames from 'classnames'

class OfficeResult extends React.PureComponent {
  render() {
    const { id, item: { fields: item, exprs: { distance } }, showDetailState } = this.props
    if (!item) {
      return null
    }

    const sbaOfficeNames = clientConfig.sbaOfficeNames
    const officeType = item.office_type ? item.office_type[0] : ''
    const isOfficialOffice = sbaOfficeNames.includes(officeType)
    const isFirstResult = id === 'result-0'

    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <div className={`card-layout`}>
        <div id={`office-result-${id}`} className={styles.officeResult}>
          <div>
            <div className={styles.distance}>
              <div>
                <img src={marker} className={styles.marker} />
              </div>
              <div id={`office-miles-${id}`} className={styles.miles}>{`${Number(distance).toFixed(
                1
              )} miles`}</div>
              <div className={styles.clear} />
            </div>
            <div
              id={`office-title-${id}`}
              onClick={() =>
                showDetailState({
                  item,
                  distance
                })
              }
            >
              <h2>{item.title[0]}</h2>
            </div>
            <div id={`office-type-${id}`}>
              <div className={styles.officeType}>
                {isOfficialOffice && <i className={'fa fa-shield ' + styles.fa} />}
                <span>{officeType}</span>
              </div>
            </div>
          </div>
          <div>
            {item.office_service ? (
              <div className={styles.serviceList + ' service-list'}>
                {' '}
                <h3>Services</h3>
                <div>{item.office_service.join(', ')}</div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.hr}>
          <hr />
        </div>
      </div>
    )
  }
}

const DetailView = ({ selectedItem, hideDetailState }) => {
  const { item, distance } = selectedItem
  const officeType = item.office_type ? item.office_type[0] : ''
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
          <div className={styles.close} onClick={() => hideDetailState()}>
            <i className="fa fa-times" />
          </div>
          <div className={'office-distance ' + styles.distance}>
            <div>
              <img src={marker} className={styles.marker} />
            </div>
            <div id="office-miles" className={styles.miles}>{`${Number(distance).toFixed(1)} miles`}</div>
            <div className={styles.clear} />
          </div>
          <h2 className="office-title">{item.title[0]}</h2>
        </div>
        <div id="office-type">
          <div className={styles.officeType}>
            <span>{officeType}</span>
          </div>
        </div>
      </div>
      <div>
        {item.office_service ? (
          <div className={styles.serviceList + ' service-list'}>
            {' '}
            <h3>Services</h3>
            <div>{item.office_service.join(', ')}</div>
          </div>
        ) : null}
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className="office-summary">
        <p>{item.summary[0]}</p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <ContactCard
        {...contactProps}
        className={{
          [styles.contactCard]: true
        }}
      />
    </div>
  )
}

OfficeResult.defaultProps = {
  id: 'result',
  onClick: () => {}
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string, //.isRequired
  onClick: PropTypes.func
}

export default OfficeResult
export { DetailView }
