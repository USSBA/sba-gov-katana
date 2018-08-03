import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import { Button } from 'atoms'
import PropTypes from 'prop-types'
import clientConfig from '../../../services/client-config.js'
import marker from 'assets/svg/marker.svg'

class OfficeResult extends React.PureComponent {
  render() {
    const {
      id,
      item: {
        fields: item,
        exprs: { distance }
      }
    } = this.props
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
            <div id={`office-title-${id}`}>
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

OfficeResult.defaultProps = {
  id: 'result'
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string //.isRequired
}

export default OfficeResult
