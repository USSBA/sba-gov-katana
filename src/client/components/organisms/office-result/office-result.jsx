import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import { Button } from 'atoms'
import PropTypes from 'prop-types'
import clientConfig from '../../../services/client-config.js'

class OfficeResult extends React.PureComponent {
  render() {
    const id = this.props.id
    const item = this.props.item.fields
    if (!item) {
      return null
    }

    const sbaOfficeNames = clientConfig.sbaOfficeNames
    const officeType = item.office_type[0]
    const isOfficialOffice = sbaOfficeNames.includes(officeType)
    const isFirstResult = id === 'result-0'

    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <div className={`card-layout`}>
        <div id={`office-result-${id}`} className={styles.officeResult}>
          {isFirstResult && (
            <div className={styles.firstResult}>
              <hr />
            </div>
          )}
          <div className={styles.colA}>
            <div id={`office-type-${id}`}>
              <div className={styles.officeType}>
                {isOfficialOffice && <i className={'fa fa-shield ' + styles.fa} />}
                <span className={styles.italic}> {item.office_type[0]}</span>
              </div>
            </div>
            <div id={`office-miles-${id}`}>
              {`${Number(this.props.item.exprs.distance).toFixed(1)} miles`}
            </div>
            <div id={`office-title-${id}`}>
              <h2>{item.title[0]}</h2>
            </div>
            <Address
              id={`office-address-${id}`}
              streetAddress={item.location_street_address[0]}
              city={item.location_city[0]}
              state={item.location_state[0]}
              /*todo: fix zipcode once not null from cloudsearch*/
              zipCode={item.location_zipcode ? item.location_zipcode[0] : '-'}
            />
            {item.location_phone_number ? (
              <PhoneNumber id={`office-phone-${id}`} phoneNumber={item.location_phone_number[0]} />
            ) : null}
          </div>
          <div className={styles.colB}>
            {item.office_service ? (
              <div className={styles.serviceList + ' service-list'}>
                {' '}
                <h3>Services</h3>
                <div>{item.office_service.join(', ')}</div>
              </div>
            ) : null}
          </div>
          <div className={styles.colC}>
            {item.office_website && item.office_website.length ? (
              <div
                id={`office-website-button-${id}`}
                className={styles.officeWebsiteButton + ' website-button'}
              >
                <Button url={item.office_website[0]} secondary small>
                  View website
                </Button>
              </div>
            ) : null}
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

OfficeResult.defaultProps = {
  id: 'result'
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string //.isRequired
}

export default OfficeResult
