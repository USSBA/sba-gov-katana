import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import { Button } from 'atoms'
import PropTypes from 'prop-types'
import clientConfig from '../../../services/client-config.js'
import marker from 'assets/svg/marker.svg'
import classNames from 'classnames'

class OfficeResult extends React.PureComponent {
  onClick(e) {
    this.props.showDetailState(e)
  }

  render() {
    const { id, item: { fields: item, exprs: { distance } }, hoveredMarkerId } = this.props
    if (!item) {
      return null
    }

    console.log('A', this.props.item.id, hoveredMarkerId)

    const sbaOfficeNames = clientConfig.sbaOfficeNames
    const officeType = item.office_type ? item.office_type[0] : ''
    const isOfficialOffice = sbaOfficeNames.includes(officeType)
    const isFirstResult = id === 'result-0'
    const isHovered = this.props.item.id === hoveredMarkerId

    const cardLayoutClassName = classNames({
      ['card-layout']: true,
      [styles.hoveredBorder]: isHovered
    })

    const innerDivClassName = classNames({
      [styles.officeResult]: true,
      [styles.hoveredInnerDiv]: isHovered,
      [styles.isFirstHoveredResult]: isHovered && isFirstResult
    })

    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <div className={cardLayoutClassName}>
        <div id={`office-result-${id}`} className={innerDivClassName}>
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
                this.onClick({
                  item,
                  distance
                })
              }
            >
              <h2>
                <i className="fa fa-chevron-right" />
                {item.title[0]}
              </h2>
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
  id: 'result',
  onClick: () => {}
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string, //.isRequired
  onClick: PropTypes.func
}

export default OfficeResult
