/* eslint-disable complexity */
import React from 'react'
import styles from './office-result.scss'
import { PhoneNumber } from 'molecules'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ModalActions from '../../../actions/show-modal'
import clientConfig from '../../../services/client-config.js'
import marker from 'assets/svg/marker.svg'
import districtOfficeMarker from 'assets/svg/districtOfficeMarker.svg'
import classNames from 'classnames'

class OfficeResult extends React.PureComponent {
  componentDidMount() {
    if (document) {
      const { id, length } = this.props
      if (id === `result-${length - 1}`) {
        document.querySelector('.search-info-panel') && document.querySelector('.search-info-panel').focus()
      }
    }
  }

  onClick(e) {
    this.props.showDetailState(e)
  }

  render() {
    const {
      id,
      item: { fields: item, exprs, id: itemId },
      hoveredMarkerId
    } = this.props
    const distance = exprs ? exprs.distance : null
    if (!item) {
      return null
    }
    const street = item.location_street_address ? item.location_street_address[0] : null
    const city = item.location_city ? item.location_city[0] : null
    const state = item.location_state ? item.location_state[0] : null
    const phoneNumber = item.location_phone_number ? item.location_phone_number[0] : null
    const link = item.office_website ? item.office_website[0] : null
    const title = item.title ? item.title[0] : null
    const zipCode = item.location_zipcode ? item.location_zipcode[0] : null
    const sbaOfficeNames = clientConfig.sbaOfficeNames
    const officeType = item.office_type ? item.office_type[0] : ''
    const isOfficialOffice = sbaOfficeNames.includes(officeType)
    const isFirstResult = id === 'result-0'
    const isHovered = Boolean(hoveredMarkerId) && this.props.item.id === hoveredMarkerId

    const cardLayoutClassName = classNames({
      'card-layout': true,
      [styles.officeResultContainer]: true,
      [styles.focus]: true
    })

    const innerDivClassName = classNames({
      [styles.officeResult]: true,
      [styles.focus]: true
    })

    const websiteClassName = classNames({
      [styles.website]: true
    })

    const contactClassName = classNames({
      [styles.contact]: true
    })

    const outerDivClassName = classNames({
      [styles.outerDiv]: true,
      [styles.districtOfficeOuterDiv]: item.office_type && item.office_type?.[0] === 'SBA District Office'
    })
    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <div>
        <div className={outerDivClassName}>
          <div className={styles.innerDiv}>
            <a
              id={`office-result-container-${id}`}
              className={cardLayoutClassName}
              aria-label={title}
              tabIndex="0"
              onMouseOver={() => {
                if (!isHovered) {
                  this.props.onResultHover(this.props.item.id)
                }
              }}
              onFocus={() => {
                if (!isHovered) {
                  this.props.onResultHover(this.props.item.id)
                }
              }}
              onMouseOut={() => {
                if (isHovered) {
                  this.props.onResultHover({})
                }
              }}
              onBlur={() => {
                if (isHovered) {
                  this.props.onResultHover({})
                }
              }}
              onClick={e => {
                e.preventDefault()
                this.onClick({
                  item,
                  distance
                })
              }}
              onKeyUp={obj => {
                const enterKeyCode = 13
                if (obj.keyCode === enterKeyCode) {
                  this.onClick({
                    item,
                    distance
                  })
                }
              }}
            >
              <div id={`office-result-${id}`} className={innerDivClassName}>
                <div>
                  <div className={styles.distance}>
                    <div>
                      <img
                        src={
                          item.office_type && item.office_type?.[0] === 'SBA District Office'
                            ? districtOfficeMarker
                            : marker
                        }
                        className={styles.marker}
                      />
                    </div>
                    <div id={`office-miles-${id}`} className={styles.miles} tabIndex="0">
                      {item.office_type && item.office_type?.[0] === 'SBA District Office' ? (
                        <div className={styles.districtOfficeText}>Your District Office - </div>
                      ) : null}
                      {distance !== null ? (
                        <Distance distance={distance} />
                      ) : (
                        <Location city={city} state={state} />
                      )}
                    </div>
                    <div className={styles.clear} />
                  </div>
                  <h2 id={`office-title-${id}`} className={styles.title} tabIndex="0">
                    {title}
                  </h2>
                  {street && (
                    <div data-cy="contact address" className={styles.street} tabIndex="0">
                      {street}
                    </div>
                  )}
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
            </a>
            <div className={styles.resultPhoneNumber}>
              {phoneNumber && <PhoneNumber iconName="" phoneNumber={phoneNumber} />}
            </div>
          </div>
          <div className={styles.actions}>
            {link && (
              <div
                data-cy="contact link"
                role="button"
                tabIndex="0"
                className={websiteClassName}
                ariaLabel="website"
              >
                <i className={'fa fa-globe ' + styles.fa} />
                <br />
                Website
              </div>
            )}
            {/* this is the nodeId for the Seattle Office */}
            {link && link.includes('/offices/district/') && itemId === '6394' ? (
              // title.includes('District')
              <div
                role="button"
                tabIndex="0"
                className={contactClassName}
                ariaLabel="website"
                onClick={() => {
                  this.props.modalActions.showOfficeContactModal(title, link, {
                    zipCode,
                    state,
                    street,
                    city,
                    phoneNumber
                  })
                }}
              >
                <i className={'fa fa-envelope ' + styles.fa} />
                <br />
                Contact
              </div>
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const Distance = ({ distance }) => (
  <div className={styles.pullLeft}>{`${Number(distance).toFixed(1)} miles`}</div>
)
const Location = ({ city, state }) => (
  <div className={styles.pullLeft}>{`${[city, state].filter(item => item !== null).join(', ')}`}</div>
)

OfficeResult.defaultProps = {
  id: 'result',
  onClick: () => {},
  onResultHover: () => {}
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string, //.isRequired
  onClick: PropTypes.func,
  onResultHover: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(OfficeResult)

export { OfficeResult }
