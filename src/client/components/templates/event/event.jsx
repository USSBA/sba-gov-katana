import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, DecorativeDash } from 'atoms'
import classNames from 'classnames'
import moment from 'moment'
import { isEmpty } from 'lodash'
import styles from './event.scss'
import { LeaveSbaModal } from 'organisms'
import { Breadcrumb } from 'molecules'
import he from 'he'

class Event extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
  }

  handleRegisterButtonClick(e) {
    e.preventDefault()
    this.setModalState(true)
  }

  setModalState(isOpen) {
    this.setState({ modalIsOpen: isOpen })
  }

  handleClose() {
    this.setModalState(false)
  }

  makeEventBreadcrumb(eventTitle) {
    const breadcrumbs = []
    breadcrumbs.push({ title: 'Find Events', url: '/events/find' })
    breadcrumbs.push({ title: eventTitle })
    return breadcrumbs
  }

  renderLocationLink(location) {
    const locationData = [
      location.address,
      location.address2,
      location.city,
      location.state,
      location.zipcode
    ]
    const filteredLocationData = locationData.filter(Boolean)
    const linkAddress = filteredLocationData.join(' ')

    if (linkAddress.length > 0) {
      const link = 'https://maps.google.com?q=' + encodeURIComponent(linkAddress)

      return (
        <a id="event-details-location-link" href={link} key="loocation link">
          View on map
        </a>
      )
    }
  }

  renderLocationInfo() {
    const { location, locationType } = this.props.eventData

    const onlineElement = <p>Online</p>

    let addressElement
    if (location) {
      const { name, address, address2, city, state, zipcode } = location
      const addressString = []

      let addressName
      if (name) {
        addressName = name
      }

      let addressLine1
      if (address && address2) {
        addressLine1 = address.concat(`, ${address2}`)
      } else if (address) {
        addressLine1 = address
      }

      let addressLine2
      if (city && state) {
        addressLine2 = city.concat(`, ${state}`)
      } else if (city) {
        addressLine2 = city
      } else if (state) {
        addressLine2 = state
      }

      if (addressLine2 && zipcode) {
        addressLine2 = addressLine2.concat(` ${zipcode}`)
      } else if (zipcode) {
        addressLine2 = zipcode
      }

      const linkElement = this.renderLocationLink(location)

      addressName && addressString.push(addressName) && addressString.push(<br key="name br" />)
      addressLine1 && addressString.push(addressLine1) && addressString.push(<br key="address1 br" />)
      addressLine2 && addressString.push(addressLine2) && addressString.push(<br key="address2 br" />)
      linkElement && addressString.push(linkElement) && addressString.push(<br key="link br" />)

      addressElement = <p>{addressString}</p>
    }

    return (
      <div>
        <h3 tabIndex="0">Location</h3>
        <div id="event-details-location" tabIndex="0" data-cy="event-details-location">
          {locationType === 'Online' ? onlineElement : addressElement}
        </div>
      </div>
    )
  }

  render() {
    const {
      title,
      description,
      timezone,
      recurring,
      recurringType,
      cost,
      contact,
      registrationUrl,
      locationType,
      status
    } = this.props.eventData

    const startDate = moment.parseZone(this.props.eventData.startDate).format('dddd, MMMM D')
    const startDateDetails = moment.parseZone(this.props.eventData.startDate).format('dddd, MMMM D, YYYY')

    const startingTimeSuffix = moment.parseZone(this.props.eventData.startDate).format('a')
    let startTime =
      moment.parseZone(this.props.eventData.startDate).format('mm') === '00'
        ? moment.parseZone(this.props.eventData.startDate).format('h')
        : moment.parseZone(this.props.eventData.startDate).format('h:mm')
    const endTime =
      moment.parseZone(this.props.eventData.endDate).format('mm') === '00'
        ? moment.parseZone(this.props.eventData.endDate).format('ha')
        : moment.parseZone(this.props.eventData.endDate).format('h:mma')

    if (
      moment.parseZone(this.props.eventData.startDate).format('a') !==
      moment.parseZone(this.props.eventData.endDate).format('a')
    ) {
      startTime = startTime + startingTimeSuffix
    }
    const eventTime = `${startTime}–${endTime} ${timezone}`

    let recurringDetail
    if (recurring === 'Yes') {
      switch (recurringType) {
        case 'Recurs monthly (same week &amp; same day of week)':
          recurringDetail = 'Recurs same day every month'
          break
        case 'Recurs bi-weekly':
          recurringDetail = 'Recurs bi-weekly'
          break
        case 'Recurs weekly':
          recurringDetail = 'Recurs weekly'
          break
        case 'Recurs daily':
          recurringDetail = 'Recurs daily'
          break
        default:
          recurringDetail = 'This is a recurring event'
          break
      }
    }

    const costDetail = cost === '0' ? 'Free' : '$' + cost

    // classNames is not necessary when this is created for future extensibility
    // delete this comment if you modify the classNames below to include logic
    const containerClassNames = classNames({
      event: true,
      [styles.container]: true
    })

    const iconClassName = classNames({
      'fa fa-external-link': true,
      [styles.registerButtonIcon]: true
    })

    const eventTitle = he.decode(title)

    const breadcrumbItems = this.makeEventBreadcrumb(eventTitle)

    return (
      <div className={containerClassNames}>
        <div key={1} className={`basicpage-breadcrumb ${styles.breadcrumb}`}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className={styles.header}>
          <h3 id="event-header-date" tabIndex="0" data-cy="event-header-date">
            {startDate}
          </h3>
          <h1 data-cy="event-title" tabIndex="0">
            {eventTitle}
          </h1>
          {status === 'Canceled' && <div id="canceled-message" className={styles.canceledMessage} tabIndex="0"><p>This event is canceled.</p></div>}
        </div>
        <div className={styles.page}>
          <div className={styles.columnA}>
            <DecorativeDash aria-hidden="true" width={80} />
            <h4 className={styles.descriptionLabel} data-cy="event-description-label" tabIndex="0">
              Description
            </h4>
            <p id="event-details-description" data-cy="event-description" tabIndex="0gi">
              {description}
            </p>
          </div>
          <div className={styles.columnB} tabIndex="0">
            {status !== 'Canceled' && !isEmpty(registrationUrl) && (
              <div className={styles.button} data-cy="registration">
                <Button primary onClick={this.handleRegisterButtonClick.bind(this)}>
                  Register <i aria-hidden="true" className={iconClassName} />
                </Button>
                <LeaveSbaModal
                  closeLeaveSba={this.handleClose.bind(this)}
                  isOpen={this.state.modalIsOpen}
                  url={registrationUrl}
                  shouldOpenNewWindow
                  data-cy="leave sba modal"
                />
              </div>
            )}
            <div className={styles.detailsBox}>
              <h3 tabIndex="0">Date and time</h3>
              <div>
                <div id="event-details-date" data-cy="event-details-date" tabIndex="0">
                  {startDateDetails}
                </div>
                <div id="event-details-time" data-cy="event-details-time" tabIndex="0">
                  {eventTime}
                </div>
                {!isEmpty(recurringDetail) ? (
                  <div
                    className={styles.eventDetailsRecurring}
                    id="event-details-recurring"
                    data-cy="event-details-recurring"
                    tabIndex="0"
                  >
                    {recurringDetail}
                  </div>
                ) : (
                  <p tabIndex="-1" />
                )}
              </div>
              <div>
                <h3 tabIndex="0">Cost</h3>
                <p id="event-details-cost" tabIndex="0" data-cy="event-details-cost">
                  {costDetail}
                </p>
              </div>
              {this.renderLocationInfo()}
              {!isEmpty(contact.name) && (
                <div>
                  <h3 tabIndex="0">Event Organizer</h3>
                  <div
                    className={styles.contactName}
                    id="event-details-organizer"
                    data-cy="event-details-organizer"
                    tabIndex="0"
                  >
                    {contact.name}
                  </div>
                  <div className={styles.contactIcon}>
                    {!isEmpty(contact.email) && <i className={'fa fa-envelope-o'} aria-hidden="true" />}
                  </div>
                  <div tabIndex="0" data-cy="email">
                    {contact.email}
                  </div>
                  <div className={styles.contactIcon}>
                    {!isEmpty(contact.phone) && <i className={'fa fa-phone'} aria-hidden="true" />}
                  </div>
                  <div tabIndex="0" data-cy="event-details-phone">
                    {contact.phone}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Event.defaultProps = {
  eventData: {
    prop: 1
  }
}

Event.propTypes = {
  eventData: PropTypes.object
}

export default Event